class MyRotation {
  constructor(scene, angle_x, angle_y, angle_z) {
    this.scene = scene;
    this.angle_x = angle_x;
    this.angle_y = angle_y;
    this.angle_z = angle_z;
  }

  update(t, lastinstance, instance, matrix) {
    let per = 1 - ((instance - t) / (instance - lastinstance));

    if (this.angle_x != 0) {
      let divX = this.angle_x * per;
      this.scene.parseRotationCore('x', divX, matrix);
    }
    if (this.angle_y != 0) {
      let divY = this.angle_y * per;
      this.scene.parseRotationCore('y', divY, matrix);
    }
    if (this.angle_z != 0) {
      let divZ = this.angle_z * per;
      this.scene.parseRotationCore('z', divZ, matrix);
    }
  }
}