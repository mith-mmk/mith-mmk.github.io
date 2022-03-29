
let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
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
    if (builtInMatches.length > 1) {
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

let WASM_VECTOR_LEN = 0;

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

let cachedTextEncoder = new TextEncoder('utf-8');

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
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

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
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
*/
export function initialization() {
    wasm.initialization();
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetUint8ClampedMemory0 = null;
function getUint8ClampedMemory0() {
    if (cachegetUint8ClampedMemory0 === null || cachegetUint8ClampedMemory0.buffer !== wasm.memory.buffer) {
        cachegetUint8ClampedMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachegetUint8ClampedMemory0;
}

function getClampedArrayU8FromWasm0(ptr, len) {
    return getUint8ClampedMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
export class Universe {

    static __wrap(ptr) {
        const obj = Object.create(Universe.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_universe_free(ptr);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @returns {Universe}
    */
    static new(width, height) {
        var ret = wasm.universe_new(width, height);
        return Universe.__wrap(ret);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @returns {Universe}
    */
    static newOnWorker(width, height) {
        var ret = wasm.universe_newOnWorker(width, height);
        return Universe.__wrap(ret);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @returns {number}
    */
    appendCanvas(width, height) {
        var ret = wasm.universe_appendCanvas(this.ptr, width, height);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    inputBuffer() {
        var ret = wasm.universe_inputBuffer(this.ptr);
        return ret;
    }
    /**
    * @param {number} size
    * @returns {number}
    */
    inputBufferWithLength(size) {
        var ret = wasm.universe_inputBufferWithLength(this.ptr, size);
        return ret;
    }
    /**
    * @param {number} color
    */
    clear(color) {
        wasm.universe_clear(this.ptr, color);
    }
    /**
    * @param {number} number
    */
    clearSelectCanvas(number) {
        wasm.universe_clearSelectCanavas(this.ptr, number);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} color
    * @param {number} s
    */
    pointAntialias(x, y, color, s) {
        wasm.universe_pointAntialias(this.ptr, x, y, color, s);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} color
    */
    pointWithPen(x, y, color) {
        wasm.universe_pointWithPen(this.ptr, x, y, color);
    }
    /**
    * @param {number} sx
    * @param {number} sy
    * @param {number} ex
    * @param {number} ey
    * @param {number} color
    */
    line(sx, sy, ex, ey, color) {
        wasm.universe_line(this.ptr, sx, sy, ex, ey, color);
    }
    /**
    * @param {number} sx
    * @param {number} sy
    * @param {number} ey
    * @param {number} ex
    * @param {number} color
    */
    lineWithPen(sx, sy, ey, ex, color) {
        wasm.universe_lineWithPen(this.ptr, sx, sy, ey, ex, color);
    }
    /**
    * @param {number} sx
    * @param {number} sy
    * @param {number} ey
    * @param {number} ex
    * @param {number} color
    */
    rect(sx, sy, ey, ex, color) {
        wasm.universe_rect(this.ptr, sx, sy, ey, ex, color);
    }
    /**
    * @param {number} ox
    * @param {number} oy
    * @param {number} r
    * @param {number} tilde
    * @param {number} color
    */
    pentagram(ox, oy, r, tilde, color) {
        wasm.universe_pentagram(this.ptr, ox, oy, r, tilde, color);
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
        wasm.universe_polygram(this.ptr, p, q, ox, oy, r, tilde, color);
    }
    /**
    * @returns {number}
    */
    getBuffer() {
        var ret = wasm.universe_getBuffer(this.ptr);
        return ret;
    }
    /**
    * @param {number} number
    * @returns {number}
    */
    getBufferSelectCanvas(number) {
        var ret = wasm.universe_getBufferSelectCanvas(this.ptr, number);
        return ret;
    }
    /**
    * @returns {number}
    */
    getWidth() {
        var ret = wasm.universe_getWidth(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    getHeight() {
        var ret = wasm.universe_getHeight(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} sx
    * @param {number} sy
    * @param {number} color
    */
    fill(sx, sy, color) {
        wasm.universe_fill(this.ptr, sx, sy, color);
    }
    /**
    * @param {number} ox
    * @param {number} oy
    * @param {number} r
    * @param {number} color
    */
    circle(ox, oy, r, color) {
        wasm.universe_circle(this.ptr, ox, oy, r, color);
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
        wasm.universe_ellipse(this.ptr, ox, oy, rx, ry, tilde, color);
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
        wasm.universe_quadraticCurve(this.ptr, x1, y1, x2, y2, x3, y3, a, color);
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
        wasm.universe_bezierCurve(this.ptr, x1, y1, x2, y2, x3, y3, color);
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
        wasm.universe_bezierCurve3(this.ptr, x1, y1, x2, y2, x3, y3, x4, y4, color);
    }
    /**
    * @param {number} canvas_in
    * @param {number} canvas_out
    * @param {number} no
    * @param {number} interpolation
    */
    affineTest2(canvas_in, canvas_out, no, interpolation) {
        wasm.universe_affineTest2(this.ptr, canvas_in, canvas_out, no, interpolation);
    }
    /**
    * @param {number} canvas_in
    * @param {number} canvas_out
    */
    affineTest(canvas_in, canvas_out) {
        wasm.universe_affineTest(this.ptr, canvas_in, canvas_out);
    }
    /**
    * @param {Uint8Array} buffer
    * @param {number} verbose
    */
    imageDecoder(buffer, verbose) {
        var ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.universe_imageDecoder(this.ptr, ptr0, len0, verbose);
    }
    /**
    * @param {Uint8Array} buffer
    * @param {number} verbose
    */
    jpegDecoder(buffer, verbose) {
        var ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.universe_jpegDecoder(this.ptr, ptr0, len0, verbose);
    }
    /**
    * @param {Uint8Array} buffer
    * @param {number} verbose
    * @param {number} number
    */
    jpegDecoderSelectCanvas(buffer, verbose, number) {
        var ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.universe_jpegDecoderSelectCanvas(this.ptr, ptr0, len0, verbose, number);
    }
    /**
    * @param {string} canvas
    */
    bindCanvas(canvas) {
        var ptr0 = passStringToWasm0(canvas, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.universe_bindCanvas(this.ptr, ptr0, len0);
    }
    /**
    * @param {string} canvas
    */
    bindCanvas2(canvas) {
        var ptr0 = passStringToWasm0(canvas, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.universe_bindCanvas2(this.ptr, ptr0, len0);
    }
    /**
    * @param {number} width
    * @param {number} height
    */
    drawCanvas(width, height) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.universe_drawCanvas(retptr, this.ptr, width, height);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {number} no
    */
    drawSelectCanvas(width, height, no) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.universe_drawSelectCanvas(retptr, this.ptr, width, height, no);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} width
    * @param {number} height
    */
    drawCanvas2(width, height) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.universe_drawCanvas2(retptr, this.ptr, width, height);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {number} no
    */
    drawSelectCanvas2(width, height, no) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.universe_drawSelectCanvas2(retptr, this.ptr, width, height, no);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

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

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('affine_bg.wasm', import.meta.url);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_log_053b47cf31418d63 = function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_alert_dfd756a22e15b8f8 = function(arg0, arg1) {
        alert(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_new_693216e109162396 = function() {
        var ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_0ddaca5d1abfb52f = function(arg0, arg1) {
        var ret = getObject(arg1).stack;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_09919627ac0992f5 = function(arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    };
    imports.wbg.__wbg_instanceof_Window_434ce1849eb4e0fc = function(arg0) {
        var ret = getObject(arg0) instanceof Window;
        return ret;
    };
    imports.wbg.__wbg_document_5edd43643d1060d9 = function(arg0) {
        var ret = getObject(arg0).document;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_getElementById_b30e88aff96f66a1 = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithu8clampedarrayandsh_b908678603f3dc4e = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        var ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0, arg3 >>> 0);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_instanceof_HtmlElement_d3e8f1c1d6788b24 = function(arg0) {
        var ret = getObject(arg0) instanceof HTMLElement;
        return ret;
    };
    imports.wbg.__wbg_setinnerText_c3f35135f8c5259e = function(arg0, arg1, arg2) {
        getObject(arg0).innerText = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_instanceof_CanvasRenderingContext2d_e8b3a478a1b32d55 = function(arg0) {
        var ret = getObject(arg0) instanceof CanvasRenderingContext2D;
        return ret;
    };
    imports.wbg.__wbg_putImageData_4b3f33d7415a7f64 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).putImageData(getObject(arg1), arg2, arg3);
    }, arguments) };
    imports.wbg.__wbg_instanceof_HtmlCanvasElement_a6157e470d06b638 = function(arg0) {
        var ret = getObject(arg0) instanceof HTMLCanvasElement;
        return ret;
    };
    imports.wbg.__wbg_getContext_bd4e9445094eda84 = function() { return handleError(function (arg0, arg1, arg2) {
        var ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_newnoargs_f579424187aa1717 = function(arg0, arg1) {
        var ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_89558c3e96703ca1 = function() { return handleError(function (arg0, arg1) {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_self_e23d74ae45fb17d1 = function() { return handleError(function () {
        var ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_b4be7f48b24ac56e = function() { return handleError(function () {
        var ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_d61b1f48a57191ae = function() { return handleError(function () {
        var ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_e7669da72fd7f239 = function() { return handleError(function () {
        var ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        var ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        var ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        var ret = debugString(getObject(arg1));
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    wasm.__wbindgen_start();
    return wasm;
}

export default init;

