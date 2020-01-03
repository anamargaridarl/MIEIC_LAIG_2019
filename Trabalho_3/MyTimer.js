class MyTimer extends CGFobject {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.pointer = new MyRectangle(scene,"pointer",-0.05,0.05,0,2);
    this.timeout = false;
    this.isCounting = false;
    this.t = 0;
    this.angle = 0;
  }

  setTimer() {
    if(!this.isCounting) {
      this.t = 0;
      this.isCounting = true;
      this.timeout = false;
      this.angle = 0;
    }
  }

  unsetTimer() {
    this.isCounting = false;
    this.t = 0;
    this.timeout = false;
  }

  update(t) {
    if(this.t == 0)
      this.t = t;
    if((t - this.t) < 60) {
      this.angle= -(t-this.t)/60 * 2*  Math.PI;
    } else {
      this.timeout = true;
      this.isCounting = false;
    }
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(-10,10,0.25);
    this.scene.rotate(this.angle,0,0,1);
    this.pointer.display();
    this.scene.popMatrix();
  }
}