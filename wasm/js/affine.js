import init,{Universe} from "../pkg/affine.js"


let universe;
let buffersize;
let buf;
let buf2;
let img;
let img2;
let memory;
let drawed = true;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
const width = canvas.width;
const height = canvas.width

const method = document.getElementById('method');
const interpolation = document.getElementById('interpolation');

method.addEventListener('change', (ev) => {
  affine();
});

interpolation.addEventListener('change', (ev) => {
  affine();
});


const reader = new FileReader();

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

    console.log("load start");
    reader.readAsArrayBuffer(files[0]);
  }, false);

init().then((wasm) => {
    const memory = wasm.memory; // 共有メモリーに必要
    const universe = Universe.new(width,height);
    universe.append_canvas(width,height);
    buffersize = width * height * 4;
    const buf  = new Uint8ClampedArray(memory.buffer,universe.output_buffer(), buffersize);
    const img  = new ImageData(buf, width, height);
    universe.clear(0x000000);
    const buf2 = new Uint8ClampedArray(memory.buffer,universe.buffer_with_number(1), buffersize);
    const img2 = new ImageData(buf2, width, height);
    universe.clear_with_number(1);
    drawer();
    
    function affine() {
      const m = method.value;
      const i = interpolation.value;
      universe.clear_with_number(1);
       universe.affine_test2(0,1,m,i);
      drawer();
    }

    const request = new XMLHttpRequest();
    request.open("GET", "./images/sample02.jpg");
    request.responseType = "arraybuffer";

    request.onloadend = () => {
      console.log(request);
      let arraybuffer = request.response
      let buffer = new Uint8Array(arraybuffer);      
      universe.input_buffer_set_length(buffer.length);
      let ibuf = new Uint8Array(memory.buffer,universe.input_buffer(), buffer.length);
      ibuf.set(buffer);
      universe.image_decoder(buffer,0);
      drawer();
      affine();
    };
    request.send();

    reader.onloadend = (event) => {
        let buffer = new Uint8Array(reader.result);
        universe.input_buffer_set_length(buffer.length);
        let ibuf = new Uint8Array(memory.buffer,universe.input_buffer(), buffer.length);
        ibuf.set(buffer);
        universe.clear(0x000000);
      
        universe.image_decoder(buffer,0);
        drawed = true;
      //  ctx.putImageData(img, 0, 0);
      //  img = new ImageData(buf, universe.width(), universe.height());
        drawer();
    };

    function drawer() {
      ctx.putImageData(img, 0, 0);
      ctx2.putImageData(img2, 0, 0);
    }

});



function start_draw() {
  setTimeout(function(){draw();},1000 / 120);
  drawed = false;  
}

function draw() {
    if(img == null || drawed) return;
    setTimeout(function(){draw();},1000 / 120);
    ctx.putImageData(img, 0, 0);
    ctx2.putImageData(img2, 0, 0);
}
