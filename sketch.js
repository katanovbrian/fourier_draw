let t = 0;
let wave = [];
let fourier = [];
let image;
const SIZE_MAX = 800;
const IMAGES = [drawing_fourier,drawing_hilbert,drawing,drawing_shoes]
// let max_depth = 200

function tests(){
  complex_tests();
  fourier_tests();
}

function getFrequencies(){
  let x = [];
  let selected = document.getElementById("fdrawing").value;
  if (selected == 4){
    image = convert(document.getElementById("file"))
  }
  else {
    image = IMAGES[selected]
  }

  const skip = floor(image.length / 256);
  for (let i = 0; i < image.length; i += skip) {
    const c = new Complex(image[i].re, image[i].im);
    x.push(c);
  }
  fourier = dft_complex(x);
  fourier.sort((a, b) => b.amp - a.amp);
}

function clearDrawing(){
  t = 0;
  wave = [];
}

function setup() {
  createCanvas(SIZE_MAX, SIZE_MAX);
  tests();
  getFrequencies();  
}

function draw() {
  background(0);
  translate(SIZE_MAX/2,SIZE_MAX/2);
 
  let curr = new Complex(0,0);
  let prev = new Complex(0,0);
  for (let i = 0; i < floor(document.getElementById("myRange").value*fourier.length); i++){
    prev = curr;
    let f = fourier[i];
    let freq = f.freq;
    if (freq === 0 ) {
      continue;
    }
    let amp = f.amp;
    let phase = f.phase;
    curr = Complex.add(curr,new Complex(amp*cos(freq*t+phase),amp*sin(freq*t+phase)));

    stroke(255, 100);
    noFill();
    ellipse(prev.re, prev.im, amp * 2);
    stroke(255);
    line(prev.re, prev.im, curr.re, curr.im);
  }
  wave.unshift(curr);
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(wave[i].re, wave[i].im);
  }
  endShape();

  const dt = TWO_PI / fourier.length;
  t += dt;
  
  if (t > TWO_PI) {
    clearDrawing()
  }
  
}
