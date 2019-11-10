/**
 * Animation
 * @constructor
 */
class KeyFrameAnimation extends Animation {
  constructor(keyframe, lastintance, instance, rotation, translation, scale) {
    super();
    this.currentTime = 0;
    this.lastintance = lastintance;
    this.keyframe = keyframe;
    this.instance = instance;
    this.rotation = rotation;
    this.scale = scale;
    this.translation = translation;
    this.finished = false;
    this.start = false;
  }

  update(t) {


    if(this.start)
    this.matrix =  mat4.create();

    if (this.currentTime == 0) 
      this.currentTime = t;

    let time = t - this.currentTime;

    if (time < this.lastintance) return;
    if (time > this.instance) {
      this.finished = true;
      return;
    }

    this.rotation.update(time, this.lastintance, this.instance, this.matrix);
    this.translation.update(time, this.lastintance, this.instance, this.matrix);
    // this.scale.update(t,this.t);
    this.start = true;
  }

  display(scene) {

    if(this.finished)
      return;
    scene.multMatrix(this.matrix);
  }
}