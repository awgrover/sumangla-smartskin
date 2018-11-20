var system;
//
function setup() {
  createCanvas(windowWidth, windowHeight);
  system = new ParticleSystem(createVector(random(width),random(height/20)));
}

function draw() {
  background(255);
  system.addParticle();
  system.run();
 
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0,0);
  this.velocity = createVector(random(-0.9, 0.9), random(0, 0.9));
  //this.position = position.copy();//
  this.position = createVector(random(width),random(height/10));
  this.lifespan = 500.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 0.6;
};

var gradient = {
  start: { r: 230, g: 255, b: 255 }, // light-blue
  end: { r: 230, g: 255, b: 230 }, // light-green
}

function linear_gradient(gradient, proportion) {
  // fixme: use lerpcolor
  var rgb = {};
  rgb['r'] = lerp(gradient.start.r, gradient.end.r, proportion);
  rgb['g'] = lerp(gradient.start.g, gradient.end.g, proportion);
  rgb['b'] = lerp(gradient.start.b, gradient.end.b, proportion);
  return rgb;
}

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  noStroke();

  // gradient stuff
  var current_proportion = this.position.x / width; // how far
  var ellipse_color = linear_gradient(gradient, current_proportion);
  fill(ellipse_color.r, ellipse_color.g, ellipse_color.b)

  //fill(230, 255, 255, this.lifespan);
  ellipse(this.position.x, this.position.y, 16, 16);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0 || 
      this.position.x < 0 || 
      this.position.y < 0 ||
      this.position.x > width ||
      this.position.y > height) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
