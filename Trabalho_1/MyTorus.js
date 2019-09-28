class MyTorus extends CGFobject {
    constructor(scene,inner,outer,slices,loops) {
        super(scene);
        
        this.inner = inner;
        this.outer = outer;
        this.slices = slices;
        this.loops = loops;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        let outer_angle = 2*Math.PI/this.slices;
        let inner_angle = 2*Math.PI/this.loops;
        for(let i = 0; i<=this.slices; i++) {
            for(let j =0; j<=this.loops;j++) {
                this.vertices.push( Math.cos(i*outer_angle)*(this.outer + this.inner*Math.cos(j*inner_angle)), //x
                                    Math.sin(i*outer_angle)*(this.outer + this.inner*Math.cos(j*inner_angle)),//y
                                    this.inner*Math.sin(j*inner_angle));//z

                this.normals.push(  Math.cos(i*outer_angle) * Math.cos(j*inner_angle),
                                    Math.sin(i*outer_angle) * Math.cos(j*inner_angle),
                                    0);

                this.texCoords.push(i/this.slices,1-j/this.loops);
            }
        }

        for(let i = 0; i<this.slices; i++) {
            for(let j = 0; j<this.loops; j++) {
                this.indices.push(
					(i+1)*(this.loops+1) + j, i*(this.loops+1) + j+1, i*(this.loops+1) + j,
					i*(this.loops+1) + j+1, (i+1)*(this.loops+1) + j, (i+1)*(this.loops+1) + j+1
				);
            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}