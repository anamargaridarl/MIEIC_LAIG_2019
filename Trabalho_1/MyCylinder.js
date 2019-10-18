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

        //Calculo auxiliar para Normal no eixo Z
        const base_vec = [this.base_radius,0,0];
        const side_vec = [this.base_radius-this.top_radius,0,this.height];
        const base_vec_l = this.base_radius;
        const side_vec_l = Math.sqrt(Math.pow(this.base_radius-this.top_radius,2)+Math.pow(this.height,2));
        const dot_product = base_vec[0]*side_vec[0] + base_vec[1]*side_vec[1] + base_vec[2]*side_vec[2];
        const cos_side = dot_product/(base_vec_l*side_vec_l); // the slope of the normal

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
                
                // push normal once for each vertex of this cylinder
                this.normals.push( Math.cos(step_angle*j)/Math.sqrt(1+Math.pow(cos_side,2)), Math.sin(step_angle*j)/Math.sqrt(1+Math.pow(cos_side,2)),cos_side/Math.sqrt(1+Math.pow(cos_side,2)));
            
                
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