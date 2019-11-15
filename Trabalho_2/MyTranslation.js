class MyTranslation {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

  }

  update(t,animation,keyframe,matrix)
  {
    let instance = animation.keyframes[keyframe-1].instance;
    let lastinstance = animation.keyframes[keyframe-1].lastinstance;

    let per = 1 - ((instance- t) / (instance - lastinstance));
   
    let a_x = 0;
    let a_y = 0;
    let a_z = 0;
    
    if(keyframe > 1)
    {
      let n = keyframe-2;
      a_x =  animation.keyframes[n].translation.x;
      a_y =  animation.keyframes[n].translation.y;
      a_z =  animation.keyframes[n].translation.z;
    }

    if(per != 0)
    {
    let divX = (this.x -a_x)* per;
    let divY = (this.y -a_y)*  per;
    let divZ = (this.z - a_z) *  per;
      
    var position = [];
    position.push(...[divX,divY, divZ]);
    matrix = mat4.translate(matrix, matrix, [divX,divY,divZ]);
    }
    
  }
}