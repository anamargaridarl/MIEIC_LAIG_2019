/**
 * Animation
 * @constructor
 */
class KeyFrameAnimation extends Animation {

  constructor(currentTime, keyframe,instance, transformations) {
    super(currentTime);
    this.keyframe = keyframe;
    this.instance = instance;
    this.transformations = transformations;
  }

  getKeyFrame()
  {
    return this.keyframe;
  }

  getInstance()
  {
    return this.instance;
  }

  isFinished()
  {
    if(this.currentTime > this.instance)
      return true;
    else 
      return false;
  }

  rotationInter()
  {
    
  } 


}