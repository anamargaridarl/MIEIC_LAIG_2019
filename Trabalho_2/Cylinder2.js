class Cylinder2 extends CGFobject {
  constructor(scene,base,top,hgt,slices,stacks) {
    super(scene);
    this.base = base;
    this.top = top;
    this.height = hgt;
    this.slices = slices;
    this.stacks = stacks;
    this.lid = new MyCircle(scene,slices);
    this.initBuffers();  
  }
  
  initBuffers() {
    
    const u0v0 = [-this.base,0,-this.height/2,1];
    const u0v1 = [-this.base,this.base*4/3,-this.height/2,1];
    const u0v2 = [this.base,this.base*4/3,-this.height/2,1];
    const u0v3 = [this.base,0,-this.height/2,1];

    const u1v0 = [-this.top,0,this.height/2,1];
    const u1v1 = [-this.top,this.top*4/3,this.height/2,1];
    const u1v2 = [this.top,this.top*4/3,this.height/2,1];
    const u1v3 = [this.top,0,this.height/2,1];

    const ctrlPts = [// U = 0
											[	// V = 0..4
												u0v0,
                        u0v1,
                        u0v2,
                        u0v3
                        // ,u0v4
											],
											// U = 1
											[	// V = 0..4
												u1v0,
                        u1v1,
                        u1v2,
                        u1v3
                        // ,u1v4
                      ]
										];
		
										let surface = new CGFnurbsSurface(1,3,ctrlPts);
    this.patch = new CGFnurbsObject(this.scene,this.slices,this.stacks,surface);
    this.patch.initBuffers();
  }

  display() {
    this.patch.display();
    this.scene.pushMatrix();
    // this.scene.translate(0,-this.base,0);
    this.scene.rotate(Math.PI,0,0,1);
    this.patch.display();
    this.scene.popMatrix();
  }
}