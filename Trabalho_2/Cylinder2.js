class Cylinder2 extends CGFobject {
  constructor(scene,base,top,hgt,slices,stacks) {
    super(scene);
    this.base = base;
    this.top = top;
    this.height = hgt;
    this.initBuffers();  
  }
  
  initBuffers() {
    const step_u = 2*Math.PI/slices;
    const step_v = this.height/stacks;
    
  }
}