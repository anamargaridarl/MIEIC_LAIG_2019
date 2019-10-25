class Patch extends CGFobject {
  constructor(scene,nptsU,nptsV,nprtsU,nprtsV) {
    super(scene);
    this.nptsU = nptsU;
    this.nptsV = nptsV;
    this.nprtsU = nprtsU;
    this.nprtsV = nprtsV;
  }

  makeSurface(controlPts) {
    const surface = new CGFnurbsSurface(this.nptsU-1,this.nptsV-1,controlPts);
    this.patch = new CGFnurbsObject(this.scene,this.nprtsU,this.nprtsV,surface);
    this.initBuffers();
  }

  initBuffers() {
    this.patch.initBuffers();
  }

  display() {
    this.patch.display();
  }
}