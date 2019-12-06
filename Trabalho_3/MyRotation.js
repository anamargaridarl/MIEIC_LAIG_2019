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
   if(per > 1)
   per =1;
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

      let divX = (this.angle_x - a_x)* per;
      this.scene.parseRotationCore('x', divX, matrix);
    
      let divY = (this.angle_y -a_y)* per;
      this.scene.parseRotationCore('y', divY, matrix);

    
      let divZ = (this.angle_z -a_z) * per;
      this.scene.parseRotationCore('z', divZ, matrix);

  


  }
}