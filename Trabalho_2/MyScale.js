class MyScale {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.divX = 0;
    this.divY = 0;
    this.divZ = 0;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getZ() {
    return this.z;
  }

  setDivX(X) {
    this.divX = X;
  }

  setDivY(Y) {
    this.divY = Y;
  }

  setDivX(Z) {
    this.divZ = Z;
  }
}