/* tslint:disable */
/* eslint-disable */
/**
*/
export function initialization(): void;
/**
*/
export class Universe {
  free(): void;
/**
* @param {number} width
* @param {number} height
*/
  constructor(width: number, height: number);
/**
* @param {number} width
* @param {number} height
* @returns {Universe}
*/
  static newOnWorker(width: number, height: number): Universe;
/**
* @param {number} width
* @param {number} height
* @returns {number}
*/
  appendCanvas(width: number, height: number): number;
/**
* @param {string} label
*/
  setEnable(label: string): void;
/**
* @param {string} label
* @param {number} alpha
*/
  setLayerAlpha(label: string, alpha: number): void;
/**
* @param {string} label
* @returns {number}
*/
  getLayerAlpha(label: string): number;
/**
* @param {string} label
*/
  setDisable(label: string): void;
/**
* @param {string} label
* @returns {boolean}
*/
  getEnable(label: string): boolean;
/**
* @param {string} label
* @returns {string}
*/
  setCurrentLayer(label: string): string;
/**
* @param {string} label
* @param {number} x
* @param {number} y
*/
  setPos(label: string, x: number, y: number): void;
/**
* @param {number} color
*/
  clear(color: number): void;
/**
* @param {string} label
*/
  clearLayer(label: string): void;
/**
* @returns {number}
*/
  layersLength(): number;
/**
* @param {number} number
*/
  clearSelectCanvas(number: number): void;
/**
* @param {number} x
* @param {number} y
* @param {number} color
* @param {number} alpha
*/
  pointAntialias(x: number, y: number, color: number, alpha: number): void;
/**
* @param {number} x
* @param {number} y
* @param {number} color
*/
  pointWithPen(x: number, y: number, color: number): void;
/**
* @param {number} sx
* @param {number} sy
* @param {number} ex
* @param {number} ey
* @param {number} color
*/
  line(sx: number, sy: number, ex: number, ey: number, color: number): void;
/**
* @param {number} sx
* @param {number} sy
* @param {number} ex
* @param {number} ey
* @param {number} color
*/
  lineAntialias(sx: number, sy: number, ex: number, ey: number, color: number): void;
/**
* @param {number} sx
* @param {number} sy
* @param {number} ey
* @param {number} ex
* @param {number} color
*/
  lineWithPen(sx: number, sy: number, ey: number, ex: number, color: number): void;
/**
* @param {number} sx
* @param {number} sy
* @param {number} ey
* @param {number} ex
* @param {number} color
*/
  rect(sx: number, sy: number, ey: number, ex: number, color: number): void;
/**
* @param {number} ox
* @param {number} oy
* @param {number} r
* @param {number} tilde
* @param {number} color
*/
  pentagram(ox: number, oy: number, r: number, tilde: number, color: number): void;
/**
* @param {number} p
* @param {number} q
* @param {number} ox
* @param {number} oy
* @param {number} r
* @param {number} tilde
* @param {number} color
*/
  polygram(p: number, q: number, ox: number, oy: number, r: number, tilde: number, color: number): void;
/**
* @returns {number}
*/
  getBuffer(): number;
/**
* @param {number} number
* @returns {number}
*/
  getBufferSelectCanvas(number: number): number;
/**
* @param {string} label
* @param {number} width
* @param {number} height
*/
  addLayer(label: string, width: number, height: number): void;
/**
* @returns {number}
*/
  getWidth(): number;
/**
* @returns {number}
*/
  getHeight(): number;
/**
* @param {number} sx
* @param {number} sy
* @param {number} color
*/
  fill(sx: number, sy: number, color: number): void;
/**
* @param {number} ox
* @param {number} oy
* @param {number} r
* @param {number} color
*/
  circle(ox: number, oy: number, r: number, color: number): void;
/**
* @param {number} ox
* @param {number} oy
* @param {number} r
* @param {number} color
* @param {number} alpha
* @param {number} size
*/
  circleAntialias(ox: number, oy: number, r: number, color: number, alpha: number, size: number): void;
/**
* @param {number} ox
* @param {number} oy
* @param {number} rx
* @param {number} ry
* @param {number} tilde
* @param {number} color
*/
  ellipse(ox: number, oy: number, rx: number, ry: number, tilde: number, color: number): void;
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
  ellipseAntialias(ox: number, oy: number, rx: number, ry: number, tilde: number, color: number, alpha: number, size: number): void;
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
  quadraticCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, a: number, color: number): void;
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
  quadraticCurveAntialias(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, a: number, color: number, size: number): void;
/**
* @param {number} x1
* @param {number} y1
* @param {number} x2
* @param {number} y2
* @param {number} x3
* @param {number} y3
* @param {number} color
*/
  bezierCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number): void;
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
  bezierCurveAntialias(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number, size: number): void;
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
  bezierCurve3(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: number): void;
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
  bezierCurve3Antialias(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: number, size: number): void;
/**
* @param {string} commands
* @param {number} color
*/
  drawPath(commands: string, color: number): void;
/**
*/
  affineNew(): void;
/**
* @param {number} no
* @param {number} value1
* @param {number} value2
*/
  affineAdd(no: number, value1: number, value2: number): void;
/**
* @param {number} canvas_in
* @param {number} canvas_out
* @param {number} interpolation
*/
  affineRun(canvas_in: number, canvas_out: number, interpolation: number): void;
/**
* @param {number} canvas_in
* @param {number} canvas_out
*/
  sharpness(canvas_in: number, canvas_out: number): void;
/**
* @param {number} canvas_in
* @param {number} canvas_out
* @param {string} filter_name
*/
  filter(canvas_in: number, canvas_out: number, filter_name: string): void;
/**
* @param {number} canvas_in
* @param {number} canvas_out
* @param {number} no
* @param {number} interpolation
*/
  affineTest2(canvas_in: number, canvas_out: number, no: number, interpolation: number): void;
/**
* @param {number} canvas_in
* @param {number} canvas_out
*/
  affineTest(canvas_in: number, canvas_out: number): void;
/**
* @param {Uint8Array} buffer
* @param {number} interlop
*/
  imageLoader(buffer: Uint8Array, interlop: number): void;
/**
* @returns {number}
*/
  nextFrame(): number;
/**
* @param {Uint8Array} buffer
* @param {number} verbose
*/
  imageDecoder(buffer: Uint8Array, verbose: number): void;
/**
* @param {Uint8Array} buffer
* @param {number} verbose
*/
  jpegDecoder(buffer: Uint8Array, verbose: number): void;
/**
* @param {Uint8Array} buffer
* @param {number} verbose
* @param {number} number
*/
  jpegDecoderSelectCanvas(buffer: Uint8Array, verbose: number, number: number): void;
/**
* Javascript bindCanvas() is bind rust canvas and Web Canvas.
* This function cannnot run on web worker.
* @param {string} canvas
*/
  bindCanvas(canvas: string): void;
/**
* Javascript bindCanvas2() is bind rust canvas and Web Canvas 2nd.
* This function cannnot run on web worker.
* @param {string} canvas
*/
  bindCanvas2(canvas: string): void;
/**
* Javascript drawCanvas() draws binded WebCanvas.
* Must call bindCanvas2 before.
* This function cannnot run on web worker.
* @param {number} width
* @param {number} height
*/
  drawCanvas(width: number, height: number): void;
/**
* Javascript drawSelectCanvas() draws binded WebCanvas 1st.
* A no selects main canvas or append canvases
* Must call bindCanvas() before.
* This function cannnot run on web worker.
* @param {number} width
* @param {number} height
* @param {number} no
*/
  drawSelectCanvas(width: number, height: number, no: number): void;
/**
* @param {number} no
* @returns {ImageData}
*/
  getImageData(no: number): ImageData;
/**
*/
  combine(): void;
/**
* @returns {boolean}
*/
  isAnimation(): boolean;
/**
* @param {number} width
* @param {number} height
*/
  drawCanvas2(width: number, height: number): void;
/**
* @param {number} width
* @param {number} height
* @param {number} no
*/
  drawSelectCanvas2(width: number, height: number, no: number): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly initialization: () => void;
  readonly __wbg_universe_free: (a: number) => void;
  readonly universe_new: (a: number, b: number) => number;
  readonly universe_newOnWorker: (a: number, b: number) => number;
  readonly universe_appendCanvas: (a: number, b: number, c: number) => number;
  readonly universe_setEnable: (a: number, b: number, c: number) => void;
  readonly universe_setLayerAlpha: (a: number, b: number, c: number, d: number) => void;
  readonly universe_getLayerAlpha: (a: number, b: number, c: number) => number;
  readonly universe_setDisable: (a: number, b: number, c: number) => void;
  readonly universe_getEnable: (a: number, b: number, c: number) => number;
  readonly universe_setCurrentLayer: (a: number, b: number, c: number, d: number) => void;
  readonly universe_setPos: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_clear: (a: number, b: number) => void;
  readonly universe_clearLayer: (a: number, b: number, c: number) => void;
  readonly universe_layersLength: (a: number) => number;
  readonly universe_clearSelectCanvas: (a: number, b: number) => void;
  readonly universe_pointAntialias: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_pointWithPen: (a: number, b: number, c: number, d: number) => void;
  readonly universe_line: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly universe_lineAntialias: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly universe_lineWithPen: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly universe_rect: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly universe_pentagram: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly universe_polygram: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly universe_getBuffer: (a: number) => number;
  readonly universe_getBufferSelectCanvas: (a: number, b: number) => number;
  readonly universe_addLayer: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_getWidth: (a: number) => number;
  readonly universe_getHeight: (a: number) => number;
  readonly universe_fill: (a: number, b: number, c: number, d: number) => void;
  readonly universe_circle: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_circleAntialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly universe_ellipse: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly universe_ellipseAntialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly universe_quadraticCurve: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly universe_quadraticCurveAntialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly universe_bezierCurve: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly universe_bezierCurveAntialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly universe_bezierCurve3: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly universe_bezierCurve3Antialias: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => void;
  readonly universe_drawPath: (a: number, b: number, c: number, d: number) => void;
  readonly universe_affineNew: (a: number) => void;
  readonly universe_affineAdd: (a: number, b: number, c: number, d: number) => void;
  readonly universe_affineRun: (a: number, b: number, c: number, d: number) => void;
  readonly universe_sharpness: (a: number, b: number, c: number) => void;
  readonly universe_filter: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_affineTest2: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_affineTest: (a: number, b: number, c: number) => void;
  readonly universe_imageLoader: (a: number, b: number, c: number, d: number) => void;
  readonly universe_nextFrame: (a: number) => number;
  readonly universe_imageDecoder: (a: number, b: number, c: number, d: number) => void;
  readonly universe_jpegDecoderSelectCanvas: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_bindCanvas: (a: number, b: number, c: number) => void;
  readonly universe_bindCanvas2: (a: number, b: number, c: number) => void;
  readonly universe_drawCanvas: (a: number, b: number, c: number, d: number) => void;
  readonly universe_drawSelectCanvas: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_getImageData: (a: number, b: number, c: number) => void;
  readonly universe_combine: (a: number) => void;
  readonly universe_isAnimation: (a: number) => number;
  readonly universe_drawCanvas2: (a: number, b: number, c: number, d: number) => void;
  readonly universe_drawSelectCanvas2: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly universe_jpegDecoder: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
