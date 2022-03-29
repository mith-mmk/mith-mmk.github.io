import init,{Universe} from "../pkg/affine.js"

let drawed = true;
const canvas = document.getElementById('canvas');
const canvas2 = document.getElementById('canvas2');
const width = canvas.width;
const height = canvas.width
canvas2.width = width;
canvas2.height = height;

const method = document.getElementById('method');
const interpolation = document.getElementById('interpolation');
let universe;
    
function affine() {
  const m = method.value;
  const i = interpolation.value;
  universe.clearSelectCanvas(1);
  universe.affineTest2(0,1,m,i);
  drawer();
}

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
    universe = Universe.new(width,height);
    universe.appendCanvas(width,height);
    universe.bindCanvas("canvas");
    universe.bindCanvas2("canvas2");
    universe.clear(0x000000);
    universe.clearSelectCanvas(1);
    drawer();


    const request = new XMLHttpRequest();
    request.open("GET", "./images/sample02.jpg");
    request.responseType = "arraybuffer";

    request.onloadend = () => {
      let arraybuffer = request.response
      let buffer = new Uint8Array(arraybuffer);      
      universe.imageDecoder(buffer,0);
      affine();
      drawer();
    };
    request.send();

    reader.onloadend = (event) => {
        let buffer = new Uint8Array(reader.result);
        universe.clear(0x000000);
        universe.imageDecoder(buffer,0);
        drawed = true;
        affine();
        drawer();
    };

});

function drawer() {
  universe.drawCanvas(width,height);
  universe.drawCanvas2(width,height);
}

