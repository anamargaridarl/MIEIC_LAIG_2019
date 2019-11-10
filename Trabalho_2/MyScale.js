class MyScale {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

  }

  update(t, lastinstance, instance, matrix) {

    let per = 1 - ((instance - t) / (instance - lastinstance));
    let n = 10;

    let Rx = Math.pow(x*per,1/n);
    let Ry = Math.pow(x*per,1/n);
    let Rz = Math.pow(x*per,1/n);
  }

}