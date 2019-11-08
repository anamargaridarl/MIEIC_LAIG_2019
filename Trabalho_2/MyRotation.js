class MyRotation {
  constructor(scene,angle_x, angle_y, angle_z) {
    this.scene =scene;
    this.angle_x = angle_x;
    this.angle_y = angle_y;
    this.angle_z = angle_z;

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

    this.scene.parseRotationCore('x', this.divX, matrix);
    this.scene.parseRotationCore('y', this.divY, matrix);
    this.scene.parseRotationCore('z', this.divZ, matrix);
  }
 

}