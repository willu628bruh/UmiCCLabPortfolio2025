function setup() {
  // create the canvas
  canvas = createCanvas(600, 400);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");
}

function draw() {
  background(0);

  
  let numHex = 10;
  
  let baseRadius = 140;
  let centerX = width / 2;
  let centerY = height / 2;
  let xShift = 12;   

  for (let i = 0; i < numHex; i++) {
    
    // 0 to 1
    let t = i / (numHex - 1);

    // from white  to blck 
    let gray = 255 - t * 255;

    // move left 
    let x = centerX - i * xShift;
    let y = centerY;

    // Radius gets smaller
    let r = baseRadius - i * 10;

   
      strokeWeight(3);

    stroke(0);
    fill(gray);
    drawHexagon(x, y, r);
  }
}

// Helper function to draw a hexagon (i had help with this)
function drawHexagon(cx, cy, radius) {
  beginShape();
  for (let a = 0; a < TWO_PI; a += TWO_PI / 6) {
    let x = cx + cos(a) * radius;
    let y = cy + sin(a) * radius;
    vertex(x, y);
  }
  endShape(CLOSE);
}
