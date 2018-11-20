function setup() {
  createCanvas(windowWidth, windowHeight);
  //fill(224,255,0);
  fill(0);
  noStroke();
  rectMode(CENTER);
  console.log(1 + " " + frameRate());
  frameRate(2000);
  console.log(2 + " " + frameRate());
  noiseDetail(3, 0.5);
}

var gradient = {
  start: {
    r: 16,
    g: 239,
    b: 216
  },
  end: {
    r: 248,
    g: 16,
    b: 216
  },

}

function linear_interpolation(start, end, proportion) {
  // linear betweeen start..end by proportion: 1/2 is halfway
  return (end - start) * proportion + start;
}

function linear_gradient(gradient, proportion) {
  // fixme: use lerpcolor
  var rgb = {};
  rgb['r'] = linear_interpolation(gradient.start.r, gradient.end.r, proportion);
  rgb['g'] = linear_interpolation(gradient.start.g, gradient.end.g, proportion);
  rgb['b'] = linear_interpolation(gradient.start.b, gradient.end.b, proportion);
  return rgb;
}

function draw() {
  background(255);
  for (var x = 0; x < width; x += 15) {
    //fill(22, 178, 233);
    //fill(250, 200, 122);

    // linear gradient across width
    var current_proportion = x / width; // how far
    var ellipse_color = linear_gradient(gradient, current_proportion);
    fill(ellipse_color.r, ellipse_color.g, ellipse_color.b)

    for (var y = 0; y < height; y += 15) {
      var n = noise(x * 0.0052, y * 0.005, frameCount * 0.05);
      push();
      translate(x, y);
      rotate(TWO_PI * n);
      scale(12 * n);
      ellipse(0, 0, 2.8, 2.8);
      pop();
    }
  }

}