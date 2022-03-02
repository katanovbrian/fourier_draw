class Complex{
    constructor(re,im){
      this.re = re;
      this.im = im;
    }
  
    static add(a,b){
      return new Complex(a.re + b.re, a.im + b.im);
    }
  
    static multiply(a,b){
      let r = a.re*b.re - a.im*b.im;
      let i = a.re*b.im + a.im*b.re;
      return new Complex(r,i);
    }
  
    static equals(a,b){
        return a.re === b.re && a.im === b.im;
    }
  }
  
  function add_tests(){
      let x1 = new Complex(1,2);
      let x2 = new Complex(3,4);
      let x3 = new Complex(5,6);
  
      let x12 = new Complex(4,6);
      let x23 = new Complex(8,10);
  
      console.assert(Complex.equals(Complex.add(x1,x2) , x12));
      console.assert(Complex.equals(Complex.add(x1,x2) , Complex.add(x2,x1)));
      console.assert(Complex.equals(Complex.add(x2,x3) , x23));
  }
  
  function mult_tests(){
      let x1 = new Complex(1,2);
      let x2 = new Complex(3,4);
      let x3 = new Complex(-5,10);
  
      console.assert(Complex.equals(Complex.multiply(x1,x2) , x3));
      console.assert(Complex.equals(Complex.multiply(x1,x2) , Complex.multiply(x2,x1)));
  }

  function equals_tests(){
    let x1 = new Complex(1,2);
    let x2 = new Complex(3,4);
    let x3 = new Complex(1,2);
    let x4 = new Complex(4,3);


    console.assert(Complex.equals(x1,x1));
    console.assert(!Complex.equals(x1,x2));
    console.assert(Complex.equals(x1,x3));
    console.assert(!Complex.equals(x2,x4));
  }
  
  function complex_tests()
  {
      add_tests();
      mult_tests();
  }
  