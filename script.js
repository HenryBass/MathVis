window.onload = function() {

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d', { alpha: false });

var width = canvas.width;
var height = canvas.height;
var c = 0;
var ex = 0;

examples = ["x&y", "(x%y)/255", "((x-128)*(x-128)+(y-128)*(y-128)) > (sin(t * 2)) * 10000", "sin((x / t)*(y / t))", "sin((x * t)*(y * t))", "cos(tan(sin(x&t) + sin(y & t)))", "sin((x + t)**2) / sin((y + t)**2) > 1"]

var imagedata = ctx.createImageData(width, height);

document.getElementById("example").addEventListener("click", changeex); 

function changeex() {
  document.getElementById("code").value = examples[ex];
  if (ex < (examples.length - 1)) {
    ex += 1;
  } else {
    ex = 0;
  }
  
}


function draw(t) {
	eval(`for (var x=0; x<canvas.width; x++) {
          for (var y=0; y<canvas.height; y++) {
            
              var i = (y * width + x);
              var pixel = i * 4;
              
                with(Math) {
                    var val = ${document.getElementById("code").value};

                    if (val >= 0) {
                      imagedata.data[pixel + 0] = (255 * (val));
                      imagedata.data[pixel + 2] = (0);
                    } else{
                      imagedata.data[pixel + 2] = (255 * Math.abs(val));
                      imagedata.data[pixel + 0] = (0);
                    }

                   imagedata.data[pixel+3] = 255;  
                }
            }
        }`)
	}

	function main(frame) {
		window.requestAnimationFrame(main);
		draw((frame/1000));
		ctx.putImageData(imagedata, 0, 0);
	}
	main(0);

}