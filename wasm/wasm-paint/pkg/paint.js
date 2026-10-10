/* @ts-self-types="./paint.d.ts" */

export class Universe {
    static __wrap(ptr) {
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
     * @param {number} canvas_in
     * @param {number} canvas_out
     * @param {number} no
     * @param {number} interpolation
     */
    affineTest2(canvas_in, canvas_out, no, interpolation) {
        wasm.universe_affineTest2(this.__wbg_ptr, canvas_in, canvas_out, no, interpolation);
    }
    /**
     * @param {number} canvas_in
     * @param {number} canvas_out
     */
    affineTest(canvas_in, canvas_out) {
        wasm.universe_affineTest(this.__wbg_ptr, canvas_in, canvas_out);
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
     * @param {number} canvas_in
     * @param {number} canvas_out
     */
    autoBrightness(canvas_in, canvas_out) {
        wasm.universe_autoBrightness(this.__wbg_ptr, canvas_in, canvas_out);
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
     * @param {number} canvas_in
     * @param {number} canvas_out
     * @param {number} brightness
     */
    brightnessControl(canvas_in, canvas_out, brightness) {
        wasm.universe_brightnessControl(this.__wbg_ptr, canvas_in, canvas_out, brightness);
    }
    /**
     * @param {number} brush_id
     * @param {number} x
     * @param {number} y
     * @param {number} pressure
     * @param {number} tilt_x
     * @param {number} tilt_y
     * @param {number} rotation
     * @param {number} timestamp
     * @returns {number}
     */
    brushSampleEraser(brush_id, x, y, pressure, tilt_x, tilt_y, rotation, timestamp) {
        const ret = wasm.universe_brushSampleEraser(this.__wbg_ptr, brush_id, x, y, pressure, tilt_x, tilt_y, rotation, timestamp);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {number} brush_id
     * @param {number} x
     * @param {number} y
     * @param {number} pressure
     * @param {number} rotation
     * @param {number} timestamp
     * @param {number} start_x
     * @param {number} start_y
     * @param {number} end_x
     * @param {number} end_y
     * @param {number} start_argb
     * @param {number} end_argb
     * @returns {number}
     */
    brushSampleLinearGradient(brush_id, x, y, pressure, rotation, timestamp, start_x, start_y, end_x, end_y, start_argb, end_argb) {
        const ret = wasm.universe_brushSampleLinearGradient(this.__wbg_ptr, brush_id, x, y, pressure, rotation, timestamp, start_x, start_y, end_x, end_y, start_argb, end_argb);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {number} brush_id
     * @param {number} x
     * @param {number} y
     * @param {number} pressure
     * @param {number} rotation
     * @param {number} timestamp
     * @param {number} pattern_width
     * @param {number} pattern_height
     * @param {Uint8Array} pixels
     * @param {string} tile_mode
     * @param {string} sampling
     * @param {number} pattern_scale
     * @returns {number}
     */
    brushSamplePattern(brush_id, x, y, pressure, rotation, timestamp, pattern_width, pattern_height, pixels, tile_mode, sampling, pattern_scale) {
        const ptr0 = passArray8ToWasm0(pixels, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(tile_mode, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(sampling, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.universe_brushSamplePattern(this.__wbg_ptr, brush_id, x, y, pressure, rotation, timestamp, pattern_width, pattern_height, ptr0, len0, ptr1, len1, ptr2, len2, pattern_scale);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {number} brush_id
     * @param {number} x
     * @param {number} y
     * @param {number} pressure
     * @param {number} tilt_x
     * @param {number} tilt_y
     * @param {number} rotation
     * @param {number} timestamp
     * @param {number} argb
     * @returns {number}
     */
    brushSampleSolid(brush_id, x, y, pressure, tilt_x, tilt_y, rotation, timestamp, argb) {
        const ret = wasm.universe_brushSampleSolid(this.__wbg_ptr, brush_id, x, y, pressure, tilt_x, tilt_y, rotation, timestamp, argb);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
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
     */
    clearLayer(label) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_clearLayer(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} number
     */
    clearSelectCanvas(number) {
        wasm.universe_clearSelectCanvas(this.__wbg_ptr, number);
    }
    /**
     * @param {number} color
     */
    clear(color) {
        wasm.universe_clear(this.__wbg_ptr, color);
    }
    /**
     * @param {number} canvas_in
     * @param {number} canvas_out
     * @param {number} shadows
     * @param {number} midtones
     * @param {number} highlights
     */
    colorCurve(canvas_in, canvas_out, shadows, midtones, highlights) {
        wasm.universe_colorCurve(this.__wbg_ptr, canvas_in, canvas_out, shadows, midtones, highlights);
    }
    combine() {
        wasm.universe_combine(this.__wbg_ptr);
    }
    /**
     * @param {string} tip_kind
     * @param {number} tip_width
     * @param {number} tip_height
     * @param {number} size
     * @param {number} opacity
     * @param {number} flow
     * @param {number} spacing
     * @param {number} rotation
     * @param {number} scatter
     * @param {number} pressure_size
     * @param {number} pressure_opacity
     * @param {number} pressure_flow
     * @param {number} seed
     * @returns {number}
     */
    createBrush(tip_kind, tip_width, tip_height, size, opacity, flow, spacing, rotation, scatter, pressure_size, pressure_opacity, pressure_flow, seed) {
        const ptr0 = passStringToWasm0(tip_kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.universe_createBrush(this.__wbg_ptr, ptr0, len0, tip_width, tip_height, size, opacity, flow, spacing, rotation, scatter, pressure_size, pressure_opacity, pressure_flow, seed);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} tolerance
     * @param {boolean} compare_alpha
     * @param {boolean} eight_connected
     * @returns {number}
     */
    createFloodMask(x, y, tolerance, compare_alpha, eight_connected) {
        const ret = wasm.universe_createFloodMask(this.__wbg_ptr, x, y, tolerance, compare_alpha, eight_connected);
        return ret >>> 0;
    }
    /**
     * @param {number} width
     * @param {number} height
     * @param {Uint8Array} coverage
     * @param {number} size
     * @param {number} spacing
     * @param {number} seed
     * @returns {number}
     */
    createMaskBrush(width, height, coverage, size, spacing, seed) {
        const ptr0 = passArray8ToWasm0(coverage, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.universe_createMaskBrush(this.__wbg_ptr, width, height, ptr0, len0, size, spacing, seed);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @returns {number}
     */
    createRectMask(x, y, width, height) {
        const ret = wasm.universe_createRectMask(this.__wbg_ptr, x, y, width, height);
        return ret >>> 0;
    }
    /**
     * @param {string} label
     */
    deleteLayer(label) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.universe_deleteLayer(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} brush_id
     */
    destroyBrush(brush_id) {
        wasm.universe_destroyBrush(this.__wbg_ptr, brush_id);
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
     * @param {Array<any>} glyphs
     * @param {number} color
     */
    drawGlyphs(glyphs, color) {
        const ret = wasm.universe_drawGlyphs(this.__wbg_ptr, glyphs, color);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
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
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} start_x
     * @param {number} start_y
     * @param {number} end_x
     * @param {number} end_y
     * @param {number} start_argb
     * @param {number} end_argb
     * @param {string} spread
     * @param {boolean} linear_rgb
     */
    fillLinearGradientRect(x, y, width, height, start_x, start_y, end_x, end_y, start_argb, end_argb, spread, linear_rgb) {
        const ptr0 = passStringToWasm0(spread, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.universe_fillLinearGradientRect(this.__wbg_ptr, x, y, width, height, start_x, start_y, end_x, end_y, start_argb, end_argb, ptr0, len0, linear_rgb);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} mask_id
     * @param {number} start_x
     * @param {number} start_y
     * @param {number} end_x
     * @param {number} end_y
     * @param {number} start_argb
     * @param {number} end_argb
     * @param {string} spread
     */
    fillMaskLinearGradient(mask_id, start_x, start_y, end_x, end_y, start_argb, end_argb, spread) {
        const ptr0 = passStringToWasm0(spread, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.universe_fillMaskLinearGradient(this.__wbg_ptr, mask_id, start_x, start_y, end_x, end_y, start_argb, end_argb, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} mask_id
     * @param {number} pattern_width
     * @param {number} pattern_height
     * @param {Uint8Array} pixels
     * @param {string} tile_mode
     * @param {string} sampling
     * @param {number} scale
     * @param {number} rotation
     * @param {number} offset_x
     * @param {number} offset_y
     */
    fillMaskPattern(mask_id, pattern_width, pattern_height, pixels, tile_mode, sampling, scale, rotation, offset_x, offset_y) {
        const ptr0 = passArray8ToWasm0(pixels, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(tile_mode, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(sampling, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.universe_fillMaskPattern(this.__wbg_ptr, mask_id, pattern_width, pattern_height, ptr0, len0, ptr1, len1, ptr2, len2, scale, rotation, offset_x, offset_y);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} mask_id
     * @param {number} argb
     */
    fillMaskSolid(mask_id, argb) {
        const ret = wasm.universe_fillMaskSolid(this.__wbg_ptr, mask_id, argb);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string} commands
     * @param {number} argb
     */
    fillPathSolid(commands, argb) {
        const ptr0 = passStringToWasm0(commands, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.universe_fillPathSolid(this.__wbg_ptr, ptr0, len0, argb);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} pattern_width
     * @param {number} pattern_height
     * @param {Uint8Array} pixels
     * @param {string} tile_x
     * @param {string} tile_y
     * @param {string} sampling
     * @param {number} scale_x
     * @param {number} scale_y
     * @param {number} offset_x
     * @param {number} offset_y
     */
    fillPatternRect(x, y, width, height, pattern_width, pattern_height, pixels, tile_x, tile_y, sampling, scale_x, scale_y, offset_x, offset_y) {
        const ptr0 = passArray8ToWasm0(pixels, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(tile_x, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(tile_y, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(sampling, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.universe_fillPatternRect(this.__wbg_ptr, x, y, width, height, pattern_width, pattern_height, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, scale_x, scale_y, offset_x, offset_y);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} radius
     * @param {number} start_argb
     * @param {number} end_argb
     * @param {string} spread
     */
    fillRadialGradientRect(x, y, width, height, center_x, center_y, radius, start_argb, end_argb, spread) {
        const ptr0 = passStringToWasm0(spread, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.universe_fillRadialGradientRect(this.__wbg_ptr, x, y, width, height, center_x, center_y, radius, start_argb, end_argb, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} argb
     * @param {number} opacity
     * @param {string} blend_mode
     */
    fillRectComposite(x, y, width, height, argb, opacity, blend_mode) {
        const ptr0 = passStringToWasm0(blend_mode, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.universe_fillRectComposite(this.__wbg_ptr, x, y, width, height, argb, opacity, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} start_angle
     * @param {number} end_angle
     * @param {number} start_argb
     * @param {number} end_argb
     * @param {string} spread
     */
    fillSweepGradientRect(x, y, width, height, center_x, center_y, start_angle, end_angle, start_argb, end_argb, spread) {
        const ptr0 = passStringToWasm0(spread, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.universe_fillSweepGradientRect(this.__wbg_ptr, x, y, width, height, center_x, center_y, start_angle, end_angle, start_argb, end_argb, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
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
     * @param {number} canvas_in
     * @param {number} canvas_out
     * @param {string} filter_name
     * @param {Float32Array} _options
     */
    filterEx(canvas_in, canvas_out, filter_name, _options) {
        const ptr0 = passStringToWasm0(filter_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(_options, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.universe_filterEx(this.__wbg_ptr, canvas_in, canvas_out, ptr0, len0, ptr1, len1);
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
     * @param {number} canvas_in
     * @param {number} canvas_out
     * @param {string[]} filter_names
     */
    filters(canvas_in, canvas_out, filter_names) {
        const ptr0 = passArrayJsValueToWasm0(filter_names, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_filters(this.__wbg_ptr, canvas_in, canvas_out, ptr0, len0);
    }
    /**
     * Fills the connected region on the selected layer. Returns whether any pixels changed.
     * @param {number} x
     * @param {number} y
     * @param {number} tolerance
     * @param {boolean} compare_alpha
     * @param {boolean} eight_connected
     * @param {number} argb
     * @returns {boolean}
     */
    floodFill(x, y, tolerance, compare_alpha, eight_connected, argb) {
        const ret = wasm.universe_floodFill(this.__wbg_ptr, x, y, tolerance, compare_alpha, eight_connected, argb);
        return ret !== 0;
    }
    /**
     * @param {number} canvas_in
     * @param {number} canvas_out
     * @param {number} gamma
     */
    gammaControl(canvas_in, canvas_out, gamma) {
        wasm.universe_gammaControl(this.__wbg_ptr, canvas_in, canvas_out, gamma);
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
     * @returns {number}
     */
    getBuffer() {
        const ret = wasm.universe_getBuffer(this.__wbg_ptr);
        return ret >>> 0;
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
     * @returns {number}
     */
    getHeight() {
        const ret = wasm.universe_getHeight(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} no
     * @returns {ImageData}
     */
    getImageDataTransparent(no) {
        const ret = wasm.universe_getImageDataTransparent(this.__wbg_ptr, no);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
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
     * @returns {ImageData}
     */
    getLayerImageData(label) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.universe_getLayerImageData(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {number}
     */
    getWidth() {
        const ret = wasm.universe_getWidth(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {string}
     */
    glyphRendererInfo() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.universe_glyphRendererInfo(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {boolean}
     */
    hasFontFeature() {
        const ret = wasm.universe_hasFontFeature(this.__wbg_ptr);
        return ret !== 0;
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
     * @param {number} number
     * @param {number} verbose
     * @returns {Uint8Array}
     */
    imageEncoderSelectCanvas(number, verbose) {
        const ret = wasm.universe_imageEncoderSelectCanvas(this.__wbg_ptr, number, verbose);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {number} verbose
     * @returns {Uint8Array}
     */
    imageEncoder(verbose) {
        const ret = wasm.universe_imageEncoder(this.__wbg_ptr, verbose);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {Uint8Array} buffer
     * @param {number} interpolation
     */
    imageLoader(buffer, interpolation) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_imageLoader(this.__wbg_ptr, ptr0, len0, interpolation);
    }
    /**
     * @param {number} canvas_in
     * @param {number} canvas_out
     */
    invertCrCb(canvas_in, canvas_out) {
        wasm.universe_invertCrCb(this.__wbg_ptr, canvas_in, canvas_out);
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
     * @param {number} number
     */
    jpegDecoderSelectCanvas(buffer, verbose, number) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_jpegDecoderSelectCanvas(this.__wbg_ptr, ptr0, len0, verbose, number);
    }
    /**
     * @param {Uint8Array} buffer
     * @param {number} verbose
     */
    jpegDecoder(buffer, verbose) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_jpegDecoder(this.__wbg_ptr, ptr0, len0, verbose);
    }
    /**
     * @returns {number}
     */
    layersLength() {
        const ret = wasm.universe_layersLength(this.__wbg_ptr);
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
     * @param {number} mask_id
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    maskCoverage(mask_id, x, y) {
        const ret = wasm.universe_maskCoverage(this.__wbg_ptr, mask_id, x, y);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @param {number} left
     * @param {number} right
     * @returns {number}
     */
    maskDifference(left, right) {
        const ret = wasm.universe_maskDifference(this.__wbg_ptr, left, right);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {number} mask_id
     * @param {number} radius
     * @returns {number}
     */
    maskFeather(mask_id, radius) {
        const ret = wasm.universe_maskFeather(this.__wbg_ptr, mask_id, radius);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {number} mask_id
     * @param {number} radius
     * @returns {number}
     */
    maskGrow(mask_id, radius) {
        const ret = wasm.universe_maskGrow(this.__wbg_ptr, mask_id, radius);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {number} left
     * @param {number} right
     * @returns {number}
     */
    maskIntersect(left, right) {
        const ret = wasm.universe_maskIntersect(this.__wbg_ptr, left, right);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {number} mask_id
     */
    maskInvert(mask_id) {
        const ret = wasm.universe_maskInvert(this.__wbg_ptr, mask_id);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} mask_id
     * @param {number} radius
     * @returns {number}
     */
    maskShrink(mask_id, radius) {
        const ret = wasm.universe_maskShrink(this.__wbg_ptr, mask_id, radius);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {number} left
     * @param {number} right
     * @returns {number}
     */
    maskUnion(left, right) {
        const ret = wasm.universe_maskUnion(this.__wbg_ptr, left, right);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {string} label
     * @param {string} direction
     * @returns {boolean}
     */
    moveLayer(label, direction) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(direction, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.universe_moveLayer(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
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
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
        const ret = wasm.universe_new(width, height);
        this.__wbg_ptr = ret;
        UniverseFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    nextFrame() {
        const ret = wasm.universe_nextFrame(this.__wbg_ptr);
        return ret;
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
     * @param {number} x
     * @param {number} y
     * @param {number} color
     * @param {number} alpha
     */
    pointAntialias(x, y, color, alpha) {
        wasm.universe_pointAntialias(this.__wbg_ptr, x, y, color, alpha);
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
     * @param {number} canvas_in
     * @param {number} canvas_out
     * @param {number} saturation
     */
    saturationControl(canvas_in, canvas_out, saturation) {
        wasm.universe_saturationControl(this.__wbg_ptr, canvas_in, canvas_out, saturation);
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
     * @param {string} label
     */
    setEnable(label) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.universe_setEnable(this.__wbg_ptr, ptr0, len0);
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
     * @param {string} label
     * @param {Uint8ClampedArray} pixels
     */
    setLayerImageData(label, pixels) {
        const ptr0 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(pixels, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.universe_setLayerImageData(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
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
     * @param {number} canvas_in
     * @param {number} canvas_out
     */
    sharpness(canvas_in, canvas_out) {
        wasm.universe_sharpness(this.__wbg_ptr, canvas_in, canvas_out);
    }
    /**
     * @param {string} commands
     * @param {number} argb
     * @param {number} width
     * @param {string} cap
     * @param {string} join
     * @param {number} miter_limit
     * @param {Float32Array} dash
     * @param {number} dash_offset
     */
    strokeStyledPath(commands, argb, width, cap, join, miter_limit, dash, dash_offset) {
        const ptr0 = passStringToWasm0(commands, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(cap, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(join, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passArrayF32ToWasm0(dash, wasm.__wbindgen_malloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.universe_strokeStyledPath(this.__wbg_ptr, ptr0, len0, argb, width, ptr1, len1, ptr2, len2, miter_limit, ptr3, len3, dash_offset);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
}
if (Symbol.dispose) Universe.prototype[Symbol.dispose] = Universe.prototype.free;

export function initialization() {
    wasm.initialization();
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_debug_string_4687d8d8c2017d52: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_is_null_e343b7d08827ba72: function(arg0) {
            const ret = arg0 === null;
            return ret;
        },
        __wbg___wbindgen_is_undefined_8865fb403f8fe9d8: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_number_get_2e0e7dee9f701a71: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_0380ccaa2f57f0d9: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_41e9ee4f547fc59a: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_alert_be93e5d6ba336bf5: function(arg0, arg1) {
            alert(getStringFromWasm0(arg0, arg1));
        },
        __wbg_document_9854e03c05fc8834: function(arg0) {
            const ret = arg0.document;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_error_757e9472f8410341: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_from_296ca31f8d0f1c52: function(arg0) {
            const ret = Array.from(arg0);
            return ret;
        },
        __wbg_getContext_635e36719cad2623: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getElementById_cc94972b404e4eaa: function(arg0, arg1, arg2) {
            const ret = arg0.getElementById(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_31af05bd4842a84f: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_unchecked_288889d017702237: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_innerText_210ec130237a8f65: function(arg0, arg1) {
            const ret = arg1.innerText;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_instanceof_CanvasRenderingContext2d_769208c72dcbf5e6: function(arg0) {
            let result;
            try {
                result = arg0 instanceof CanvasRenderingContext2D;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlCanvasElement_0a30c11fbbf41841: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLCanvasElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlElement_32fb153a5a0e2349: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Window_82d71df4eddf88bc: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_length_d4bdea10311bd9cf: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_log_597b0b9b20ce0c33: function(arg0, arg1) {
            console.log(getStringFromWasm0(arg0, arg1));
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_with_u8_clamped_array_and_sh_af3f0dee40638e18: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0, arg3 >>> 0);
            return ret;
        }, arguments); },
        __wbg_putImageData_11570c06086c9e05: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.putImageData(arg1, arg2, arg3);
        }, arguments); },
        __wbg_set_innerText_d46aad31465ed925: function(arg0, arg1, arg2) {
            arg0.innerText = getStringFromWasm0(arg1, arg2);
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_266715b9d96ba635: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_10fb7dc1ae063179: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_0b583911f537483a: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_d7f903d1508cbdc4: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbindgen_generic_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./paint_bg.js": import0,
    };
}

const UniverseFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_universe_free(ptr, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
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

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getClampedArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ClampedArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

let cachedUint8ClampedArrayMemory0 = null;
function getUint8ClampedArrayMemory0() {
    if (cachedUint8ClampedArrayMemory0 === null || cachedUint8ClampedArrayMemory0.byteLength === 0) {
        cachedUint8ClampedArrayMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachedUint8ClampedArrayMemory0;
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

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

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
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    cachedUint8ClampedArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
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

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('paint_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
