/**
 * Animation
 * @constructor
 */
class Animation {
  constructor(keyframes) {
    this.keyframes = keyframes;

    if (keyframes != null)
      this.length = keyframes.length;
    else
      this.length = 0;
  }

  display(scene) {
    for (let i = 0; i < this.keyframes.length; i++) {
      this.keyframes[i].display(scene);
    }
  }

  update(t) {
    if (this.keyframes[this.length - 1].finished != true) {
      for (let i = 0; i < this.keyframes.length; i++) {
        this.keyframes[i].update(t, this);
      }
    }
  }
}