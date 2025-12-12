
let mood = 0;       
let r = 200, g = 220, b = 255;
let eyeSize = 18;

function setup() {
  // create the canvas
  canvas = createCanvas(400, 400);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");
}

function draw() {
  background(240);

  
  noStroke();
  fill(r, g, b);
  circle(150, 150, 200);

  
  fill(0);
  circle(115, 130, eyeSize);
  circle(185, 130, eyeSize);

  
  if (mood === 0) {
    noFill();
    stroke(0);
    strokeWeight(5);
    ellipse(150, 180, 100, 60);
    noStroke();
    fill(240);               
    rect(150, 160, 120, 40); 
  } else if (mood === 1) {
    noFill();
    stroke(0);
    strokeWeight(5);
    ellipse(150, 180, 100, 60);
    noStroke();
    fill(240);               
    rect(150, 200, 120, 40);
  } else if (mood === 2) {
    stroke(0);
    strokeWeight(5);
    line(100, 180, 200, 180);
  } else {
    noStroke();
    fill(0);
    circle(150, 185, 28);
  }
}


function randomize() {
  r = random(255);
  g = random(255);
  b = random(255);
  eyeSize = random(10, 30);
}


function keyPressed() {
  if (key === ' ') {
    mood = (mood + 1) % 4;
    randomize();
  }
}


function mousePressed() {
  randomize();
}
