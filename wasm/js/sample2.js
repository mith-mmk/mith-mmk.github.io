import init,{Universe} from "../pkg/grayscale.js";  // Universeは要インポート wasm.Universeでは動かない

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
const scale_type = document.getElementById('scale-type');
const width = canvas.width;
const height =canvas.height;
canvas2.width = width;
canvas2.height = height;

function jsinit(wasm) {
    const memory = wasm.memory; // 共有メモリーに必要
    // 共有メモリーのアドレスの取得
    const universe = Universe.new(width,height);
    const img = new Image();
    let buffersize = width * height * 4;
    let ibuf = new Uint8Array(memory.buffer,universe.input_buffer(), buffersize);
    let buf = new Uint8ClampedArray(memory.buffer,universe.output_buffer(), buffersize);
    clearCanvas();
    img.src = './images/sample01.jpg';

    function clearCanvas() {
      universe.clear(0x0);
      let imgData = new ImageData(buf, width, height);
      ctx.putImageData(imgData, 0, 0);
    }


    function toGrayscale() {
      universe.to_grayscale(scale_type.value);
      let imgData = new ImageData(buf, width, height);
      ctx2.putImageData(imgData, 0, 0);
    }


    img.onload = (ev) => {
      // スケーリング（画像をCanvasサイズに縮小する）
      let drawWidth = img.width;
      let drawHeight = img.height;
      if (img.width > width) {
        drawWidth = width;
        drawHeight = width / img.width * img.height;
      }
      console.log(img.width,img.height,width,height,drawWidth,drawHeight);
      if (drawHeight > height){
        drawHeight = height;
        drawWidth = drawHeight / img.height * drawWidth;
      }
      clearCanvas();
      console.log(width,height,drawWidth,drawHeight);
      ctx.drawImage(img,0,0,img.width,img.height,0,0,drawWidth,drawHeight);
      const imgData = ctx.getImageData(0, 0, width, height);
      ibuf.set(imgData.data);
      toGrayscale();
    }

    scale_type.addEventListener('change', (ev) => {
      toGrayscale();
    });

    // Drag and Drop
    canvas.addEventListener('dragover', (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        canvas.style.border = 'solid 10px #e1e7f0';
    }, false);

    canvas.addEventListener('drop', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      canvas.style.border = '';
      const files = ev.dataTransfer.files; 
      if (!files[0].type.match(/image\/*/)) {
        return;
      }
      if (files.length > 1) return alert('Illigal Operation.Multi Files Select.');
      const reader = new FileReader();
      reader.onload = (event) => {
        img.src = event.target.result;
      };
      reader.readAsDataURL(files[0]);
    }, false);
}

init().then((wasm) => {
  jsinit(wasm);
});