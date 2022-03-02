function dft_complex(signal){
  fourier = [];
  let N = signal.length;
  for (let k = 0; k < N; k++){
    let sum = new Complex(0,0);
    for (let n = 0; n < N; n++) {
      let phi = (TWO_PI*k*n)/N;
      let trig = new Complex(cos(phi),-sin(phi));
      let mult = Complex.multiply(signal[n],trig);
      sum = Complex.add(sum,mult);
    }
    sum.re = sum.re / N;
    sum.im = sum.im / N;
    
    let freq = k;
    let amp = sqrt(sum.re*sum.re+sum.im*sum.im);
    let phase = atan2(sum.im,sum.re);
    
    fourier[k] = {point: sum, freq: freq, amp: amp,phase: phase};
  }  
  return fourier;
}

function fourier_tests(){
  let epsilon = 1e4;
    let x = [new Complex(1,0),new Complex(2,-1),new Complex(0,-1),new Complex(-1,2)];
    let y = [new Complex(.5,0),new Complex(-.5,-.5),new Complex(0,-.5),new Complex(1,1)];
    let temp = dft_complex(x);
    for (let i = 0; i < temp.length; i++){
      let test = temp[i].point;
      console.assert(Math.abs(test.re-y[i].re) <= epsilon);
      console.assert(Math.abs(test.im-y[i].im) <= epsilon);
    }
}