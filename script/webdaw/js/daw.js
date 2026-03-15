(()=> {
    const STEPS = 16;
    const melodicTracks = [
      { id: 'lead', name: 'Lead', kind: 'melodic', waveform: 'square', volume: 0.78, octaveShift: 0, notes: ['E5','D5','C5','B4','A4','G4','F4','E4','D4','C4'] },
      { id: 'pad', name: 'Pad', kind: 'melodic', waveform: 'triangle', volume: 0.5, octaveShift: -1, notes: ['C5','B4','A4','G4','F4','E4','D4','C4','B3','A3'] },
      { id: 'bass', name: 'Bass', kind: 'melodic', waveform: 'sawtooth', volume: 0.68, octaveShift: -2, notes: ['C4','B3','A3','G3','F3','E3','D3','C3','B2','A2'] }
    ];
    const drumTrack = { id: 'drums', name: 'Drums', kind: 'drum', volume: 0.88, lanes: ['Kick','Snare','Hat','Clap'] };
    const tracks = [...melodicTracks, drumTrack];
    const drumShort = { Kick: 'K', Snare: 'S', Hat: 'H', Clap: 'C' };
    const drumLong = { K: 'Kick', S: 'Snare', H: 'Hat', C: 'Clap' };
    const patternNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    let project = { patterns: [], songSequence: ['A','A','B','A'] };
    let currentPatternIndex = 0;
    let audioCtx = null;
    let masterGain = null;
    let noiseBuffer = null;
    let isPlaying = false;
    let schedulerTimer = null;
    let scheduledNodes = [];
    let highlightTimeouts = [];
    let playbackCursor = { patternPos: 0, step: 0, nextTime: 0 };

    const ui = {
      tracksEl: document.getElementById('tracks'),
      tempo: document.getElementById('tempo'),
      swing: document.getElementById('swing'),
      swingValue: document.getElementById('swingValue'),
      master: document.getElementById('master'),
      masterValue: document.getElementById('masterValue'),
      status: document.getElementById('status'),
      dslArea: document.getElementById('dslArea'),
      patternPills: document.getElementById('patternPills'),
      songSequence: document.getElementById('songSequence')
    };

    function emptyPattern(name) {
      return {
        name,
        tracks: tracks.map(t => ({
          id: t.id,
          pattern: Array.from({ length: (t.kind === 'melodic' ? t.notes.length : t.lanes.length) }, () => Array(STEPS).fill(false))
        }))
      };
    }

    function ensureBasePatterns() {
      if (!project.patterns.length) project.patterns.push(emptyPattern('A'));
      if (!project.patterns.find(p => p.name === 'B')) project.patterns.push(emptyPattern('B'));
    }

    function getCurrentPattern() {
      return project.patterns[currentPatternIndex];
    }

    function getTrackState(trackId, pattern = getCurrentPattern()) {
      return pattern.tracks.find(t => t.id === trackId);
    }

    function noteToMidi(note) {
      const m = note.match(/^([A-G])([#b]?)(-?\d+)$/);
      if (!m) throw new Error('不正な音名: ' + note);
      const map = { C:0, D:2, E:4, F:5, G:7, A:9, B:11 };
      let semitone = map[m[1]];
      if (m[2] === '#') semitone += 1;
      if (m[2] === 'b') semitone -= 1;
      const octave = parseInt(m[3], 10);
      return (octave + 1) * 12 + semitone;
    }

    function midiToNote(midi) {
      const names = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
      const octave = Math.floor(midi / 12) - 1;
      return names[(midi % 12 + 12) % 12] + octave;
    }

    function shiftNote(note, semitones) {
      return midiToNote(noteToMidi(note) + semitones);
    }

    function midiToFreq(midi) {
      return 440 * Math.pow(2, (midi - 69) / 12);
    }

    function ensureAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = parseFloat(ui.master.value) || 0.75;
        masterGain.connect(audioCtx.destination);
      }
      if (audioCtx.state === 'suspended') return audioCtx.resume();
      return Promise.resolve();
    }

    function createNoiseBuffer() {
      const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.5, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      return buffer;
    }

    function trackDurationStepSeconds(step) {
      const tempo = parseFloat(ui.tempo.value) || 120;
      const base = 60 / tempo / 4;
      const swing = parseFloat(ui.swing.value) || 0;
      return step % 2 === 0 ? base * (1 + swing) : base * (1 - swing);
    }

    function scheduleSynth(freq, time, duration, waveform, volume) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();
      filter.type = waveform === 'sawtooth' ? 'lowpass' : 'highpass';
      filter.frequency.value = waveform === 'sawtooth' ? 1500 : 80;
      filter.Q.value = 0.7;
      osc.type = waveform;
      osc.frequency.setValueAtTime(freq, time);
      const attack = Math.min(0.01, duration * 0.15);
      const decayEnd = time + Math.max(0.04, duration * 0.55);
      const releaseStart = time + Math.max(attack + 0.02, duration * 0.75);
      const peak = volume;
      const sustain = volume * 0.58;
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(peak, time + attack);
      gain.gain.exponentialRampToValueAtTime(sustain, decayEnd);
      gain.gain.setValueAtTime(sustain, releaseStart);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      osc.connect(filter); filter.connect(gain); gain.connect(masterGain);
      osc.start(time); osc.stop(time + duration + 0.03);
      scheduledNodes.push(osc, gain, filter);
    }

    function scheduleKick(time, volume) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);
      gain.gain.setValueAtTime(volume, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.14);
      osc.connect(gain); gain.connect(masterGain);
      osc.start(time); osc.stop(time + 0.16);
      scheduledNodes.push(osc, gain);
    }

    function scheduleNoiseDrum(time, volume, type) {
      if (!noiseBuffer) noiseBuffer = createNoiseBuffer();
      const src = audioCtx.createBufferSource();
      src.buffer = noiseBuffer;
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();
      if (type === 'Snare') {
        filter.type = 'highpass'; filter.frequency.value = 1300;
        gain.gain.setValueAtTime(volume, time); gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);
      } else if (type === 'Hat') {
        filter.type = 'highpass'; filter.frequency.value = 6500;
        gain.gain.setValueAtTime(volume * 0.6, time); gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);
      } else {
        filter.type = 'bandpass'; filter.frequency.value = 2400; filter.Q.value = 0.8;
        gain.gain.setValueAtTime(volume * 0.8, time); gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
      }
      src.connect(filter); filter.connect(gain); gain.connect(masterGain);
      src.start(time); src.stop(time + 0.2);
      scheduledNodes.push(src, filter, gain);
    }

    function getPlaybackSequence() {
      const names = normalizeSongSequence(ui.songSequence.value);
      if (!names.length) return [getCurrentPattern().name];
      return names.filter(name => project.patterns.some(p => p.name === name));
    }

    function getPatternByName(name) {
      return project.patterns.find(p => p.name === name);
    }

    function playStep(pattern, step, time) {
      melodicTracks.forEach(track => {
        const state = getTrackState(track.id, pattern);
        const activeRows = [];
        for (let row = 0; row < state.pattern.length; row++) {
          if (state.pattern[row][step]) activeRows.push(row);
        }
        activeRows.forEach(row => {
          const shifted = shiftNote(track.notes[row], track.octaveShift * 12);
          const freq = midiToFreq(noteToMidi(shifted));
          scheduleSynth(freq, time, Math.max(0.08, trackDurationStepSeconds(step) * 0.95), track.waveform, (track.volume * 0.22) / Math.max(1, activeRows.length * 0.75));
        });
      });

      const drumState = getTrackState('drums', pattern);
      drumTrack.lanes.forEach((lane, row) => {
        if (!drumState.pattern[row][step]) return;
        if (lane === 'Kick') scheduleKick(time, drumTrack.volume * 0.9);
        else scheduleNoiseDrum(time, drumTrack.volume * 0.75, lane);
      });
    }

    function queueHighlight(patternName, step, time) {
      const delay = Math.max(0, (time - audioCtx.currentTime) * 1000);
      const id = setTimeout(() => highlightStep(patternName, step), delay);
      highlightTimeouts.push(id);
    }

    function highlightStep(patternName, step) {
      document.querySelectorAll('.cell.playing, .head.playing').forEach(el => el.classList.remove('playing'));
      document.querySelectorAll(`[data-step="${step}"][data-pattern="${patternName}"]`).forEach(el => el.classList.add('playing'));
      ui.status.innerHTML = `<span class="status-good">再生中</span> / ${patternName} / step ${step + 1}`;
    }

    function stopHighlights() {
      highlightTimeouts.forEach(clearTimeout); highlightTimeouts = [];
      document.querySelectorAll('.cell.playing, .head.playing').forEach(el => el.classList.remove('playing'));
    }

    function scheduler() {
      const seq = getPlaybackSequence();
      while (playbackCursor.nextTime < audioCtx.currentTime + 0.14) {
        const patternName = seq[playbackCursor.patternPos % seq.length];
        const pattern = getPatternByName(patternName) || getCurrentPattern();
        playStep(pattern, playbackCursor.step, playbackCursor.nextTime);
        queueHighlight(pattern.name, playbackCursor.step, playbackCursor.nextTime);
        playbackCursor.nextTime += trackDurationStepSeconds(playbackCursor.step);
        playbackCursor.step += 1;
        if (playbackCursor.step >= STEPS) {
          playbackCursor.step = 0;
          playbackCursor.patternPos = (playbackCursor.patternPos + 1) % seq.length;
        }
      }
    }

    async function startPlayback() {
      await ensureAudio();
      isPlaying = true;
      playbackCursor = { patternPos: 0, step: 0, nextTime: audioCtx.currentTime + 0.06 };
      schedulerTimer = setInterval(scheduler, 25);
      ui.status.innerHTML = `<span class="status-good">再生中</span>`;
    }

    function stopPlayback() {
      isPlaying = false;
      if (schedulerTimer) clearInterval(schedulerTimer);
      schedulerTimer = null;
      scheduledNodes.forEach(node => {
        try { if (typeof node.stop === 'function') node.stop(); } catch (_) {}
        try { node.disconnect(); } catch (_) {}
      });
      scheduledNodes = [];
      stopHighlights();
      ui.status.textContent = '停止中';
    }

    function syncTopControls() {
      ui.swingValue.textContent = `${Math.round((parseFloat(ui.swing.value) || 0) * 100)}%`;
      ui.masterValue.textContent = `${Math.round((parseFloat(ui.master.value) || 0) * 100)}%`;
      if (masterGain) masterGain.gain.value = parseFloat(ui.master.value) || 0.75;
    }

    function normalizeSongSequence(text) {
      return text.split(/\s+/).map(s => s.trim()).filter(Boolean).map(s => s.toUpperCase());
    }

    function renderPatternPills() {
      ui.patternPills.innerHTML = '';
      project.patterns.forEach((p, idx) => {
        const pill = document.createElement('button');
        pill.className = 'pattern-pill' + (idx === currentPatternIndex ? ' active' : '');
        pill.textContent = p.name;
        pill.addEventListener('click', () => {
          currentPatternIndex = idx;
          renderAll();
        });
        ui.patternPills.appendChild(pill);
      });
    }

    function renderTracks() {
      ui.tracksEl.innerHTML = '';
      const current = getCurrentPattern();
      tracks.forEach(track => {
        const state = getTrackState(track.id, current);
        const labels = track.kind === 'melodic' ? track.notes : track.lanes;

        const trackEl = document.createElement('div');
        trackEl.className = 'track';

        const meta = document.createElement('div');
        meta.className = 'track-meta';
        meta.innerHTML = `<h3>${track.name} <span class="value">@${current.name}</span></h3>`;

        if (track.kind === 'melodic') {
          const waveField = document.createElement('div');
          waveField.className = 'field';
          waveField.innerHTML = `<label>波形</label><select><option value="sine">sine</option><option value="triangle">triangle</option><option value="square">square</option><option value="sawtooth">sawtooth</option></select>`;
          const sel = waveField.querySelector('select');
          sel.value = track.waveform;
          sel.addEventListener('change', e => { track.waveform = e.target.value; refreshSerializations(); });
          meta.appendChild(waveField);
        }

        const volField = document.createElement('div');
        volField.className = 'field';
        volField.innerHTML = `<label>音量</label><input type="range" min="0" max="1" step="0.01" value="${track.volume}"><div class="value">${Math.round(track.volume * 100)}%</div>`;
        const volRange = volField.querySelector('input');
        const volText = volField.querySelector('.value');
        volRange.addEventListener('input', e => {
          track.volume = parseFloat(e.target.value); volText.textContent = `${Math.round(track.volume * 100)}%`; refreshSerializations();
        });
        meta.appendChild(volField);

        if (track.kind === 'melodic') {
          const octField = document.createElement('div');
          octField.className = 'field';
          octField.innerHTML = `<label>オクターブ補正</label><input type="range" min="-2" max="2" step="1" value="${track.octaveShift}"><div class="value">${track.octaveShift}</div>`;
          const octRange = octField.querySelector('input');
          const octText = octField.querySelector('.value');
          octRange.addEventListener('input', e => {
            track.octaveShift = parseInt(e.target.value, 10); octText.textContent = String(track.octaveShift); refreshSerializations();
          });
          meta.appendChild(octField);
        }

        const seq = document.createElement('div');
        seq.className = 'sequencer';
        const roll = document.createElement('div');
        roll.className = 'piano-roll';
        const corner = document.createElement('div');
        corner.className = 'head';
        corner.textContent = track.kind === 'melodic' ? 'Note' : 'Drum';
        roll.appendChild(corner);

        for (let step = 0; step < STEPS; step++) {
          const head = document.createElement('div');
          head.className = 'head' + (step % 4 === 0 ? ' bar-start' : '');
          head.dataset.step = String(step);
          head.dataset.pattern = current.name;
          head.textContent = String(step + 1);
          roll.appendChild(head);
        }

        labels.forEach((label, rowIndex) => {
          const noteLabel = document.createElement('div');
          noteLabel.className = 'note-label';
          noteLabel.textContent = track.kind === 'melodic' ? shiftNote(label, track.octaveShift * 12) : label;
          roll.appendChild(noteLabel);
          for (let step = 0; step < STEPS; step++) {
            const cell = document.createElement('div');
            cell.className = 'cell' + (step % 4 === 0 ? ' bar-start' : '');
            cell.dataset.step = String(step);
            cell.dataset.pattern = current.name;
            if (state.pattern[rowIndex][step]) cell.classList.add('on');
            cell.addEventListener('click', () => {
              state.pattern[rowIndex][step] = !state.pattern[rowIndex][step];
              renderTracks();
              refreshSerializations();
            });
            roll.appendChild(cell);
          }
        });

        seq.appendChild(roll);
        trackEl.appendChild(meta);
        trackEl.appendChild(seq);
        ui.tracksEl.appendChild(trackEl);
      });
    }

    function clearCurrentPattern() {
      getCurrentPattern().tracks.forEach(track => track.pattern.forEach(row => row.fill(false)));
      renderAll();
    }

    function nextPatternName() {
      for (const name of patternNames) {
        if (!project.patterns.some(p => p.name === name)) return name;
      }
      return 'P' + (project.patterns.length + 1);
    }

    function addPattern() {
      const p = emptyPattern(nextPatternName());
      project.patterns.push(p);
      currentPatternIndex = project.patterns.length - 1;
      renderAll();
    }

    function duplicatePattern() {
      const src = structuredClone(getCurrentPattern());
      src.name = nextPatternName();
      project.patterns.push(src);
      currentPatternIndex = project.patterns.length - 1;
      renderAll();
    }

    function deletePattern() {
      if (project.patterns.length <= 1) return;
      const removed = getCurrentPattern().name;
      project.patterns.splice(currentPatternIndex, 1);
      currentPatternIndex = Math.max(0, currentPatternIndex - 1);
      project.songSequence = project.songSequence.filter(name => name !== removed);
      ui.songSequence.value = project.songSequence.join(' ');
      renderAll();
    }

    function projectToJSON() {
      return {
        tempo: parseFloat(ui.tempo.value),
        swing: parseFloat(ui.swing.value),
        master: parseFloat(ui.master.value),
        songSequence: normalizeSongSequence(ui.songSequence.value),
        trackSettings: tracks.map(t => ({ id: t.id, name: t.name, kind: t.kind, waveform: t.waveform, volume: t.volume, octaveShift: t.octaveShift, notes: t.notes, lanes: t.lanes })),
        patterns: project.patterns
      };
    }

    function loadProjectFromJSON(parsed) {
      if (typeof parsed.tempo === 'number') ui.tempo.value = parsed.tempo;
      if (typeof parsed.swing === 'number') ui.swing.value = parsed.swing;
      if (typeof parsed.master === 'number') ui.master.value = parsed.master;
      if (Array.isArray(parsed.songSequence)) ui.songSequence.value = parsed.songSequence.join(' ');
      (parsed.trackSettings || []).forEach(src => {
        const t = tracks.find(x => x.id === src.id);
        if (!t) return;
        if (typeof src.waveform === 'string') t.waveform = src.waveform;
        if (typeof src.volume === 'number') t.volume = src.volume;
        if (typeof src.octaveShift === 'number') t.octaveShift = src.octaveShift;
      });
      if (Array.isArray(parsed.patterns) && parsed.patterns.length) {
        project.patterns = parsed.patterns.map(p => ({
          name: p.name,
          tracks: p.tracks.map(ts => ({ id: ts.id, pattern: ts.pattern.map(row => row.slice(0, STEPS).map(Boolean)) }))
        }));
      }
      project.songSequence = normalizeSongSequence(ui.songSequence.value);
      currentPatternIndex = 0;
      renderAll();
    }

    function stepTokenForMelodic(track, patternState, step) {
      const notes = [];
      for (let row = 0; row < patternState.pattern.length; row++) {
        if (patternState.pattern[row][step]) notes.push(shiftNote(track.notes[row], track.octaveShift * 12));
      }
      if (!notes.length) return '.';
      if (notes.length === 1) return notes[0];
      return `[${notes.join(',')}]`;
    }

    function stepTokenForDrums(patternState, step) {
      const hits = [];
      for (let row = 0; row < patternState.pattern.length; row++) {
        if (patternState.pattern[row][step]) hits.push(drumShort[drumTrack.lanes[row]]);
      }
      if (!hits.length) return '.';
      if (hits.length === 1) return hits[0];
      return `[${hits.join(',')}]`;
    }

    function exportDSL() {
      const lines = [];
      lines.push(`@tempo ${parseFloat(ui.tempo.value) || 120}`);
      lines.push(`@swing ${(parseFloat(ui.swing.value) || 0).toFixed(2)}`);
      lines.push(`@song ${normalizeSongSequence(ui.songSequence.value).join(' ')}`);
      lines.push('');
      project.patterns.forEach(pattern => {
        lines.push(`@pattern ${pattern.name}`);
        melodicTracks.forEach(track => {
          const state = getTrackState(track.id, pattern);
          lines.push(`@track ${track.id} ${track.waveform} vol=${track.volume.toFixed(2)} octave=${track.octaveShift}`);
          const tokens = Array.from({ length: STEPS }, (_, step) => stepTokenForMelodic(track, state, step));
          lines.push(tokens.join(' '));
        });
        const drumState = getTrackState('drums', pattern);
        lines.push(`@track drums kit vol=${drumTrack.volume.toFixed(2)}`);
        const drumTokens = Array.from({ length: STEPS }, (_, step) => stepTokenForDrums(drumState, step));
        lines.push(drumTokens.join(' '));
        lines.push('');
      });
      return lines.join('\n').trim();
    }

    function uploadDSL() {
      const fileInput = document.getElementById('uploadDslBtn');
      fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; // 選択された最初のファイル
        const reader = new FileReader();

        // 読み込み完了時の処理
        reader.onload = () => {
          console.log(reader.result);
          importDSL(reader.result);
          exportDSL();
        };
        reader.readAsText(file); // テキストとして読み込み開始
      });
    }

    function importDSL(text) {
      const lines = text.split(/\r?\n/).map(s => s.trim()).filter(line => line && !line.startsWith('#'));
      let tempo = parseFloat(ui.tempo.value);
      let swing = parseFloat(ui.swing.value);
      let song = [];
      const newPatterns = [];
      let current = null;
      let currentTrack = null;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('@tempo ')) {
          tempo = parseFloat(line.slice(7).trim());
        } else if (line.startsWith('@swing ')) {
          swing = parseFloat(line.slice(7).trim());
        } else if (line.startsWith('@song ')) {
          song = normalizeSongSequence(line.slice(6));
        } else if (line.startsWith('@pattern ')) {
          current = emptyPattern(line.slice(9).trim().toUpperCase());
          newPatterns.push(current);
          currentTrack = null;
        } else if (line.startsWith('@track ')) {
          if (!current) throw new Error('pattern の前に track が来ている');
          const parts = line.split(/\s+/);
          const id = parts[1];
          currentTrack = tracks.find(t => t.id === id);
          if (!currentTrack) throw new Error('未知トラック: ' + id);
          const settingParts = Object.fromEntries(parts.slice(3).map(p => p.split('=').slice(0,2)));
          if (currentTrack.kind === 'melodic' && parts[2] && parts[2] !== 'kit') currentTrack.waveform = parts[2];
          if (settingParts.vol) currentTrack.volume = parseFloat(settingParts.vol);
          if (settingParts.octave) currentTrack.octaveShift = parseInt(settingParts.octave, 10);
          const noteLine = lines[++i];
          if (!noteLine) throw new Error('track の後にノート列がない');
          const tokens = noteLine.split(/\s+/).slice(0, STEPS);
          const state = getTrackState(id, current);
          state.pattern.forEach(row => row.fill(false));
          tokens.forEach((token, step) => {
            if (!token || token === '.') return;
            let values = [];
            if (token.startsWith('[') && token.endsWith(']')) values = token.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
            else values = [token];
            values.forEach(value => {
              if (id === 'drums') {
                const lane = drumLong[value.toUpperCase()];
                if (!lane) return;
                const row = drumTrack.lanes.indexOf(lane);
                if (row >= 0) state.pattern[row][step] = true;
              } else {
                const sourceNote = shiftNote(value, -currentTrack.octaveShift * 12);
                const row = currentTrack.notes.indexOf(sourceNote);
                if (row >= 0) state.pattern[row][step] = true;
              }
            });
          });
        }
      }
      if (!newPatterns.length) throw new Error('pattern が1つもない');
      ui.tempo.value = Number.isFinite(tempo) ? tempo : 120;
      ui.swing.value = Number.isFinite(swing) ? swing : 0;
      project.patterns = newPatterns;
      currentPatternIndex = 0;
      ui.songSequence.value = song.join(' ');
      project.songSequence = song;
      renderAll();
    }

    function refreshSerializations() {
      ui.dslArea.value = exportDSL();
    }

    function renderAll() {
      renderPatternPills();
      renderTracks();
      syncTopControls();
      refreshSerializations();
    }

    function loadDemo() {
      console.log('load demo dsl');
      const select = document.getElementById('demoSelect');
      const demoFile = select.value;
      const url = `./samples/${demoFile}.txt`
      fetch(url).then((response) => {
        if (response.ok) {
          response.text().then((txt) => {
            console.log(txt);
            importDSL(txt);
            exportDSL();
          });
        } else {
          console.log(response.status);
        }
      }).catch((err) => {
        console.error(err);
      });
      /*
      ensureBasePatterns();
      project.patterns = [emptyPattern('A'), emptyPattern('B')];
      currentPatternIndex = 0;
      ui.songSequence.value = 'A A B A';
      project.songSequence = ['A','A','B','A'];

      let state;
      state = getTrackState('lead', getPatternByName('A'));
      [[0,0],[2,1],[4,2],[4,4],[6,4],[8,5],[10,7],[12,8],[14,9]].forEach(([s,r]) => state.pattern[r][s] = true);
      state = getTrackState('pad', getPatternByName('A'));
      [0,4,8,12].forEach(s => { state.pattern[7][s] = true; state.pattern[4][s] = true; state.pattern[2][s] = true; });
      state = getTrackState('bass', getPatternByName('A'));
      [0,4,8,12].forEach(s => state.pattern[7][s] = true);
      [2,6,10,14].forEach(s => state.pattern[5][s] = true);
      state = getTrackState('drums', getPatternByName('A'));
      [0,4,8,12].forEach(s => state.pattern[0][s] = true);
      [4,12].forEach(s => state.pattern[1][s] = true);
      for (let i = 0; i < STEPS; i += 2) state.pattern[2][i] = true;
      [7,15].forEach(s => state.pattern[3][s] = true);

      state = getTrackState('lead', getPatternByName('B'));
      [[0,4],[1,4],[2,5],[4,6],[4,8],[6,5],[8,2],[8,4],[10,1],[12,0],[14,2]].forEach(([s,r]) => state.pattern[r][s] = true);
      state = getTrackState('pad', getPatternByName('B'));
      [0,4,8,12].forEach(s => { state.pattern[5][s] = true; state.pattern[3][s] = true; state.pattern[1][s] = true; });
      state = getTrackState('bass', getPatternByName('B'));
      [0,4,8,12].forEach(s => state.pattern[4][s] = true);
      [2,6,10,14].forEach(s => state.pattern[6][s] = true);
      state = getTrackState('drums', getPatternByName('B'));
      [0,6,8,12].forEach(s => state.pattern[0][s] = true);
      [4,12].forEach(s => state.pattern[1][s] = true);
      for (let i = 0; i < STEPS; i++) if (i !== 3 && i !== 11) state.pattern[2][i] = true;
      [7,15].forEach(s => state.pattern[3][s] = true);
      renderAll();
      */
    }

    function writeVarLen(value) {
      let buffer = value & 0x7F;
      const bytes = [];
      while ((value >>= 7)) {
        buffer <<= 8;
        buffer |= ((value & 0x7F) | 0x80);
      }
      while (true) {
        bytes.push(buffer & 0xFF);
        if (buffer & 0x80) buffer >>= 8; else break;
      }
      return bytes;
    }

    function strBytes(s) { return Array.from(s).map(c => c.charCodeAt(0)); }
    function u32be(n) { return [(n>>>24)&255, (n>>>16)&255, (n>>>8)&255, n&255]; }
    function u16be(n) { return [(n>>>8)&255, n&255]; }

    function buildMidiBytes() {
      const TPQN = 480;
      const events = [];
      const seq = getPlaybackSequence();
      let tick = 0;
      const ticksPerStep = TPQN / 4;
      const tempo = Math.round(60000000 / (parseFloat(ui.tempo.value) || 120));
      events.push({ tick: 0, order: 0, bytes: [0xFF, 0x51, 0x03, (tempo>>16)&255, (tempo>>8)&255, tempo&255] });
      events.push({ tick: 0, order: 1, bytes: [0xC0, 80] });

      const melodicChannels = { lead: 0, pad: 1, bass: 2 };
      const drumChannel = 9;
      const velocityMap = { lead: 100, pad: 76, bass: 90 };
      const drumVel = { Kick: 110, Snare: 100, Hat: 72, Clap: 90 };
      const drumMidi = { Kick: 36, Snare: 38, Hat: 42, Clap: 39 };

      seq.forEach(name => {
        const pattern = getPatternByName(name);
        if (!pattern) return;
        for (let step = 0; step < STEPS; step++) {
          melodicTracks.forEach(track => {
            const state = getTrackState(track.id, pattern);
            const activeRows = [];
            for (let row = 0; row < state.pattern.length; row++) if (state.pattern[row][step]) activeRows.push(row);
            activeRows.forEach(row => {
              const note = shiftNote(track.notes[row], track.octaveShift * 12);
              const midi = noteToMidi(note);
              const ch = melodicChannels[track.id];
              events.push({ tick, order: 2, bytes: [0x90 | ch, midi, velocityMap[track.id]] });
              events.push({ tick: tick + Math.round(ticksPerStep * 0.95), order: 6, bytes: [0x80 | ch, midi, 0] });
            });
          });
          const drumState = getTrackState('drums', pattern);
          drumTrack.lanes.forEach((lane, row) => {
            if (!drumState.pattern[row][step]) return;
            const midi = drumMidi[lane];
            events.push({ tick, order: 3, bytes: [0x99, midi, drumVel[lane]] });
            events.push({ tick: tick + Math.round(ticksPerStep * 0.5), order: 7, bytes: [0x89, midi, 0] });
          });
          tick += ticksPerStep;
        }
      });
      events.push({ tick, order: 9, bytes: [0xFF, 0x2F, 0x00] });
      events.sort((a,b) => a.tick - b.tick || a.order - b.order);

      let lastTick = 0;
      const trackData = [];
      events.forEach(ev => {
        const delta = ev.tick - lastTick;
        trackData.push(...writeVarLen(delta), ...ev.bytes);
        lastTick = ev.tick;
      });

      const header = [...strBytes('MThd'), ...u32be(6), ...u16be(0), ...u16be(1), ...u16be(TPQN)];
      const trackChunk = [...strBytes('MTrk'), ...u32be(trackData.length), ...trackData];
      return new Uint8Array([...header, ...trackChunk]);
    }

    function downloadDSL() {
      const dslArea = document.getElementById("dslArea");
      const text = dslArea.innerText;
      const blob = new Blob([ text ], { "type" : "text/plain" });
      const blobUrl = URL.createObjectURL(blob);
      browser.downloads.download({
        url: blobUrl,
        filename: 'dsl.txt', // You can suggest subfolders (requires Firefox 51+)
        saveAs: false, // Set to true to prompt the user for a save location
      })
      .then((id) => {
        console.log(`Download started with id: ${id}`);
        // Clean up the blob URL after the download is initiated by the API
        URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error(`Download failed: ${error}`);
        URL.revokeObjectURL(blobUrl); // Revoke even on error
      });
    }

  
    function downloadDSL() {
      const text = ui.dslArea.value;
      const blob = new Blob([ text ], { "type" : "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'browser_daw_song.txt';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function downloadMidi() {
      const bytes = buildMidiBytes();
      const blob = new Blob([bytes], { type: 'audio/midi' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'browser_daw_song.mid';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function loadDemoDsl() {
      ui.dslArea.value = `@tempo 128\n@swing 0.04\n@song A A B A\n\n@pattern A\n@track lead square vol=0.80 octave=0\nE5 . D5 . [C5,E5] . A4 . G4 . E4 . D4 . C4 .\n@track pad triangle vol=0.50 octave=-1\n[C4,E4,G4] . . . [A3,C4,F4] . . . [G3,B3,E4] . . . [C4,E4,G4] . . .\n@track bass sawtooth vol=0.70 octave=-2\nC3 . G2 . A2 . E2 . F2 . C2 . G2 . C3 .\n@track drums kit vol=0.90\n[K,H] . H . [S,H] . H C [K,H] . H . [S,H] . H .\n\n@pattern B\n@track lead square vol=0.80 octave=0\nA4 A4 C5 . D5 . E5 . [E5,G5] . D5 . C5 . A4 .\n@track pad triangle vol=0.50 octave=-1\n[F3,A3,C4] . . . [G3,B3,D4] . . . [E3,G3,C4] . . . [F3,A3,C4] . . .\n@track bass sawtooth vol=0.70 octave=-2\nF2 . C2 . G2 . D2 . E2 . B1 . F2 . C2 .\n@track drums kit vol=0.90\n[K,H] H . H [S,H] . H C [K,H] H . H [S,H] . H .`;
    }

    document.getElementById('playBtn').addEventListener('click', async () => {
      if (isPlaying) return;
      try { await startPlayback(); } catch (e) { alert('再生失敗: ' + e.message); }
    });
    document.getElementById('stopBtn').addEventListener('click', stopPlayback);
    document.getElementById('clearPatternBtn').addEventListener('click', clearCurrentPattern);
    document.getElementById('demoBtn').addEventListener('click', loadDemo);
    document.getElementById('addPatternBtn').addEventListener('click', addPattern);
    document.getElementById('dupPatternBtn').addEventListener('click', duplicatePattern);
    document.getElementById('delPatternBtn').addEventListener('click', deletePattern);
    document.getElementById('normalizeSongBtn').addEventListener('click', () => {
      ui.songSequence.value = normalizeSongSequence(ui.songSequence.value).join(' ');
      refreshSerializations();
    });
    document.getElementById('patternLoopBtn').addEventListener('click', () => {
      ui.songSequence.value = getCurrentPattern().name;
      refreshSerializations();
    });
    document.getElementById('downloadMidiBtn').addEventListener('click', downloadMidi);
    document.getElementById('downloadDSLBtn').addEventListener('click', downloadDSL)
    document.getElementById('copyDslBtn').addEventListener('click', async () => {
      const text = exportDSL();
      ui.dslArea.value = text;
      try { await navigator.clipboard.writeText(text); ui.status.innerHTML = `<span class="status-good">DSLをコピーした</span>`; }
      catch (_) { ui.status.innerHTML = `<span class="status-warn">DSLを書き出した。コピーは手動でどうぞ</span>`; }
    });
    document.getElementById('loadDslBtn').addEventListener('click', () => {
      try { importDSL(ui.dslArea.value); ui.status.innerHTML = `<span class="status-good">DSLを読み込んだ</span>`; }
      catch (e) { alert('DSL読み込み失敗: ' + e.message); }
    });
    document.getElementById('uploadDslBtn').addEventListener('click', () => {
      uploadDSL();
    });
    /*
    document.getElementById('exportJsonBtn').addEventListener('click', () => {
      ui.dslArea.value = JSON.stringify(projectToJSON(), null, 2);
      ui.status.innerHTML = `<span class="status-good">JSONを書き出した</span>`;
    });

    document.getElementById('importJsonBtn').addEventListener('click', () => {
      try { loadProjectFromJSON(JSON.parse(ui.dslArea.value)); ui.status.innerHTML = `<span class="status-good">JSONを読み込んだ</span>`; }
      catch (e) { alert('JSON読み込み失敗: ' + e.message); }
    });
    */
    document.getElementById('loadDemoDslBtn').addEventListener('click', loadDemoDsl);
    ui.swing.addEventListener('input', () => { syncTopControls(); refreshSerializations(); });
    ui.master.addEventListener('input', () => { syncTopControls(); refreshSerializations(); });
    ui.tempo.addEventListener('input', refreshSerializations);
    ui.songSequence.addEventListener('input', refreshSerializations);

    ensureBasePatterns();
    loadDemo();
})();