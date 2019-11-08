class MyTranslation {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.divX = 0;
    this.divY = 0;
    this.divZ = 0;
  }

  update(t,lastinstance,instance,matrix)
  {
    let per = 1 - ( (instance-t)/(instance-lastinstance));
    
    this.divX = this.angle_x / per;
    this.divY = this.angle_y /  per;
    this.divZ = this.angle_z /  per;

    let transfMatrix = mat4.create();
    
    transfMatrix =
    mat4.translate(transfMatrix, transfMatrix, [this.divX,this.divY,this.divZ]);
    mat4.multiply(matrix,transfMatrix,matrix);

  }
}