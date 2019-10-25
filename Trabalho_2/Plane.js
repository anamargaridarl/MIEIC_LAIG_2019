class Plane extends CGFobject {
  constructor(scene,npartsU,npartsV) {
    super(scene);
    const controlPts = this.getCtrlPts(npartsU,npartsV);
    const surface = new CGFnurbsSurface(1,1,controlPts);
    this.plane = new CGFnurbsObject(scene,npartsU,npartsV,surface);
    this.initBuffers();
  }

  getCtrlPts(npartsU,npartsV) {
    let pts = [];
    const step_i = 1/npartsV;
    const step_j = 1/npartsU;

    for(let i = 0; i<1; i+=step_i) {
      let pts_v = [];
      for(let j = 0; j<1; j+=step_j) {
        pts_v.push(i-0.5,0,0.5-j);
      }
      pts.push(pts_v);
    }

    return pts;
  }

  initBuffers() {
    this.plane.initBuffers();
  }

  display() {
    this.plane.display();
  }

}