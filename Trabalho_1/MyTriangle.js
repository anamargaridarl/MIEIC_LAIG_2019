class MyTriangle extends CGFobject {
	constructor(scene,id,coord) {
		super(scene);
        this.initBuffers();
        this.coord = [...coord];
        /*coord - x1,y1,z1,x2,y2,z2,x3,y3,z3*/

        this.b = Math.sqrt(Math.pow(this.coord[3] - this.coord[0]) + Math.pow(this.coord[4] - this.coord[1]) + Math.pow(this.coord[5] - this.coord[2]))
        this.a =  Math.sqrt(Math.pow(this.coord[6] - this.coord[0]) + Math.pow(this.coord[7] - this.coord[1]) + Math.pow(this.coord[8] - this.coord[2]))
        this.c =  Math.sqrt(Math.pow(this.coord[6] - this.coord[3]) + Math.pow(this.coord[7] - this.coord[4]) + Math.pow(this.coord[8] - this.coord[5]))
    
        this.cosB = (Math.pow(this.a) - Math.pow(this.b) + Math.pow(this.a))/(2*this.a*this.c)
        this.asinB = Math.sqrt(Math.pow(this.a) - Math.pow(this.cosB*this.a))
    }
	initBuffers() {
		this.vertices = [
			this.coord[0], this.coord[1], this.coord[2],	//0
			this.coord[3], this.coord[4], this.coord[5],	//1
			this.coord[6], this.coord[7], this.coord[8],	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0,2,1
		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1
		]
		this.texCoords = [
			
		]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}