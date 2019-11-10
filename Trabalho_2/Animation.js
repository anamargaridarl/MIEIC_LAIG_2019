/**
 * Animation
 * @constructor
 */
class Animation {

  constructor(keyframes) {
    this.keyframes = keyframes;
    this.matrix = mat4.create();

  }
  
  display(scene)
  {
    for(let i = 0; i < this.keyframes.length; i++)
    {
      this.keyframes[i].display(scene);
    }
  }

  update(t)
  {
  
    for(let i = 0; i < this.keyframes.length; i++)
    {
      this.keyframes[i].update(t);
    }
  }

}