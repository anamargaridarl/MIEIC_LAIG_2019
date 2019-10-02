/**
* MyCircle
* @constructor
*/
class MyCircle extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        
        for(var i = 0; i <= this.slices; i++){

            var coords = [Math.cos(ang), 0, -Math.sin(ang)];
            this.vertices.push(...coords);
            this.texCoords.push(coords[0]*0.5+0.5,coords[2]*0.5+0.5);
            this.indices.push(i, (i+1) % this.slices, this.slices+1,
                                i, this.slices+1,(i+1) % this.slices);
            this.normals.push(0, 1, 0);
            ang+=alphaAng;
        }
        
        this.vertices.push(0,0,0);
        this.normals.push(0,1,0);
        this.texCoords.push(0.5,0.5);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}