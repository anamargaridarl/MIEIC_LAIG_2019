class MyRotation {
  constructor(scene, angle_x, angle_y, angle_z) {
    this.scene = scene;
    this.angle_x = angle_x;
    this.angle_y = angle_y;
    this.angle_z = angle_z;
  }

  update(t,animation,keyframe, matrix) {
    
    let instance = animation.keyframes[keyframe-1].instance;
    let lastinstance = animation.keyframes[keyframe-1].lastinstance;

    let per = 1 - ((instance- t) / (instance - lastinstance));
   
    let a_x = 0;
    let a_y = 0;
    let a_z = 0;
    
    if(keyframe > 1)
    {
      let n = keyframe-2;
      a_x =  animation.keyframes[n].rotation.angle_x;
      a_y =  animation.keyframes[n].rotation.angle_y;
      a_z =  animation.keyframes[n].rotation.angle_z;
    }

    if (this.angle_x != 0) {
      let divX = (this.angle_x - a_x)* per;
      this.scene.parseRotationCore('x', divX, matrix);
    }
    if (this.angle_y != 0) {
      let divY = (this.angle_y -a_y)* per;
      this.scene.parseRotationCore('y', divY, matrix);
    }
    if (this.angle_z != 0) {
      let divZ = (this.angle_z -a_z) * per;
      this.scene.parseRotationCore('z', divZ, matrix);
    }
  }
}