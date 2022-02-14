
let wasm;

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }
/**
* @returns {number}
*/
export function get_buffer() {
    var ret = wasm.get_buffer();
    return ret;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {Uint8Array} buf
* @param {number} width
* @param {number} height
* @param {number} color
*/
export function fillbox(buf, width, height, color) {
    try {
        var ptr0 = passArray8ToWasm0(buf, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.fillbox(ptr0, len0, width, height, color);
    } finally {
        buf.set(getUint8Memory0().subarray(ptr0 / 1, ptr0 / 1 + len0));
        wasm.__wbindgen_free(ptr0, len0 * 1);
    }
}

/**
* @param {Uint8Array} buf
* @param {number} width
* @param {number} height
*/
export function fillrandomrect(buf, width, height) {
    try {
        var ptr0 = passArray8ToWasm0(buf, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.fillrandomrect(ptr0, len0, width, height);
    } finally {
        buf.set(getUint8Memory0().subarray(ptr0 / 1, ptr0 / 1 + len0));
        wasm.__wbindgen_free(ptr0, len0 * 1);
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
    * @returns {number}
    */
    width() {
        var ret = wasm.universe_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    height() {
        var ret = wasm.universe_height(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    buffer() {
        var ret = wasm.universe_buffer(this.ptr);
        return ret;
    }
    /**
    * @param {number} color
    */
    fillbox(color) {
        wasm.universe_fillbox(this.ptr, color);
    }
    /**
    */
    fillrandomrect() {
        wasm.universe_fillrandomrect(this.ptr);
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
        input = new URL('rust_rect_bg.wasm', import.meta.url);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_log_b3aa06d601cb954a = function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_random_39f8bece8e0e6d74 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

