let lap = 20000; 

function setup() {
  // create the canvas
  canvas = createCanvas(600, 300);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");
}

function draw(){
  background(200);

  
  noStroke();
  fill(90,180,255);
  rect(50,70,500,160,10);

  // tiny waves
  stroke(255);
  for(let i=60;i<540;i+=40){
    line(i,120,i+20,120);
    line(i+10,160,i+30,160);
    line(i,200,i+20,200);
  }

  
  let t = millis() % lap;
  let p = t / lap;          // 0..1 over 20s
  let x;
  if(p < 0.5){
    // left -> right in first 10s
    x = map(p, 0, 0.5, 70, 530);
  }else{
    // right -> left in next 10s
    x = map(p, 0.5, 1, 530, 70);
  }

  
  let y = 150;
  noStroke();
  fill(71, 39, 1); // head
  circle(x, y-15, 16);
  fill(247, 39, 7);   // body
  rect(x-12, y-10, 24, 20, 5);
  

  
  noStroke();
  fill(0);
  textSize(12);
  text("a lap every 20 seconds", 10, 18);
}
