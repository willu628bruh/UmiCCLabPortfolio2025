let compartments = [];
let pills = [];

let draggingPillId = null;   // which pill being dragged 
let ox = 0, oy = 0;          //offset cursor

function setup() {
  // create the canvas
  canvas = createCanvas(1000, 520);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");

  // Color palette 
  // Colors have to match
  const pal = {
    yellow: color(255, 220, 0),
    red: color(220, 40, 40),
    blue: color(40, 90, 220),
    green: color(40, 170, 90),
    purple: color(140, 70, 200),
    pink: color(235, 90, 170),
    orange: color(245, 140, 40)
  };

  // Day compartments
  let days = [
    ["Sunday","Su","yellow"], ["Monday","Mo","red"], ["Tuesday","Tu","blue"],
    ["Wednesday","We","green"], ["Thursday","Th","purple"], ["Friday","Fr","pink"],
    ["Saturday","Sa","orange"]
  ];

  // Week layout 
  let pad = 18, w = 120, h = 140;
  let startX = (width - (7*w + 6*pad)) / 2;
  let y = 90;

  // Build compartment objects with positions + color + occupancy state (I had help here)
  for (let i=0;i<days.length;i++){
    let x = startX + i*(w+pad);
    compartments.push({
      name: days[i][0],
      label: days[i][1],
      key: days[i][2],          // used for color matching
      col: pal[days[i][2]],     // actual p5 color
      x:x, y:y, w:w, h:h,
      filledBy: null,           // pill id that filled this compartment
      hover:false               // highlight state when a valid pill is over it
    });
  }

  // Pill definitions
  let defs = [
    ["EDM","red"],
    ["Dariacore","purple"],
    ["Electro-House","pink"],
    ["Mashup","orange"],
    ["Bruxaria","green"],
    ["Footwork","blue"],
    ["Jungle","yellow"]
  ];

  // Pills are under the organizer
  let r = 28;
  let pillPad = 26;
  let total = 7*(2*r) + 6*pillPad;
  let sx = (width - total)/2 + r;
  let py = y + h + 110;

  // Build pill objects with positions + states (Had help)
  for (let i=0;i<defs.length;i++){
    let px = sx + i*((2*r)+pillPad);
    pills.push({
      id:i,
      label: defs[i][0],
      key: defs[i][1],          // used for matching against compartment.key
      col: pal[defs[i][1]],     // actual p5 color
      x:px, y:py, r:r,
      hx:px, hy:py,             // "home" position to snap back on invalid drop
      state:"loose",            // "loose" | "dragging" | "locked"
      lockedTo:null             // compartment index once placed
    });
  }
}

function draw() {
  background(248);

  // Titlee
  noStroke();
  fill(20);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Daily Dose of Music", width/2, 34);

  // Reset hover state every frame (I had help here)
  for (let i=0;i<compartments.length;i++) compartments[i].hover = false;

  
  // Only highlight if the drop works (empty + matching color key) 
  if (draggingPillId !== null) {
    let p = pills[draggingPillId];
    if (p && p.state === "dragging") {
      let idx = hitComp(p.x, p.y);
      if (idx !== -1) {
        let c = compartments[idx];
        if (c.filledBy === null && c.key === p.key) c.hover = true;
      }
    }
  }

  // Draw compartments
  for (let i=0;i<compartments.length;i++) drawComp(compartments[i]);

  // Draw pills
  for (let i=0;i<pills.length;i++) if (pills[i].state !== "dragging") drawP(pills[i]);
  for (let i=0;i<pills.length;i++) if (pills[i].state === "dragging") drawP(pills[i]);

  // Instruction line
  //fill(60);
 // textSize(12);
 // textAlign(CENTER, CENTER);
  //text("Drag each colored pill into the matching-color day compartment. Placed pills lock and grey out.", width/2, height-24);
}

function drawComp(c) {
  // Compartment outer shell 
  stroke(c.hover ? 30 : 80);
  strokeWeight(c.hover ? 3 : 1.5);
  fill(c.col);
  rect(c.x, c.y, c.w, c.h, 18);

  // Day label 
  noStroke();
  fill(10);
  textAlign(CENTER, CENTER);
  textSize(28);
  text(c.label, c.x + c.w/2, c.y + 34);

  // Inner tray area 
  let tx = c.x + 14, ty = c.y + 58, tw = c.w - 28, th = c.h - 74;
  stroke(0,0,0,60);
  strokeWeight(1);
  fill(255,255,255,70);
  rect(tx, ty, tw, th, 14);

  // Optional "FILLED" indicator (Had help)
  if (c.filledBy !== null) {
    noStroke();
    fill(0,0,0,35);
    textSize(12);
    text("FILLED", c.x + c.w/2, c.y + c.h - 16);
  }
}

function drawP(p) {
  // Visual states: (Had help)
  // - loose/dragging: colored pill
  // - locked: greyed-out pill
  let fc, lc, oc;
  if (p.state === "locked") {
    fc = color(190); oc = color(120); lc = color(90);
  } else {
    fc = p.col; oc = color(60); lc = pickText(fc);
  }

  // Pill circle
  stroke(oc);
  strokeWeight(2);
  fill(fc);
  circle(p.x, p.y, p.r*2);

  // Pill genre
  noStroke();
  fill(lc);
  textAlign(CENTER, CENTER);
  textSize(fitSize(p.label));
  text(p.label, p.x, p.y + 1);
}

function fitSize(t) {
  // Rough text fitting based on length so it stays inside the circle (Had help)
  if (t.length >= 11) return 8;  // "Electro-House"
  if (t.length >= 9) return 9;   // "Dariacore", "Footwork"
  if (t.length >= 6) return 10;  // "Jungle"
  if (t.length >= 5) return 10;
  if (t.length === 4) return 11;
  return 12;
}

function pickText(c) {
  // Simple luminance-based contrast: returns black-ish or white-ish text (Had help)
  let lum = 0.2126*red(c) + 0.7152*green(c) + 0.0722*blue(c);
  return lum > 150 ? color(10) : color(250);
}

function mousePressed() {
  // Find the top loose pill under the cursor and start dragging it
  for (let i=pills.length-1;i>=0;i--){
    let p = pills[i];
    if (p.state !== "loose") continue;

    let dx = mouseX - p.x, dy = mouseY - p.y;
    if (dx*dx + dy*dy <= p.r*p.r) {
      draggingPillId = p.id;
      p.state = "dragging";

      
      ox = mouseX - p.x;
      oy = mouseY - p.y;
      return;
    }
  }
}

function mouseDragged() {
  // Update dragged pill position to follow mouse (had help)
  if (draggingPillId === null) return;
  let p = pills[draggingPillId];
  if (!p || p.state !== "dragging") return;

  p.x = mouseX - ox;
  p.y = mouseY - oy;
}

function mouseReleased() {
  // Drop logic: (This entire thing was bugging me) (Had help)
  // - If: released over a matching-color, snap + lock + grey out
  // - Else: return to home position and remain loose
  if (draggingPillId === null) return;

  let p = pills[draggingPillId];
  if (!p || p.state !== "dragging") { draggingPillId = null; return; }

  let idx = hitComp(p.x, p.y);

  if (idx !== -1) {
    let c = compartments[idx];

    // matching rule
    // compartment must be empty AND color match
    if (c.filledBy === null && c.key === p.key) {
      // Snap into a nice "tray center" position
      p.x = c.x + c.w/2;
      p.y = c.y + c.h/2 + 18;

      p.state = "locked";
      p.lockedTo = idx;
      c.filledBy = p.id;

      draggingPillId = null;
      return;
    }
  }

  // Invalid drop: reset to home 
  p.x = p.hx; p.y = p.hy;
  p.state = "loose";
  p.lockedTo = null;
  draggingPillId = null;
}

function hitComp(px, py) {
  // Returns compartment index if point is inside its rectangle; else -1 (had help)
  for (let i=0;i<compartments.length;i++){
    let c = compartments[i];
    if (px >= c.x && px <= c.x + c.w && py >= c.y && py <= c.y + c.h) return i;
  }
  return -1;
}
