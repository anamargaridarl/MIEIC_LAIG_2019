/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {

    constructor(scene, base, top, height, slices, stacks) {
		super(scene);

		this.base_radius = base;
		this.top_radius = top;
		this.height = height;
		this.slices = slices;
        this.stacks = stacks;
        this.lid = new MyCircle(scene,slices);        

		this.initBuffers();
	};
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        
        var step_angle = 2*Math.PI/this.slices;
        var step_radius=(this.top_radius-this.base_radius)/this.stacks;

        for(var i = 0; i <= this.stacks; i++) {
            
            for(var j = 0; j <= this.slices; j++){
                

                var ca=(this.base_radius + step_radius*i)*Math.cos(step_angle*j);
                var sa=(this.base_radius + step_radius*i)*Math.sin(step_angle*j);
                this.vertices.push(ca, sa, i*this.height/this.stacks);         

                this.texCoords.push(
                    j*1/this.slices, 
                    1-i*1/this.stacks
                );
                
                // push normal once for each vertex of this triangle
                this.normals.push( Math.cos(step_angle*j), Math.sin(step_angle*j),0);
            
                
            }
        }
        
        for(var i =0;i<this.stacks;i++) {
            for(var j = 0; j<this.slices;j++) {
                this.indices.push(
                    (i+1)*(this.slices+1) + j,  i*(this.slices+1) + j,i*(this.slices+1) + j+1,
                    i*(this.slices+1) + j+1,  (i+1)*(this.slices+1) + j+1, (i+1)*(this.slices+1) + j
                );
            }
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(this.base_radius,1,this.base_radius);
        this.lid.display();
        this.scene.scale(this.top_radius/this.base_radius,1,this.top_radius/this.base_radius);
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.translate(0,this.height,0);
        this.lid.display();
        this.scene.popMatrix();
        super.display();
    }
}