class MyTriangle extends CGFobject {
	constructor(scene,id,x1,y1,z1,x2,y2,z2,x3,y3,z3) {
		super(scene);
		
		this.id = id;
		this.x1 = x1;
		this.x2 = x2;
		this.x3 = x3;
		this.y1 = y1;
		this.y2 = y2;
		this.y3 = y3;
		this.z1 = z1;
		this.z2 = z2;
		this.z3 = z3;
		
        this.b = Math.sqrt(Math.pow(this.x2 - this.x1) + Math.pow(this.y2 - this.y1) + Math.pow(this.z2 - this.z1))
        this.a =  Math.sqrt(Math.pow(this.x3 - this.x1) + Math.pow(this.y3 - this.y1) + Math.pow(this.z3 - this.z1))
        this.c =  Math.sqrt(Math.pow(this.x3 - this.x2) + Math.pow(this.y3 - this.y2) + Math.pow(this.z3 - this.z2))
		
        this.cosB = (Math.pow(this.a) - Math.pow(this.b) + Math.pow(this.a))/(2*this.a*this.c)
        this.asinB = Math.sqrt(Math.pow(this.a) - Math.pow(this.cosB*this.a))
		
        this.initBuffers();
	}
	initBuffers() {

		this.normals =[];

		this.vertices = [
			this.x1,this.y1,this.z1,
			this.x2,this.y2,this.z2,
			this.x3,this.y3,this.z3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0,1,2,
			0,2,1
		];

		var vec1_2 = vec3.fromValues(
			this.x2 - this.x1,
			this.y2 - this.y1,
			this.z2 - this.z1
		)

		var vec3_2 = vec3.fromValues(
			this.x3 - this.x3,
			this.y3 - this.y3,
			this.z3 - this.z3
		)

		var normal = vec3.create();
		vec3.cross(normal,vec1_2,vec3_2);
	

		var nsize = Math.sqrt(
			normal[0] * normal[0] +
			normal[1] * normal[1] +
			normal[2] * normal[2]
		);

		normal[0] /= nsize;
		normal[1] /= nsize;
		normal[2] /= nsize;


		this.normals.push(...normal);
		this.normals.push(...normal);
		this.normals.push(...normal);
		
		this.a = Math.sqrt(Math.pow(this.x1-this.x3,2)+Math.pow(this.y1-this.y3,2)+Math.pow(this.z1-this.z3,2));
		this.b = Math.sqrt(Math.pow(this.x2-this.x1,2)+Math.pow(this.y2-this.y1,2)+Math.pow(this.z2-this.z1,2));
		this.c = Math.sqrt(Math.pow(this.x3-this.x2,2)+Math.pow(this.y3-this.y2,2)+Math.pow(this.z3-this.z3,2));

		this.cos_beta = (Math.pow(this.a,2)-Math.pow(this.b,2)+Math.pow(this.c,2))/(2*this.a*this.c);
		this.sin_beta = Math.sqrt(1-Math.pow(this.cos_beta,2));

		//setting default texCoords where length_s=length_t=1
		this.texCoords = [
			(this.c-this.a*this.cos_beta),1-this.a*this.sin_beta,
			0,1,
			this.c,1	
		];



		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
	//NEEDS TESTING
	ajustTexCoords(length_s,length_t) {
		this.texCoords = [
			(this.c-this.a*this.cos_beta)/length_s,(length_t-this.a*this.sin_beta)/length_t,
			0,length_t,
			this.c/length_s,length_t
		];
	};
}