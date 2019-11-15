/**
 * Animation
 * @constructor
 */
class KeyFrameAnimation extends Animation {
  constructor(keyframe, lastinstance, instance, rotation, translation, scale) {
    super();
    this.currentTime = 0;
    this.lastinstance = lastinstance;
    this.keyframe = keyframe;
    this.instance = instance;
    this.rotation = rotation;
    this.scale = scale;
    this.translation = translation;
    this.finished = false;
    this.matrix = mat4.create();
  }

  update(t,animation) {

    this.matrix= mat4.create();

    if (this.currentTime == 0) 
    this.currentTime = t;
    
    let time = t - this.currentTime;
    
    if (time < this.lastinstance ) return 0;
    
    if (time > this.instance && this.finished == false) {
      this.finished = true;
    }
    
    this.rotation.update(time,animation,this.keyframe, this.matrix);
    this.translation.update(time, this.lastinstance, this.instance, this.matrix);
   
    return 0;
  }

  display(scene) {
    
    scene.multMatrix(this.matrix);

  }
}