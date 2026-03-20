/* tslint:disable */
/* eslint-disable */
export function initialization(): void;
export class Universe {
  free(): void;
  affineAdd(no: number, value1: number, value2: number): void;
  affineNew(): void;
  affineRun(canvas_in: number, canvas_out: number, interpolation: number): void;
  layersLength(): number;
  nextFrame(): number;
  setEnable(label: string): void;
  affineTest(canvas_in: number, canvas_out: number): void;
  /**
   * Javascript bindCanvas() is bind rust canvas and Web Canvas.
   * This function cannnot run on web worker.
   */
  bindCanvas(canvas: string): void;
  clearLayer(label: string): void;
  /**
   * Javascript drawCanvas() draws binded WebCanvas.
   * Must call bindCanvas2 before.
   * This function cannnot run on web worker.
   */
  drawCanvas(width: number, height: number): void;
  getLayerAlpha(label: string): number;
  setCurrentLayer(label: string): string;
  setDisable(label: string): void;
  affineTest2(canvas_in: number, canvas_out: number, no: number, interpolation: number): void;
  bezierCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number): void;
  /**
   * Javascript bindCanvas2() is bind rust canvas and Web Canvas 2nd.
   * This function cannnot run on web worker.
   */
  bindCanvas2(canvas: string): void;
  drawCanvas2(width: number, height: number): void;
  imageLoader(buffer: Uint8Array, interlop: number): void;
  isAnimation(): boolean;
  jpegDecoder(buffer: Uint8Array, verbose: number): void;
  appendCanvas(width: number, height: number): number;
  bezierCurve3(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: number): void;
  getImageData(no: number): ImageData;
  imageDecoder(buffer: Uint8Array, verbose: number): void;
  imageEncoder(verbose: number): Uint8Array;
  lineWithPen(sx: number, sy: number, ey: number, ex: number, color: number): void;
  static newOnWorker(width: number, height: number): Universe;
  getBuffer(): number;
  lineAntialias(sx: number, sy: number, ex: number, ey: number, color: number): void;
  pointWithPen(x: number, y: number, color: number): void;
  pointAntialias(x: number, y: number, color: number, alpha: number): void;
  quadraticCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, a: number, color: number): void;
  setLayerAlpha(label: string, alpha: number): void;
  circleAntialias(ox: number, oy: number, r: number, color: number, alpha: number, size: number): void;
  clearSelectCanvas(number: number): void;
  ellipseAntialias(ox: number, oy: number, rx: number, ry: number, tilde: number, color: number, alpha: number, size: number): void;
  getBufferSelectCanvas(number: number): number;
  bezierCurveAntialias(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number, size: number): void;
  bezierCurve3Antialias(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: number, size: number): void;
  /**
   * Javascript drawSelectCanvas() draws binded WebCanvas 1st.
   * A no selects main canvas or append canvases
   * Must call bindCanvas() before.
   * This function cannnot run on web worker.
   */
  drawSelectCanvas(width: number, height: number, no: number): void;
  drawSelectCanvas2(width: number, height: number, no: number): void;
  quadraticCurveAntialias(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, a: number, color: number, size: number): void;
  jpegDecoderSelectCanvas(buffer: Uint8Array, verbose: number, number: number): void;
  imageEncoderSelectCanvas(number: number, verbose: number): Uint8Array;
  constructor(width: number, height: number);
  fill(sx: number, sy: number, color: number): void;
  line(sx: number, sy: number, ex: number, ey: number, color: number): void;
  rect(sx: number, sy: number, ey: number, ex: number, color: number): void;
  clear(color: number): void;
  getWidth(): number;
  circle(ox: number, oy: number, r: number, color: number): void;
  getEnable(label: string): boolean;
  filter(canvas_in: number, canvas_out: number, filter_name: string): void;
  getHeight(): number;
  combine(): void;
  ellipse(ox: number, oy: number, rx: number, ry: number, tilde: number, color: number): void;
  filters(canvas_in: number, canvas_out: number, filter_names: (string)[]): void;
  setPos(label: string, x: number, y: number): void;
  polygram(p: number, q: number, ox: number, oy: number, r: number, tilde: number, color: number): void;
  addLayer(label: string, width: number, height: number): void;
  drawPath(commands: string, color: number): void;
  pentagram(ox: number, oy: number, r: number, tilde: number, color: number): void;
  sharpness(canvas_in: number, canvas_out: number): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_universe_free: (a: number, b: number) => void;
  readonly initialization: () => void;
  readonly universe_addLayer: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_affineAdd: (a: number, b: number, c: number, d: number) => void;
  readonly universe_affineNew: (a: number) => void;
  readonly universe_affineRun: (a: number, b: number, c: number, d: number) => void;
  readonly universe_affineTest: (a: number, b: number, c: number) => void;
  readonly universe_affineTest2: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_appendCanvas: (a: number, b: number, c: number) => number;
  readonly universe_bezierCurve: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly universe_bezierCurve3: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly universe_bezierCurve3Antialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => void;
  readonly universe_bezierCurveAntialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly universe_bindCanvas: (a: number, b: number, c: number) => void;
  readonly universe_bindCanvas2: (a: number, b: number, c: number) => void;
  readonly universe_circle: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_circleAntialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly universe_clear: (a: number, b: number) => void;
  readonly universe_clearLayer: (a: number, b: number, c: number) => void;
  readonly universe_clearSelectCanvas: (a: number, b: number) => void;
  readonly universe_combine: (a: number) => void;
  readonly universe_drawCanvas: (a: number, b: number, c: number) => [number, number];
  readonly universe_drawCanvas2: (a: number, b: number, c: number) => [number, number];
  readonly universe_drawPath: (a: number, b: number, c: number, d: number) => void;
  readonly universe_drawSelectCanvas: (a: number, b: number, c: number, d: number) => [number, number];
  readonly universe_drawSelectCanvas2: (a: number, b: number, c: number, d: number) => [number, number];
  readonly universe_ellipse: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly universe_ellipseAntialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly universe_fill: (a: number, b: number, c: number, d: number) => void;
  readonly universe_filter: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_filters: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_getBuffer: (a: number) => number;
  readonly universe_getBufferSelectCanvas: (a: number, b: number) => number;
  readonly universe_getEnable: (a: number, b: number, c: number) => number;
  readonly universe_getHeight: (a: number) => number;
  readonly universe_getImageData: (a: number, b: number) => [number, number, number];
  readonly universe_getLayerAlpha: (a: number, b: number, c: number) => number;
  readonly universe_getWidth: (a: number) => number;
  readonly universe_imageDecoder: (a: number, b: number, c: number, d: number) => void;
  readonly universe_imageEncoder: (a: number, b: number) => [number, number];
  readonly universe_imageEncoderSelectCanvas: (a: number, b: number, c: number) => [number, number];
  readonly universe_imageLoader: (a: number, b: number, c: number, d: number) => void;
  readonly universe_isAnimation: (a: number) => number;
  readonly universe_jpegDecoder: (a: number, b: number, c: number, d: number) => void;
  readonly universe_jpegDecoderSelectCanvas: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_layersLength: (a: number) => number;
  readonly universe_line: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly universe_lineAntialias: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly universe_lineWithPen: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
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
  readonly universe_setCurrentLayer: (a: number, b: number, c: number) => [number, number];
  readonly universe_setDisable: (a: number, b: number, c: number) => void;
  readonly universe_setEnable: (a: number, b: number, c: number) => void;
  readonly universe_setLayerAlpha: (a: number, b: number, c: number, d: number) => void;
  readonly universe_setPos: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_sharpness: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
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
