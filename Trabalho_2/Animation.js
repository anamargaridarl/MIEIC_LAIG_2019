/**
 * Animation
 * @constructor
 */
class Animation {

  constructor(currentTime) {
    this.currentTime = currentTime;
  }

  //update state based on time passed
  update(deltaTime) {
    this.currentTime += deltaTime;
  }

  //apply transformation to matrix scene
  apply() {
    

  }

}