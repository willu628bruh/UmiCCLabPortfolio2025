function setup() {
  // create the canvas
  canvas = createCanvas(600, 900);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");
}

function draw() {
  background(255);
  drawHead();
  drawTorso();
  drawLegs();   
}

function drawHead() {
  let cx = 300, cy = 150;

  stroke(0,120,255); strokeWeight(4);
  fill(255,150,50);
  ellipse(cx, cy, 180, 150);

  noStroke(); fill(255);
  ellipse(cx-35, cy-20, 30, 50);
  ellipse(cx+35, cy-20, 30, 50);

  noFill(); stroke(0); strokeWeight(3);
  arc(cx, cy+10, 100, 50, 0, PI);
 
  noStroke(); fill(255,100,120);
  rect(cx-15, cy+30, 30, 25, 10);
  stroke(230,80,100); line(cx, cy+30, cx, cy+55);
}

let torsoX=300, torsoY=420, torsoW=300, torsoH=220; 

function drawTorso() {
  rectMode(CENTER);

  stroke(0,0); fill(190,120,25);
  rect(torsoX, torsoY, torsoW, torsoH, 40);

  fill(150,80,20);
  for (let i = torsoX - torsoW/2 + 20; i < torsoX + torsoW/2; i += 60) {
    rect(i, torsoY, 30, torsoH, 10);
  }

  fill(190,120,25);
  rect(torsoX - 180, torsoY - 10, 100, 60, 20);
  rect(torsoX + 180, torsoY - 10, 100, 60, 20);

  fill(190,255,90);
  ellipse(torsoX - 230, torsoY, 70, 60);
  ellipse(torsoX + 230, torsoY, 70, 60);
}

function drawLegs() {
  let pant = color(30,60,100);
  let outline = color(0,60,180);

  let torsoBottom = torsoY + torsoH/2; 
  let waistY = torsoBottom + 15;       
  let leftTopX  = torsoX - 40;         
  let rightTopX = torsoX + 40;

  noStroke(); fill(pant);
  rect(torsoX, waistY, 180, 40, 12);

  stroke(outline); strokeWeight(6); fill(pant);

  beginShape();
  vertex(leftTopX - 30, waistY + 20);
  vertex(200, 850);
  vertex(270, 850);
  vertex(leftTopX + 10, waistY + 20);
  endShape(CLOSE);

  beginShape();
  vertex(rightTopX + 30, waistY + 20);
  vertex(330, 850);
  vertex(400, 850);
  vertex(rightTopX - 10, waistY + 20);
  endShape(CLOSE);

  noStroke(); fill(pant);
  triangle(200, 850, 270, 850, 170, 880); // left shoe
  triangle(330, 850, 400, 850, 430, 880); // right shoe
}
