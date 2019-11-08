/**
 * Animation
 * @constructor
 */
class KeyFrameAnimation extends Animation {

  constructor(keyframe,lastintance,instance,rotation,translation,scale) {
    super();
    this.currentTime =0;
    this.lastintance = lastintance;
    this.keyframe = keyframe;
    this.instance = instance;
    this.rotation = rotation;
    this.scale = scale;
    this.translation = translation;
    this.matrix = mat4.create();
  }
  
  update(t,scene)
  {   
    if(this.currentTime == 0)
      this.currentTime = t;

    let time = t - this.currentTime;

   if(time < this.lastintance || time > this.instance)
    return;

   this.rotation.update(time,this.lastintance,this.instance,this.matrix);
   this.translation.update(time,this.lastintance,this.instance,this.matrix);
   this.apply(scene);
   //this.scale.update(t,this.t);   
  }

  apply(scene)
  {
    scene.multMatrix(this.matrix);
  }
  

 


}