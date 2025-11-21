function setup() {
  // create the canvas
  canvas = createCanvas(400, 400);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");

}

function draw() {
  background(255, 170, 0);
  
  blendMode (SUBTRACT)
  fill(255, 204, 0);
  strokeWeight(0);
  circle (100, 200, 400)
  
  
   fill(152, 152, 103);
  strokeWeight(0);
  triangle(360, 130, 760, 500, -40, 500);
  
  fill(231, 241, 255);
  strokeWeight(0);
	beginShape();
		vertex(360, 130);
		vertex(485, 246);
		vertex(390, 200);
		vertex(360, 250);
  	vertex(320, 217);
  	vertex(225, 255);
	endShape(CLOSE);
  
  fill(184, 184, 148);
  strokeWeight(0);
  triangle(100, 180, 500, 500, -260, 500);
  
  fill(231, 241, 255);
  strokeWeight(0);
	beginShape();
		vertex(100, 180);
		vertex(225, 280);
		vertex(145, 250);
		vertex(120, 290);
  	vertex(70, 260);
  	vertex(-20, 286);
	endShape(CLOSE);
}
