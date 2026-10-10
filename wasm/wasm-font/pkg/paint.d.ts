/* tslint:disable */
/* eslint-disable */

export class Universe {
    free(): void;
    [Symbol.dispose](): void;
    addFontToFamilyWithDescriptor(buffer: Uint8Array, font_name: string | null | undefined, font_weight: number, font_style: string | null | undefined, font_stretch: number): void;
    addFontToFamily(buffer: Uint8Array): void;
    addLayer(label: string, width: number, height: number): void;
    affineAdd(no: number, value1: number, value2: number): void;
    affineNew(): void;
    affineRun(canvas_in: number, canvas_out: number, interpolation: number): void;
    affineTest2(canvas_in: number, canvas_out: number, no: number, interpolation: number): void;
    affineTest(canvas_in: number, canvas_out: number): void;
    appendCanvas(width: number, height: number): number;
    appendFontFamilyChunk(face_id: string, offset: number, chunk: Uint8Array): boolean;
    autoBrightness(canvas_in: number, canvas_out: number): void;
    beginFontFamilyFace(face_id: string, total_size: number, font_name: string | null | undefined, font_weight: number, font_style: string | null | undefined, font_stretch: number): void;
    bezierCurve3Antialias(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: number, size: number): void;
    bezierCurve3(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: number): void;
    bezierCurveAntialias(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number, size: number): void;
    bezierCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number): void;
    /**
     * Javascript bindCanvas2() is bind rust canvas and Web Canvas 2nd.
     * This function cannnot run on web worker.
     */
    bindCanvas2(canvas: string): void;
    /**
     * Javascript bindCanvas() is bind rust canvas and Web Canvas.
     * This function cannnot run on web worker.
     */
    bindCanvas(canvas: string): void;
    brightnessControl(canvas_in: number, canvas_out: number, brightness: number): void;
    brushSampleEraser(brush_id: number, x: number, y: number, pressure: number, tilt_x: number, tilt_y: number, rotation: number, timestamp: number): number;
    brushSampleLinearGradient(brush_id: number, x: number, y: number, pressure: number, rotation: number, timestamp: number, start_x: number, start_y: number, end_x: number, end_y: number, start_argb: number, end_argb: number): number;
    brushSamplePattern(brush_id: number, x: number, y: number, pressure: number, rotation: number, timestamp: number, pattern_width: number, pattern_height: number, pixels: Uint8Array, tile_mode: string, sampling: string, pattern_scale: number): number;
    brushSampleSolid(brush_id: number, x: number, y: number, pressure: number, tilt_x: number, tilt_y: number, rotation: number, timestamp: number, argb: number): number;
    circleAntialias(ox: number, oy: number, r: number, color: number, alpha: number, size: number): void;
    circle(ox: number, oy: number, r: number, color: number): void;
    clearLayer(label: string): void;
    clearSelectCanvas(number: number): void;
    clear(color: number): void;
    colorCurve(canvas_in: number, canvas_out: number, shadows: number, midtones: number, highlights: number): void;
    combine(): void;
    createBrush(tip_kind: string, tip_width: number, tip_height: number, size: number, opacity: number, flow: number, spacing: number, rotation: number, scatter: number, pressure_size: number, pressure_opacity: number, pressure_flow: number, seed: number): number;
    createFloodMask(x: number, y: number, tolerance: number, compare_alpha: boolean, eight_connected: boolean): number;
    createMaskBrush(width: number, height: number, coverage: Uint8Array, size: number, spacing: number, seed: number): number;
    createRectMask(x: number, y: number, width: number, height: number): number;
    deleteLayer(label: string): void;
    destroyBrush(brush_id: number): void;
    drawCanvas2(width: number, height: number): void;
    /**
     * Javascript drawCanvas() draws binded WebCanvas.
     * Must call bindCanvas2 before.
     * This function cannnot run on web worker.
     */
    drawCanvas(width: number, height: number): void;
    drawGlyphs(glyphs: Array<any>, color: number): void;
    drawPath(commands: string, color: number): void;
    drawSelectCanvas2(width: number, height: number, no: number): void;
    /**
     * Javascript drawSelectCanvas() draws binded WebCanvas 1st.
     * A no selects main canvas or append canvases
     * Must call bindCanvas() before.
     * This function cannnot run on web worker.
     */
    drawSelectCanvas(width: number, height: number, no: number): void;
    drawTexLike(text: string, x: number, y: number, font_size: number, color: number): void;
    drawTextFamily(text: string, x: number, y: number, font_size: number, color: number, font_name: string | null | undefined, font_weight: number, font_style: string | null | undefined, font_stretch: number): void;
    drawText(text: string, x: number, y: number, font_size: number, color: number): void;
    ellipseAntialias(ox: number, oy: number, rx: number, ry: number, tilde: number, color: number, alpha: number, size: number): void;
    ellipse(ox: number, oy: number, rx: number, ry: number, tilde: number, color: number): void;
    fillLinearGradientRect(x: number, y: number, width: number, height: number, start_x: number, start_y: number, end_x: number, end_y: number, start_argb: number, end_argb: number, spread: string, linear_rgb: boolean): void;
    fillMaskLinearGradient(mask_id: number, start_x: number, start_y: number, end_x: number, end_y: number, start_argb: number, end_argb: number, spread: string): void;
    fillMaskPattern(mask_id: number, pattern_width: number, pattern_height: number, pixels: Uint8Array, tile_mode: string, sampling: string, scale: number, rotation: number, offset_x: number, offset_y: number): void;
    fillMaskSolid(mask_id: number, argb: number): void;
    fillPathSolid(commands: string, argb: number): void;
    fillPatternRect(x: number, y: number, width: number, height: number, pattern_width: number, pattern_height: number, pixels: Uint8Array, tile_x: string, tile_y: string, sampling: string, scale_x: number, scale_y: number, offset_x: number, offset_y: number): void;
    fillRadialGradientRect(x: number, y: number, width: number, height: number, center_x: number, center_y: number, radius: number, start_argb: number, end_argb: number, spread: string): void;
    fillRectComposite(x: number, y: number, width: number, height: number, argb: number, opacity: number, blend_mode: string): void;
    fillSweepGradientRect(x: number, y: number, width: number, height: number, center_x: number, center_y: number, start_angle: number, end_angle: number, start_argb: number, end_argb: number, spread: string): void;
    fill(sx: number, sy: number, color: number): void;
    filterEx(canvas_in: number, canvas_out: number, filter_name: string, _options: Float32Array): void;
    filter(canvas_in: number, canvas_out: number, filter_name: string): void;
    filters(canvas_in: number, canvas_out: number, filter_names: string[]): void;
    finalizeFontFamilyFace(face_id: string): void;
    /**
     * Fills the connected region on the selected layer. Returns whether any pixels changed.
     */
    floodFill(x: number, y: number, tolerance: number, compare_alpha: boolean, eight_connected: boolean, argb: number): boolean;
    fontFamilyFaceCount(): number;
    gammaControl(canvas_in: number, canvas_out: number, gamma: number): void;
    getBufferSelectCanvas(number: number): number;
    getBuffer(): number;
    getEnable(label: string): boolean;
    getHeight(): number;
    getImageDataTransparent(no: number): ImageData;
    getImageData(no: number): ImageData;
    getLayerAlpha(label: string): number;
    getLayerImageData(label: string): ImageData;
    getWidth(): number;
    glyphRendererInfo(): string;
    hasFontFeature(): boolean;
    imageDecoder(buffer: Uint8Array, verbose: number): void;
    imageEncoderSelectCanvas(number: number, verbose: number): Uint8Array;
    imageEncoder(verbose: number): Uint8Array;
    imageLoader(buffer: Uint8Array, interpolation: number): void;
    inspectTextFamily(text: string, font_size: number, font_name: string | null | undefined, font_weight: number, font_style: string | null | undefined, font_stretch: number): string;
    invertCrCb(canvas_in: number, canvas_out: number): void;
    isAnimation(): boolean;
    jpegDecoderSelectCanvas(buffer: Uint8Array, verbose: number, number: number): void;
    jpegDecoder(buffer: Uint8Array, verbose: number): void;
    layersLength(): number;
    lineAntialias(sx: number, sy: number, ex: number, ey: number, color: number): void;
    lineWithPen(sx: number, sy: number, ey: number, ex: number, color: number): void;
    line(sx: number, sy: number, ex: number, ey: number, color: number): void;
    loadFont(buffer: Uint8Array): void;
    maskCoverage(mask_id: number, x: number, y: number): number;
    maskDifference(left: number, right: number): number;
    maskFeather(mask_id: number, radius: number): number;
    maskGrow(mask_id: number, radius: number): number;
    maskIntersect(left: number, right: number): number;
    maskInvert(mask_id: number): void;
    maskShrink(mask_id: number, radius: number): number;
    maskUnion(left: number, right: number): number;
    moveLayer(label: string, direction: string): boolean;
    static newOnWorker(width: number, height: number): Universe;
    constructor(width: number, height: number);
    nextFrame(): number;
    pentagram(ox: number, oy: number, r: number, tilde: number, color: number): void;
    pointAntialias(x: number, y: number, color: number, alpha: number): void;
    pointWithPen(x: number, y: number, color: number): void;
    polygram(p: number, q: number, ox: number, oy: number, r: number, tilde: number, color: number): void;
    quadraticCurveAntialias(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, a: number, color: number, size: number): void;
    quadraticCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, a: number, color: number): void;
    rect(sx: number, sy: number, ey: number, ex: number, color: number): void;
    resetFontFamily(family_name: string): void;
    saturationControl(canvas_in: number, canvas_out: number, saturation: number): void;
    setCurrentLayer(label: string): string;
    setDisable(label: string): void;
    setEnable(label: string): void;
    setLayerAlpha(label: string, alpha: number): void;
    setLayerImageData(label: string, pixels: Uint8ClampedArray): void;
    setPos(label: string, x: number, y: number): void;
    sharpness(canvas_in: number, canvas_out: number): void;
    strokeStyledPath(commands: string, argb: number, width: number, cap: string, join: string, miter_limit: number, dash: Float32Array, dash_offset: number): void;
}

export function initialization(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_universe_free: (a: number, b: number) => void;
    readonly initialization: () => void;
    readonly universe_addFontToFamily: (a: number, b: number, c: number) => [number, number];
    readonly universe_addFontToFamilyWithDescriptor: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number];
    readonly universe_addLayer: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly universe_affineAdd: (a: number, b: number, c: number, d: number) => void;
    readonly universe_affineNew: (a: number) => void;
    readonly universe_affineRun: (a: number, b: number, c: number, d: number) => void;
    readonly universe_affineTest: (a: number, b: number, c: number) => void;
    readonly universe_affineTest2: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly universe_appendCanvas: (a: number, b: number, c: number) => number;
    readonly universe_appendFontFamilyChunk: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number];
    readonly universe_autoBrightness: (a: number, b: number, c: number) => void;
    readonly universe_beginFontFamilyFace: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => [number, number];
    readonly universe_bezierCurve: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
    readonly universe_bezierCurve3: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
    readonly universe_bezierCurve3Antialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => void;
    readonly universe_bezierCurveAntialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
    readonly universe_bindCanvas: (a: number, b: number, c: number) => void;
    readonly universe_bindCanvas2: (a: number, b: number, c: number) => void;
    readonly universe_brightnessControl: (a: number, b: number, c: number, d: number) => void;
    readonly universe_brushSampleEraser: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number];
    readonly universe_brushSampleLinearGradient: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => [number, number, number];
    readonly universe_brushSamplePattern: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) => [number, number, number];
    readonly universe_brushSampleSolid: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => [number, number, number];
    readonly universe_circle: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly universe_circleAntialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly universe_clear: (a: number, b: number) => void;
    readonly universe_clearLayer: (a: number, b: number, c: number) => void;
    readonly universe_clearSelectCanvas: (a: number, b: number) => void;
    readonly universe_colorCurve: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly universe_combine: (a: number) => void;
    readonly universe_createBrush: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number) => [number, number, number];
    readonly universe_createFloodMask: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly universe_createMaskBrush: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => [number, number, number];
    readonly universe_createRectMask: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly universe_deleteLayer: (a: number, b: number, c: number) => [number, number];
    readonly universe_destroyBrush: (a: number, b: number) => void;
    readonly universe_drawCanvas: (a: number, b: number, c: number) => [number, number];
    readonly universe_drawCanvas2: (a: number, b: number, c: number) => [number, number];
    readonly universe_drawGlyphs: (a: number, b: any, c: number) => [number, number];
    readonly universe_drawPath: (a: number, b: number, c: number, d: number) => void;
    readonly universe_drawSelectCanvas: (a: number, b: number, c: number, d: number) => [number, number];
    readonly universe_drawSelectCanvas2: (a: number, b: number, c: number, d: number) => [number, number];
    readonly universe_drawTexLike: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
    readonly universe_drawText: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
    readonly universe_drawTextFamily: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => [number, number];
    readonly universe_ellipse: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly universe_ellipseAntialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
    readonly universe_fill: (a: number, b: number, c: number, d: number) => void;
    readonly universe_fillLinearGradientRect: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => [number, number];
    readonly universe_fillMaskLinearGradient: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => [number, number];
    readonly universe_fillMaskPattern: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => [number, number];
    readonly universe_fillMaskSolid: (a: number, b: number, c: number) => [number, number];
    readonly universe_fillPathSolid: (a: number, b: number, c: number, d: number) => [number, number];
    readonly universe_fillPatternRect: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number) => [number, number];
    readonly universe_fillRadialGradientRect: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => [number, number];
    readonly universe_fillRectComposite: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number];
    readonly universe_fillSweepGradientRect: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => [number, number];
    readonly universe_filter: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly universe_filterEx: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly universe_filters: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly universe_finalizeFontFamilyFace: (a: number, b: number, c: number) => [number, number];
    readonly universe_floodFill: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
    readonly universe_fontFamilyFaceCount: (a: number) => number;
    readonly universe_gammaControl: (a: number, b: number, c: number, d: number) => void;
    readonly universe_getBuffer: (a: number) => number;
    readonly universe_getBufferSelectCanvas: (a: number, b: number) => number;
    readonly universe_getEnable: (a: number, b: number, c: number) => number;
    readonly universe_getHeight: (a: number) => number;
    readonly universe_getImageData: (a: number, b: number) => [number, number, number];
    readonly universe_getImageDataTransparent: (a: number, b: number) => [number, number, number];
    readonly universe_getLayerAlpha: (a: number, b: number, c: number) => number;
    readonly universe_getLayerImageData: (a: number, b: number, c: number) => [number, number, number];
    readonly universe_getWidth: (a: number) => number;
    readonly universe_glyphRendererInfo: (a: number) => [number, number];
    readonly universe_hasFontFeature: (a: number) => number;
    readonly universe_imageDecoder: (a: number, b: number, c: number, d: number) => void;
    readonly universe_imageEncoder: (a: number, b: number) => [number, number];
    readonly universe_imageEncoderSelectCanvas: (a: number, b: number, c: number) => [number, number];
    readonly universe_imageLoader: (a: number, b: number, c: number, d: number) => void;
    readonly universe_inspectTextFamily: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => [number, number, number, number];
    readonly universe_invertCrCb: (a: number, b: number, c: number) => void;
    readonly universe_isAnimation: (a: number) => number;
    readonly universe_jpegDecoder: (a: number, b: number, c: number, d: number) => void;
    readonly universe_jpegDecoderSelectCanvas: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly universe_layersLength: (a: number) => number;
    readonly universe_line: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly universe_lineAntialias: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly universe_lineWithPen: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly universe_loadFont: (a: number, b: number, c: number) => [number, number];
    readonly universe_maskCoverage: (a: number, b: number, c: number, d: number) => [number, number, number];
    readonly universe_maskDifference: (a: number, b: number, c: number) => [number, number, number];
    readonly universe_maskFeather: (a: number, b: number, c: number) => [number, number, number];
    readonly universe_maskGrow: (a: number, b: number, c: number) => [number, number, number];
    readonly universe_maskIntersect: (a: number, b: number, c: number) => [number, number, number];
    readonly universe_maskInvert: (a: number, b: number) => [number, number];
    readonly universe_maskShrink: (a: number, b: number, c: number) => [number, number, number];
    readonly universe_maskUnion: (a: number, b: number, c: number) => [number, number, number];
    readonly universe_moveLayer: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
    readonly universe_new: (a: number, b: number) => number;
    readonly universe_newOnWorker: (a: number, b: number) => number;
    readonly universe_nextFrame: (a: number) => number;
    readonly universe_pentagram: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly universe_pointAntialias: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly universe_pointWithPen: (a: number, b: number, c: number, d: number) => void;
    readonly universe_polygram: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
    readonly universe_quadraticCurve: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
    readonly universe_quadraticCurveAntialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
    readonly universe_rect: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly universe_resetFontFamily: (a: number, b: number, c: number) => [number, number];
    readonly universe_saturationControl: (a: number, b: number, c: number, d: number) => void;
    readonly universe_setCurrentLayer: (a: number, b: number, c: number) => [number, number];
    readonly universe_setDisable: (a: number, b: number, c: number) => void;
    readonly universe_setEnable: (a: number, b: number, c: number) => void;
    readonly universe_setLayerAlpha: (a: number, b: number, c: number, d: number) => void;
    readonly universe_setLayerImageData: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly universe_setPos: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly universe_sharpness: (a: number, b: number, c: number) => void;
    readonly universe_strokeStyledPath: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => [number, number];
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
