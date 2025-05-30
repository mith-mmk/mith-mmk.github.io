import init,{Universe} from "../pkg/rust_rect.js";  // Universeは要インポート wasm.Universeでは動かない
init()
  .then((wasm) => {
    const memory = wasm.memory; // 共有メモリーに必要
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let width = 512;
    let height =512;
    // メモリーの確保
    const universe = Universe.new(width,height);
    // 共有メモリーのアドレスの取得
    let buffersize = width * height * 4;
    let buf = new Uint8ClampedArray(memory.buffer,universe.buffer(), buffersize);

    universe.fillbox(0);
    let img = new ImageData(buf, width, height);
    ctx.putImageData(img, 0, 0);

    console.log(universe.width(),universe.height());

    setTimeout(function(){draw();},1);

    function draw() {
      setTimeout(function(){draw();},1);
      universe.fillrandomrect();
      ctx.putImageData(img, 0, 0);
    }
  });