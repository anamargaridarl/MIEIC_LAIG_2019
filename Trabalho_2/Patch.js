class Patch extends CGFobject {
  constructor(scene,nptsU,nptsV,nprtsU,nprtsV,controlPts) {
    super(scene);
    this.nptsU = nptsU;
    this.nptsV = nptsV;
    this.nprtsU = nprtsU;
    this.nprtsV = nprtsV;
    this.controlPoints = controlPts;
    this.initBuffers();
  }
  
  initBuffers() {
    const surface = new CGFnurbsSurface(this.nptsU-1,this.nptsV-1,this.controlPoints);
    this.patch = new CGFnurbsObject(this.scene,this.nprtsU,this.nprtsV,surface);
    this.patch.initBuffers();
  }

  display() {
    this.patch.display();
  }
}