// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

let font;
let vehicles = [];

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(1000, 500);
  background(51);
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);

  var Firstname = font.textToPoints('Sebastian', 100, 200, 150, {
    sampleFactor: 0.25
  });
  
  var Secondname = font.textToPoints('Clarke', 100, 200, 150, {
    sampleFactor: 0.25
  });

  for (var i = 0; i < Secondname.length; i++) {
    Secondname[i].y += 160;
  }

  let points = concat(Firstname,Secondname);

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}

function draw() {
  background(51);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}