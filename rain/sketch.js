var N;
var R=10;
var GAP=2;
var particles;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
  frameRate(40);
	noStroke();
	N = width;
	particles = Array(N);
	for (var i = 0; i < N; i++) {
		particles[i] = [i, 0, random(), random()]; // x, y, speed, direction
	}
}
var gradient = {
  start: {
    r: 0,
    g: 252,
    b: 233
  },
  end: {
    r: 0,
    g: 43,
    b: 253
  },

}

function linear_gradient(gradient, proportion) {
  // fixme: use lerpcolor
  var rgb = {};
  rgb['r'] = lerp(gradient.start.r, gradient.end.r, proportion);
  rgb['g'] = lerp(gradient.start.g, gradient.end.g, proportion);
  rgb['b'] = lerp(gradient.start.b, gradient.end.b, proportion);
  return rgb;
}


function draw() {
	background(255, 50); // this fades old raindrops, giving a "tail"
  // for the screen width in pixels
  for (var i = 0; i < N; i++) {
    var y = (particles[i][1] + (random()*3)*8) % height;
		particles[i][1] = y;
    var x = particles[i][0] * R * GAP;

    // linear gradient of the "tail" of a rain drop
    var current_proportion = x/ width; // how far
    var ellipse_color = linear_gradient(gradient, current_proportion);
    fill(ellipse_color.r, ellipse_color.g, ellipse_color.b)

		ellipse(x, y, R);
		
	}
}
