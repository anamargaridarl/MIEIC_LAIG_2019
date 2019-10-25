class Patch extends CGFobject {
  constructor(scene,nptsU,nptsV,nprtsU,nprtsV) {
    super(scene);
    this.nptsU = nptsU;
    this.nptsV = nptsV;
    this.nprtsU = nprtsU;
    this.nprtsV = nprtsV;
  }

  setCtrlPts(controlPts) {
    this.ctrlPts = controlPts;
  }
}