let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedUint8ClampedArrayMemory0 = null;

function getUint8ClampedArrayMemory0() {
    if (cachedUint8ClampedArrayMemory0 === null || cachedUint8ClampedArrayMemory0.byteLength === 0) {
        cachedUint8ClampedArrayMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachedUint8ClampedArrayMemory0;
}

function getClampedArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ClampedArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

export function initialization() {
    wasm.initialization();
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_2.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getDataViewMemory0();
    for (let i = 0; i < array.length; i++) {
        mem.setUint32(ptr + 4 * i, addToExternrefTable0(array[i]), true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

const UniverseFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_universe_free(ptr >>> 0, 1));

export class Universe {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Universe.prototype);
        obj.__wbg_ptr = ptr;
        UniverseFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UniverseFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_universe_free(ptr, 0);
    }
    /**
     * @param {number} no
     * @param {number} value1
     * @param {number} value2
     */
    affineAdd(no, value1, value2) {
        wasm.universe_affineAdd(this.__wbg_ptr, no, value1, value2);
    }
    affineNew() {
        wasm.universe_affineNew(this.__wbg_ptr);
    }
    /**
     * @param {number} canvas_in
     * @param {number} canvas_out
     * @param {number} interpolation
     */
    affineRun(canvas_in, canvas_out, interpolation) {
        wasm.universe_affineRun(this.__wbg_ptr, canvas_in, canvas_out, interpolation);
    }
    /**
     * @returns {number}
     */
    layersLength() {
        const ret = wasm.universe_layersLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    nextFrame() {
        const ret = wasm.universe_nextFrame(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {string} label
     */
    setEnable(label) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_setEnable(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} canvas_in
     * @param {number} canvas_out
     */
    affineTest(canvas_in, canvas_out) {
        wasm.universe_affineTest(this.__wbg_ptr, canvas_in, canvas_out);
    }
    /**
     * Javascript bindCanvas() is bind rust canvas and Web Canvas.
     * This function cannnot run on web worker.
     * @param {string} canvas
     */
    bindCanvas(canvas) {
        const ptr0 = passStringToWasm0(canvas, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_bindCanvas(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} label
     */
    clearLayer(label) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_clearLayer(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Javascript drawCanvas() draws binded WebCanvas.
     * Must call bindCanvas2 before.
     * This function cannnot run on web worker.
     * @param {number} width
     * @param {number} height
     */
    drawCanvas(width, height) {
        const ret = wasm.universe_drawCanvas(this.__wbg_ptr, width, height);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string} label
     * @returns {number}
     */
    getLayerAlpha(label) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.universe_getLayerAlpha(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string} label
     * @returns {string}
     */
    setCurrentLayer(label) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.universe_setCurrentLayer(this.__wbg_ptr, ptr0, len0);
            deferred2_0 = ret[0];
            deferred2_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @param {string} label
     */
    setDisable(label) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_setDisable(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} canvas_in
     * @param {number} canvas_out
     * @param {number} no
     * @param {number} interpolation
     */
    affineTest2(canvas_in, canvas_out, no, interpolation) {
        wasm.universe_affineTest2(this.__wbg_ptr, canvas_in, canvas_out, no, interpolation);
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} x3
     * @param {number} y3
     * @param {number} color
     */
    bezierCurve(x1, y1, x2, y2, x3, y3, color) {
        wasm.universe_bezierCurve(this.__wbg_ptr, x1, y1, x2, y2, x3, y3, color);
    }
    /**
     * Javascript bindCanvas2() is bind rust canvas and Web Canvas 2nd.
     * This function cannnot run on web worker.
     * @param {string} canvas
     */
    bindCanvas2(canvas) {
        const ptr0 = passStringToWasm0(canvas, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_bindCanvas2(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} width
     * @param {number} height
     */
    drawCanvas2(width, height) {
        const ret = wasm.universe_drawCanvas2(this.__wbg_ptr, width, height);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {Uint8Array} buffer
     * @param {number} interlop
     */
    imageLoader(buffer, interlop) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_imageLoader(this.__wbg_ptr, ptr0, len0, interlop);
    }
    /**
     * @returns {boolean}
     */
    isAnimation() {
        const ret = wasm.universe_isAnimation(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} buffer
     * @param {number} verbose
     */
    jpegDecoder(buffer, verbose) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_imageDecoder(this.__wbg_ptr, ptr0, len0, verbose);
    }
    /**
     * @param {number} width
     * @param {number} height
     * @returns {number}
     */
    appendCanvas(width, height) {
        const ret = wasm.universe_appendCanvas(this.__wbg_ptr, width, height);
        return ret >>> 0;
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} x3
     * @param {number} y3
     * @param {number} x4
     * @param {number} y4
     * @param {number} color
     */
    bezierCurve3(x1, y1, x2, y2, x3, y3, x4, y4, color) {
        wasm.universe_bezierCurve3(this.__wbg_ptr, x1, y1, x2, y2, x3, y3, x4, y4, color);
    }
    /**
     * @param {number} no
     * @returns {ImageData}
     */
    getImageData(no) {
        const ret = wasm.universe_getImageData(this.__wbg_ptr, no);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} buffer
     * @param {number} verbose
     */
    imageDecoder(buffer, verbose) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_imageDecoder(this.__wbg_ptr, ptr0, len0, verbose);
    }
    /**
     * @param {number} sx
     * @param {number} sy
     * @param {number} ey
     * @param {number} ex
     * @param {number} color
     */
    lineWithPen(sx, sy, ey, ex, color) {
        wasm.universe_lineWithPen(this.__wbg_ptr, sx, sy, ey, ex, color);
    }
    /**
     * @param {number} width
     * @param {number} height
     * @returns {Universe}
     */
    static newOnWorker(width, height) {
        const ret = wasm.universe_newOnWorker(width, height);
        return Universe.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    getBuffer() {
        const ret = wasm.universe_getBuffer(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} sx
     * @param {number} sy
     * @param {number} ex
     * @param {number} ey
     * @param {number} color
     */
    lineAntialias(sx, sy, ex, ey, color) {
        wasm.universe_lineAntialias(this.__wbg_ptr, sx, sy, ex, ey, color);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} color
     */
    pointWithPen(x, y, color) {
        wasm.universe_pointWithPen(this.__wbg_ptr, x, y, color);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} color
     * @param {number} alpha
     */
    pointAntialias(x, y, color, alpha) {
        wasm.universe_pointAntialias(this.__wbg_ptr, x, y, color, alpha);
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} x3
     * @param {number} y3
     * @param {number} a
     * @param {number} color
     */
    quadraticCurve(x1, y1, x2, y2, x3, y3, a, color) {
        wasm.universe_quadraticCurve(this.__wbg_ptr, x1, y1, x2, y2, x3, y3, a, color);
    }
    /**
     * @param {string} label
     * @param {number} alpha
     */
    setLayerAlpha(label, alpha) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_setLayerAlpha(this.__wbg_ptr, ptr0, len0, alpha);
    }
    /**
     * @param {number} ox
     * @param {number} oy
     * @param {number} r
     * @param {number} color
     * @param {number} alpha
     * @param {number} size
     */
    circleAntialias(ox, oy, r, color, alpha, size) {
        wasm.universe_circleAntialias(this.__wbg_ptr, ox, oy, r, color, alpha, size);
    }
    /**
     * @param {number} number
     */
    clearSelectCanvas(number) {
        wasm.universe_clearSelectCanvas(this.__wbg_ptr, number);
    }
    /**
     * @param {number} ox
     * @param {number} oy
     * @param {number} rx
     * @param {number} ry
     * @param {number} tilde
     * @param {number} color
     * @param {number} alpha
     * @param {number} size
     */
    ellipseAntialias(ox, oy, rx, ry, tilde, color, alpha, size) {
        wasm.universe_ellipseAntialias(this.__wbg_ptr, ox, oy, rx, ry, tilde, color, alpha, size);
    }
    /**
     * @param {number} number
     * @returns {number}
     */
    getBufferSelectCanvas(number) {
        const ret = wasm.universe_getBufferSelectCanvas(this.__wbg_ptr, number);
        return ret >>> 0;
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} x3
     * @param {number} y3
     * @param {number} color
     * @param {number} size
     */
    bezierCurveAntialias(x1, y1, x2, y2, x3, y3, color, size) {
        wasm.universe_bezierCurveAntialias(this.__wbg_ptr, x1, y1, x2, y2, x3, y3, color, size);
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} x3
     * @param {number} y3
     * @param {number} x4
     * @param {number} y4
     * @param {number} color
     * @param {number} size
     */
    bezierCurve3Antialias(x1, y1, x2, y2, x3, y3, x4, y4, color, size) {
        wasm.universe_bezierCurve3Antialias(this.__wbg_ptr, x1, y1, x2, y2, x3, y3, x4, y4, color, size);
    }
    /**
     * Javascript drawSelectCanvas() draws binded WebCanvas 1st.
     * A no selects main canvas or append canvases
     * Must call bindCanvas() before.
     * This function cannnot run on web worker.
     * @param {number} width
     * @param {number} height
     * @param {number} no
     */
    drawSelectCanvas(width, height, no) {
        const ret = wasm.universe_drawSelectCanvas(this.__wbg_ptr, width, height, no);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} width
     * @param {number} height
     * @param {number} no
     */
    drawSelectCanvas2(width, height, no) {
        const ret = wasm.universe_drawSelectCanvas2(this.__wbg_ptr, width, height, no);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} x3
     * @param {number} y3
     * @param {number} a
     * @param {number} color
     * @param {number} size
     */
    quadraticCurveAntialias(x1, y1, x2, y2, x3, y3, a, color, size) {
        wasm.universe_quadraticCurveAntialias(this.__wbg_ptr, x1, y1, x2, y2, x3, y3, a, color, size);
    }
    /**
     * @param {Uint8Array} buffer
     * @param {number} verbose
     * @param {number} number
     */
    jpegDecoderSelectCanvas(buffer, verbose, number) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_jpegDecoderSelectCanvas(this.__wbg_ptr, ptr0, len0, verbose, number);
    }
    /**
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
        const ret = wasm.universe_new(width, height);
        this.__wbg_ptr = ret >>> 0;
        UniverseFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} sx
     * @param {number} sy
     * @param {number} color
     */
    fill(sx, sy, color) {
        wasm.universe_fill(this.__wbg_ptr, sx, sy, color);
    }
    /**
     * @param {number} sx
     * @param {number} sy
     * @param {number} ex
     * @param {number} ey
     * @param {number} color
     */
    line(sx, sy, ex, ey, color) {
        wasm.universe_line(this.__wbg_ptr, sx, sy, ex, ey, color);
    }
    /**
     * @param {number} sx
     * @param {number} sy
     * @param {number} ey
     * @param {number} ex
     * @param {number} color
     */
    rect(sx, sy, ey, ex, color) {
        wasm.universe_rect(this.__wbg_ptr, sx, sy, ey, ex, color);
    }
    /**
     * @param {number} color
     */
    clear(color) {
        wasm.universe_clear(this.__wbg_ptr, color);
    }
    /**
     * @returns {number}
     */
    getWidth() {
        const ret = wasm.universe_getWidth(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} ox
     * @param {number} oy
     * @param {number} r
     * @param {number} color
     */
    circle(ox, oy, r, color) {
        wasm.universe_circle(this.__wbg_ptr, ox, oy, r, color);
    }
    /**
     * @param {string} label
     * @returns {boolean}
     */
    getEnable(label) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.universe_getEnable(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {number} canvas_in
     * @param {number} canvas_out
     * @param {string} filter_name
     */
    filter(canvas_in, canvas_out, filter_name) {
        const ptr0 = passStringToWasm0(filter_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_filter(this.__wbg_ptr, canvas_in, canvas_out, ptr0, len0);
    }
    /**
     * @returns {number}
     */
    getHeight() {
        const ret = wasm.universe_getHeight(this.__wbg_ptr);
        return ret >>> 0;
    }
    combine() {
        wasm.universe_combine(this.__wbg_ptr);
    }
    /**
     * @param {number} ox
     * @param {number} oy
     * @param {number} rx
     * @param {number} ry
     * @param {number} tilde
     * @param {number} color
     */
    ellipse(ox, oy, rx, ry, tilde, color) {
        wasm.universe_ellipse(this.__wbg_ptr, ox, oy, rx, ry, tilde, color);
    }
    /**
     * @param {number} canvas_in
     * @param {number} canvas_out
     * @param {(string)[]} filter_names
     */
    filters(canvas_in, canvas_out, filter_names) {
        const ptr0 = passArrayJsValueToWasm0(filter_names, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_filters(this.__wbg_ptr, canvas_in, canvas_out, ptr0, len0);
    }
    /**
     * @param {string} label
     * @param {number} x
     * @param {number} y
     */
    setPos(label, x, y) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_setPos(this.__wbg_ptr, ptr0, len0, x, y);
    }
    /**
     * @param {number} p
     * @param {number} q
     * @param {number} ox
     * @param {number} oy
     * @param {number} r
     * @param {number} tilde
     * @param {number} color
     */
    polygram(p, q, ox, oy, r, tilde, color) {
        wasm.universe_polygram(this.__wbg_ptr, p, q, ox, oy, r, tilde, color);
    }
    /**
     * @param {string} label
     * @param {number} width
     * @param {number} height
     */
    addLayer(label, width, height) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_addLayer(this.__wbg_ptr, ptr0, len0, width, height);
    }
    /**
     * @param {string} commands
     * @param {number} color
     */
    drawPath(commands, color) {
        const ptr0 = passStringToWasm0(commands, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_drawPath(this.__wbg_ptr, ptr0, len0, color);
    }
    /**
     * @param {number} ox
     * @param {number} oy
     * @param {number} r
     * @param {number} tilde
     * @param {number} color
     */
    pentagram(ox, oy, r, tilde, color) {
        wasm.universe_pentagram(this.__wbg_ptr, ox, oy, r, tilde, color);
    }
    /**
     * @param {number} canvas_in
     * @param {number} canvas_out
     */
    sharpness(canvas_in, canvas_out) {
        wasm.universe_sharpness(this.__wbg_ptr, canvas_in, canvas_out);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_alert_fac757662099db4f = function(arg0, arg1) {
        alert(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_call_7b07808271da073d = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_document_ca39af41dac33066 = function(arg0) {
        const ret = arg0.document;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_getContext_fb7329127906d53c = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getElementById_17544552e287054e = function(arg0, arg1, arg2) {
        const ret = arg0.getElementById(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_globalThis_f95b2833d5f4cdb8 = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_global_8af85b9e930021de = function() { return handleError(function () {
        const ret = global.global;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_innerText_7e3a9a0fbf46e524 = function(arg0, arg1) {
        const ret = arg1.innerText;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_instanceof_CanvasRenderingContext2d_470caa38734a9675 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof CanvasRenderingContext2D;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlCanvasElement_8a1d9db1a3bd2a52 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLCanvasElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlElement_470d24a0b4ffbe8f = function(arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Window_9d6bf0736a2153f6 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Window;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_log_97701579f775e2c8 = function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
        const ret = new Error();
        return ret;
    };
    imports.wbg.__wbg_newnoargs_64f19e6bf33dbf9c = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_newwithu8clampedarrayandsh_a2aa97c40100d312 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_putImageData_4927e354ea650362 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.putImageData(arg1, arg2, arg3);
    }, arguments) };
    imports.wbg.__wbg_self_59cc49f75c973fb6 = function() { return handleError(function () {
        const ret = self.self;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setinnerText_8bc601ff736e474a = function(arg0, arg1, arg2) {
        arg0.innerText = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
        const ret = arg1.stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_window_f5a0f1c8f878e4c3 = function() { return handleError(function () {
        const ret = window.window;
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_2;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    cachedUint8ClampedArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('paint_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
