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

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  noStroke();
  fill(230, 255, 255, this.lifespan);
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