var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;

function fgupload(){
  var fileinput = document.getElementById("fginput");
  fgCanvas = document.getElementById("fgcan");
  
  fgImage = new SimpleImage(fileinput);
  
  // Log to check if the image is being loaded
  console.log(fgImage); 
  
  // Check if the image is loaded
  if (fgImage != null) {
    fgImage.drawTo(fgCanvas);
  }
}

function bgupload(){
  var fileinput = document.getElementById("bginput");
  bgCanvas = document.getElementById("bgcan");
  
  bgImage = new SimpleImage(fileinput);
  
  // Log to check if the image is being loaded
  console.log(bgImage); 
  
  // Check if the image is loaded
  if (bgImage != null) {
    bgImage.drawTo(bgCanvas);
  }
}

function createComposite(){
    var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
    var greenThreshold = 240;
    for (var pixel of fgImage.values()) {
      var x = pixel.getX();
      var y = pixel.getY();
      
      if (pixel.getGreen() > greenThreshold){
        var bgPixel = bgImage.getPixel(x, y);
        output.setPixel(x, y, bgPixel);
      }
      else{
        output.setPixel(x, y, pixel);
      }
    }
    output.drawTo(fgCanvas);
}

function greenScreen() {
  if (fgImage == null){
    alert("Foreground not loaded");
    return;
  }
  if (bgImage == null){
    alert("Background not loaded");
    return;
  }
  doClear(bgCanvas);
  createComposite();
}

function clearCanvas(){
  doClear(fgCanvas);
  doClear(bgCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}
