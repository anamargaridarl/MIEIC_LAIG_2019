class MyScale {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = 0;
    this.ry = 0;
    this.rz = 0;
    this.n = 0;
  }

  update(animation,keyframe, matrix) {
    
    let instance = animation.keyframes[keyframe-1].instance;
    let lastinstance = animation.keyframes[keyframe-1].lastinstance;
    
    let a_x = 1;
    let a_y = 1;
    let a_z = 1;
    
    if(keyframe > 1)
    {
      let p = keyframe-2;
      a_x =  animation.keyframes[p].scale.x;
      a_y =  animation.keyframes[p].scale.y;
      a_z =  animation.keyframes[p].scale.z;
    }
    
    if(this.rx == 0)
    {
      let n = ( instance-lastinstance )*20;
      this.rx = Math.pow((this.x/a_x),1/n);
      this.ry = Math.pow((this.y/a_y),1/n);
      this.rz = Math.pow((this.z/a_z),1/n);
    }    

    let step_x  = Math.pow(this.rx,this.n) * a_x;
    let step_y  = Math.pow(this.ry,this.n) * a_y;
    let step_z  = Math.pow(this.rz,this.n) * a_z;

    this.n +=1;

    var position = [];
    position.push(...[step_x,step_y, step_z]);
    matrix = mat4.scale(matrix, matrix, [step_x,step_y,step_z]);

  }

}