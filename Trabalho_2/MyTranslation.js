class MyTranslation {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

  }

  update(t,lastinstance,instance,matrix)
  {
    let per = 1 - ( (instance-t)/(instance-lastinstance));
    //console.log(per);

    if(per != 0)
    {
    let divX = this.x * per;
    let divY = this.y *  per;
    let divZ = this.z *  per;
    
    var position = [];
    position.push(...[divX,divY, divZ]);
    matrix = mat4.translate(matrix, matrix, [divX,divY,divZ]);
    }
    
  }
}