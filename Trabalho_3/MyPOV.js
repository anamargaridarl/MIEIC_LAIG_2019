const POV = Object.freeze({
  "menu" : '0',
  "player1" : '1',
  "player2" : '2'
});

class MyPOV extends CGFobject {
  constructor(scene,camera) {
    super(scene);
    this.scene = scene;
    this.camera = camera;
    this.currentPOV = POV.menu;
    this.changingPOV = false;
    this.animationTime = 1000; // in milliseconds

    this.createMenuPOV();
    this.createPlayer1POV();
    this.createPlayer2POV();
  }

  createMenuPOV() {
    this.menuCamera = {
      "near" : 0.1,
      "far" : 1000,
      "angle" : 45,
      "from" : vec4.fromValues( -30, 18, 0, 1),
      "to" : vec4.fromValues(0, 0, 0, 1)
    };

    //change scoreboards, player frames and clocks
  }

  createPlayer1POV() {
    this.player1Camera = {
      "near" : 0.1,
      "far" : 1000,
      "angle" : 45,
      "from" : vec4.fromValues( 0, 18, 30, 1),
      "to" : vec4.fromValues(0, 0, -5, 1)
    };

    //change scoreboards, player frames and clocks
  }

  createPlayer2POV() {
    this.player2Camera = {
      "near" : 0.1,
      "far" : 1000,
      "angle" : 45,
      "from" : vec4.fromValues( 0, 18, -30, 1),
      "to" : vec4.fromValues(0, 0, 5, 1)
    };

    //change scoreboards, player frames and clocks
  }

  setChangingPOV(pov,updatePeriod) {
    this.changingPOV = true;
    this.currentPOV = pov;
    const timeStep = this.animationTime/updatePeriod;
    switch(pov) {
      case POV.menu :
        this.setPOV(this.menuCamera,timeStep);
        break;
      case POV.player1 :
        this.setPOV(this.player1Camera,timeStep);
        break;
      case POV.player2 :
        this.setPOV(this.player2Camera,timeStep);
        break;
      default :
        console.warn("Invalid POV selected. Doing nothing.");
        break;
    }
  }

  setPOV(camera,timeStep) {
    const initPos = this.camera.position;
    this.finalPos = camera.from;
    this.posStep = vec3.fromValues((this.finalPos[0]-initPos[0])/timeStep, (this.finalPos[1]-initPos[1])/timeStep, (this.finalPos[2]-initPos[2])/timeStep);

    const initTarget = this.camera.target;
    this.finalTarget = camera.to;
    this.targetStep = vec3.fromValues((this.finalTarget[0]-initTarget[0])/timeStep, (this.finalTarget[1]-initTarget[1])/timeStep, (this.finalTarget[2]-initTarget[2])/timeStep);
  }

  update(camera) {
    console.log(camera.position + " " + this.finalPos + " " + this.posStep);
    if(vec3.distance(this.finalPos,camera.position) <= 0.01 || vec3.distance(this.finalTarget,camera.target) <= 0.01) {
      this.changingPOV = false;
      return camera;
    } else {
      let newPos = vec3.create(), newTarget = vec3.create();
      vec3.add(newPos,camera.position,this.posStep);
      vec3.add(newTarget,camera.target,this.targetStep);
      this.camera = new CGFcamera(DEGREE_TO_RAD * 45,0.1,1000,newPos,newTarget);
      return this.camera;
    }
  }
}