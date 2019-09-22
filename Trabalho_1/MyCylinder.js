/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
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

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var ca=Math.cos(ang);
            var sa=Math.sin(ang);
            var caa=Math.cos(ang+alphaAng);
            var saa=Math.sin(ang+alphaAng);
            this.vertices.push(ca, 0, sa);
            this.vertices.push(caa, 0, saa);
            this.vertices.push(caa,1,saa);            
            this.vertices.push(ca,1,sa);            

            this.texCoords.push(
                i*1/this.slices, 0,
                (i+1)*1/this.slices,0,
                i*1/this.slices, 1,
                (i+1)*1/this.slices, 1
            );
            
            // triangle normal computed by cross product of two edges
            
            var normal = [
                Math.cos(ang+alphaAng),
                0,
                Math.sin(ang + alphaAng)
            ];

            var normal1 = [
                Math.cos(ang),
                0,
                Math.sin(ang)
            ];

            // push normal once for each vertex of this triangle
            this.normals.push(...normal1);
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal1);
           
            this.indices.push(  4*i, (4*i+2) , (4*i+1),
                                (4*i+3), (4*i +2),(4*i));

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}