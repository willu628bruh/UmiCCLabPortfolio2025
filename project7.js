// pics
let imgAirport1, imgAirport2, imgAirport3;
let imgManon, imgMila, imgMoondev, imgNellnora;
let imgZuman, imgZuzu;
//let bgMusic;
//let musicHasStarted = true;

// game state stuff
let currentScene = 0; // 0,1,2,3
let manon;
let npcs = [];       // for random NPCs in scenes 0 & 1
let zuzu = null;     // special NPC in scene 2
let zuzuState = 0;   // 0 = not started, 1 = Zuzu spoke, 2 = Manon replied

// Text timing
let rudeLines = [
  "uh uh",
  "nope",
  "ew get away",
  "im NOT who youre looking for",
  "buzz off"
];

let manonText = "";
let manonTextTimer = 0;

// layout
let groundY;
let marginX = 80;
let interactionDistance = 70;


const SPRITE_SCALE = 0.20;

function preload() {
  
  imgAirport1  = loadImage("airport1.jpg");
  imgAirport2  = loadImage("airport2.jpg");
  imgAirport3  = loadImage("airport3.jpg");
  imgManon     = loadImage("manon.PNG");
  imgMila      = loadImage("mila.PNG");
  imgMoondev   = loadImage("moondev.PNG");
  imgNellnora  = loadImage("nellnora.PNG");
  imgZuman     = loadImage("zuman.PNG");
  imgZuzu      = loadImage("zuzu.PNG");
  //music
  //bgMusic = loadSound("is he stupid?.mp3");
}

function setup() {
  // create the canvas
  canvas = createCanvas(800, 450);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");

  //floor
  groundY = height * 2 / 3; // ~1/3 of canvas below the characters

  // Manon setup
  manon = {
    x: marginX,
    y: groundY,
    speed: 4,
    facing: 1 // 1 = right, -1 = left
  };

  // other guys
  createRandomNPCs();

  // zuzu scene 2
  zuzu = {
    x: width * 0.6,
    y: groundY,
    scene: 2,
    img: imgZuzu,
    currentText: "",
    textTimer: 0
  };
}

function draw() {
  background(0);

  drawSceneBackground();

  if (currentScene <= 2) {
    handleMovement();
    clampManon();
  }

  if (currentScene === 0 || currentScene === 1) {
    drawNPCs();
  } else if (currentScene === 2) {
    drawZuzuScene();
  } else if (currentScene === 3) {
    drawFinalScene();
  }

  if (currentScene <= 2) {
    drawManon();
    drawManonText();
  }
}

// background
function drawSceneBackground() {
  let img = null;
  if (currentScene === 0) img = imgAirport1;
  if (currentScene === 1) img = imgAirport2;
  if (currentScene === 2) img = imgAirport3;

  if (img) {
    // Fit background to canvas
    push();
    translate(width / 2, height / 2);
    let scaleFactor = max(width / img.width, height / img.height);
    image(img, 0, 0, img.width * scaleFactor, img.height * scaleFactor);
    pop();
  }
}

// movement
function handleMovement() {
  // A key
  if (keyIsDown(65)) {
    manon.x -= manon.speed;
    manon.facing = -1;
  }

  // D key
  if (keyIsDown(68)) {
    manon.x += manon.speed;
    manon.facing = 1;
  }

  // Scene changes when u hit right side
  if (currentScene === 0 || currentScene === 1) {
    let maxX = width - marginX;
    if (manon.x >= maxX) {
      currentScene++;
      manon.x = marginX;
      manonText = "";
      manonTextTimer = 0;
    }
  }
}

function clampManon() {
  let minX = marginX;
  let maxX = width - marginX;
  if (manon.x < minX) manon.x = minX;
  if (manon.x > maxX) manon.x = maxX;
}

function drawManon() {
  push();
  translate(manon.x, manon.y);
  scale(manon.facing, 1); // flip left/right
  image(
    imgManon,
    0,
    0,
    imgManon.width * SPRITE_SCALE,
    imgManon.height * SPRITE_SCALE
  );
  pop();
}

function drawManonText() {
  if (manonText && millis() < manonTextTimer) {
    push();
    fill(255);
    stroke(0);
    strokeWeight(3);
    // still above head, now plenty of space since floor is higher
    text(manonText, manon.x, manon.y - 120);
    pop();
  }
}

// other npcs blah blah blah
function createRandomNPCs() {
  npcs = [];
  let npcCount = floor(random(2, 5)); // 2,3,4

  let types = [
    { type: "mila", imgGetter: () => imgMila },
    { type: "moondev", imgGetter: () => imgMoondev },
    { type: "nellnora", imgGetter: () => imgNellnora }
  ];

  for (let i = 0; i < npcCount; i++) {
    let t = random(types);
    let npcScene = random([0, 1]); // only in scenes 0 & 1

    let npc = {
      x: random(marginX * 1.5, width - marginX * 1.5),
      y: groundY,
      scene: npcScene,
      type: t.type,
      img: t.imgGetter(),
      currentText: "",
      textTimer: 0
    };

    npcs.push(npc);
  }
}

function drawNPCs() {
  for (let npc of npcs) {
    if (npc.scene !== currentScene) continue;

    // smaller scale sprite 
    push();
    translate(npc.x, npc.y);
    image(
      npc.img,
      0,
      0,
      npc.img.width * SPRITE_SCALE,
      npc.img.height * SPRITE_SCALE
    );
    pop();

    // Draw their text if active
    if (npc.currentText && millis() < npc.textTimer) {
      push();
      fill(255);
      stroke(0);
      strokeWeight(3);
      text(npc.currentText, npc.x, npc.y - 120);
      pop();
    }
  }
}

// zuzu in scene 2
function drawZuzuScene() {
 
  push();
  translate(zuzu.x, zuzu.y);
  image(
    zuzu.img,
    0,
    0,
    zuzu.img.width * SPRITE_SCALE,
    zuzu.img.height * SPRITE_SCALE
  );
  pop();

  // Zuzu text
  if (zuzu.currentText && millis() < zuzu.textTimer) {
    push();
    fill(255);
    stroke(0);
    strokeWeight(3);
    text(zuzu.currentText, zuzu.x, zuzu.y - 120);
    pop();
  }
}

// Final scene zuzu and manon
function drawFinalScene() {
  
  push();
  translate(width / 2, height / 2);

 
  let scaleFactor = min(
    (width * 0.8) / imgZuman.width,
    (height * 0.8) / imgZuman.height
  );

  image(
    imgZuman,
    0,
    0,
    imgZuman.width * scaleFactor,
    imgZuman.height * scaleFactor
  );
  pop();

  // Overlay messgae
  push();
  fill(255);
  stroke(0);
  strokeWeight(4);
  textSize(36);
  text("you found zuzu!", width / 2, height / 2);
  pop();
}
// 
function keyPressed() {
  if (key === " ") {
    if (currentScene === 0 || currentScene === 1) {
      handleRandomNPCInteraction();
    } else if (currentScene === 2) {
      handleZuzuInteraction();
    }
  }
}

// Random npc lines
function handleRandomNPCInteraction() {
  // Find an NPC in range in the current scene
  let target = null;
  for (let npc of npcs) {
    if (npc.scene !== currentScene) continue;
    if (abs(manon.x - npc.x) < interactionDistance) {
      target = npc;
      break;
    }
  }

  if (target) {
    target.currentText = random(rudeLines);
    target.textTimer = millis() + 1800;
  }
}

// Zuzu special dialogue sequence in scene 2
function handleZuzuInteraction() {
  if (abs(manon.x - zuzu.x) > interactionDistance) {
    return; // too far away
  }

  if (zuzuState === 0) {
    // First pres zuzu speaks
    zuzu.currentText = "where did you go??";
    zuzu.textTimer = millis() + 2000;
    zuzuState = 1;
    manonText = "";
    manonTextTimer = 0;
  } else if (zuzuState === 1) {
    // Second press Manon 
    manonText = "i got lost :(";
    manonTextTimer = millis() + 2000;
    zuzuState = 2;
  } else if (zuzuState === 2) {
    // Third press final scene
    currentScene = 3;
  }
}
