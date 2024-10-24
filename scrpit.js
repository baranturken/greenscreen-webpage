var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;

function fgupload() {
  var fileinput = document.getElementById("fginput");
  fgCanvas = document.getElementById("fgcan");
  fgImage = new SimpleImage(fileinput);

  // Debugging log
  console.log(fgImage);

  // Check if the image is loaded before drawing it
  fgImage.drawTo(fgCanvas); // This attempts to draw the image
  fgImage.onload = function () {
    fgImage.drawTo(fgCanvas); // Ensures it draws after loading
  };
}

function bgupload() {
  var fileinput = document.getElementById("bginput");
  bgCanvas = document.getElementById("bgcan");
  bgImage = new SimpleImage(fileinput);

  // Debugging log
  console.log(bgImage);

  // Check if the image is loaded before drawing it
  bgImage.drawTo(bgCanvas); // This attempts to draw the image
  bgImage.onload = function () {
    bgImage.drawTo(bgCanvas); // Ensures it draws after loading
  };
}

function createComposite() {
  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  var greenThreshold = 240;

  for (var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();

    if (pixel.getGreen() > greenThreshold) {
      var bgPixel = bgImage.getPixel(x, y);
      output.setPixel(x, y, bgPixel); // Replace green pixel with background pixel
    } else {
      output.setPixel(x, y, pixel); // Keep the original pixel if not green
    }
  }

  output.drawTo(fgCanvas); // Draw the composite image onto the foreground canvas
}

function greenScreen() {
  if (fgImage == null) {
    alert("Foreground image not loaded");
    return;
  }
  if (bgImage == null) {
    alert("Background image not loaded");
    return;
  }
  
  // Clear the background canvas before creating the composite
  doClear(bgCanvas);
  createComposite();
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the specified canvas
}
