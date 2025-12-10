let myColor;

function setup() {
  createCanvas(400, 400);
  myColor = color(0, 255, 0);
  noLoop(); // stop automatic looping
}

function draw() {
  background(220);
  fill(myColor);
  noStroke();
  ellipse(width/2, height/2, 150, 150);
}

// redraw only when mouse is pressed
function mousePressed() {
  myColor = color(random(255), random(255), random(255));
  redraw(); // manually call draw() once
}
