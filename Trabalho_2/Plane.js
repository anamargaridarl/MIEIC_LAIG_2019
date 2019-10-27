class Plane extends CGFobject {
  constructor(scene,npartsU,npartsV) {
    super(scene);
    this.npartsU = npartsU;
    this.npartsV = npartsV;
    this.initBuffers();
  }
  
  initBuffers() {
    
    let ctrlPts = [ // U = 0
                    [ // V = 0..1
                      [-0.5,0,0.5,1],
                      [-0.5,0,-0.5,1]
                    ],
                    // U = 1
                    [ // V = 0..1
                      [0.5,0,0.5,1],
                      [0.5,0,-0.5,1]
                    ]
                  ];
    
    var surface = new CGFnurbsSurface(1,1,ctrlPts);
    this.plane = new CGFnurbsObject(this.scene,this.npartsU,this.npartsV,surface);
    this.plane.initBuffers();
  }

  display() {
    this.plane.display();
  }

}