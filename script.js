var canvas = document.getElementById("canvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");
var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
ctx.fillStyle = "#00";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const startTime = Date.now();

var i = 0; 
var c = 255;

function drawPixel (x, y, r, g, b) {
    var index = (x + y * canvasWidth) * 4;
    
    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    ctx.putImageData(canvasData, 0, 0);
}
function clear() {
  ctx.fillStyle = "#00";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {

  for(y=0;y<canvasHeight;y++) {
    for(x=0;x<canvasWidth;x++) {
      i += 1;

      var now = Date.now();
      var t = (now - startTime) / 1000;

      const formula = `with(Math) { ${document.getElementById("code").value} }`;

        output = eval(formula)

        ctx.fillStyle = 'rgb(' + (output*255) + ', 0, 0)';
        ctx.fillRect(x, y, 1, 1);
     
    }
  }
  i = 0;
  
  setInterval(draw, 100)
  
}

draw()