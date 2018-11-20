var s = 6;
var area = 35;

function setup() {
createCanvas(windowWidth, windowHeight);
fill(0);
  noStroke();
  

}

var gradient = {
  start: {
    r: 255,
    g: 248,
    b: 4
  },
  end: {
    r: 255,
    g: 103,
    b: 81
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
  
    
  for (var x = area; x < width; x+=s*2) {
    
       // linear gradient across width
    var current_proportion = x / width; // how far
    var ellipse_color = linear_gradient(gradient, current_proportion);
    fill(ellipse_color.r, ellipse_color.g, ellipse_color.b)
    
    for (var y = area; y < height; y+=s*2) {
      var diff = sin(radians(dist(x, y, sin(radians(x))*width, cos(radians(y))*height)-frameCount*10))*s;
      if(dist(x, y, width, height) < area*200){
        ellipse(x-20, y-20, s-diff, s-diff);
        
      }
    }
  }
}