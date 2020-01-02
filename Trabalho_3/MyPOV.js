const POV = Object.freeze({
  "menu" : 0,
  "player1" : 1,
  "player2" : 2
});

class MyPOV extends CGFobject {
  constructor(scene,camera) {
    this.scene = scene;
    this.camera = camera;
    this.currentPOV = POV.menu;
    this.changingPOV = false;

    this.createMenuPOV();
    this.createPlayer1POV();
    this.createPlayer2POV();
  }

  createMenuPOV() {
    this.menuCamera = {
      "near" : 0.1,
      "far" : 1000,
      "angle" : 45,
      "from" : new Vec4( -30, 18, 0, 1),
      "to" : new Vec4(0, 0, 0, 1)
    };

    //change scoreboards, player frames and clocks
  }

  createPlayer1POV() {
    this.player1Camera = {
      "near" : 0.1,
      "far" : 1000,
      "angle" : 45,
      "from" : new Vec4( 0, 18, 30, 1),
      "to" : new Vec4(0, 0, -5, 1)
    };

    //change scoreboards, player frames and clocks
  }

  createPlayer2POV() {
    this.player2Camera = {
      "near" : 0.1,
      "far" : 1000,
      "angle" : 45,
      "from" : new Vec4( 0, 18, -30, 1),
      "to" : new Vec4(0, 0, 5, 1)
    };

    //change scoreboards, player frames and clocks
  }

  setPOV(pov) {
    if(this.currentPOV != pov) {
      switch(pov) {
        case POV.menu :
          this.setMenuPOV();
          break;
        case POV.player1 :
          this.setPlayer1POV();
          break;
        case POV.player2 :
          this.setPlayer2POV();
          break;
        default :
          console.warn("Invalid POV selected. Doing nothing.");
          break;
      }
      this.currentPOV = pov;
    } else {
      console.warn("Already in selected POV. Doing nothing.");
    }
  }

  setMenuPOV() {
    const initPos = this.camera.position;
    const finalPos = this.menuCamera.from;
    const animateTime = 2000; // in miliseconds
    const posStep = new Vec4(Math.abs(finalPos[0]-initPos[0])/animateTime, Math.abs(finalPos[1]-initPos[1])/animateTime, Math.abs(finalPos[2]-initPos[2])/animateTime,0);

    const initTarget = this.camera.target;
    const finalTarget = this.menuCamera.to;
    const targetStep = new Vec4(Math.abs(finalTarget[0]-initTarget[0])/animateTime, Math.abs(finalTarget[1]-initTarget[1])/animateTime, Math.abs(finalTarget[2]-initTarget[2])/animateTime, 0);

    while(!(this.camera.position.equals(finalPos,0.001) || this.camera.target.equals(finalTarget,0.001))) {
      let newPos;
      add(newPos,this.camera.position,posStep);
      let newTarget;
      add(newTarget,this.camera.target,targetStep);

      this.camera.setPosition(newPos);
      this.camera.setTarget(newTarget);
      sleep(1);
    }

  }

  setPlayer1POV() {
    const initPos = this.camera.position;
    const finalPos = this.player1Camera.from;
    const animateTime = 2000; // in miliseconds
    const posStep = new Vec4(Math.abs(finalPos[0]-initPos[0])/animateTime, Math.abs(finalPos[1]-initPos[1])/animateTime, Math.abs(finalPos[2]-initPos[2])/animateTime,0);

    const initTarget = this.camera.target;
    const finalTarget = this.player1Camera.to;
    const targetStep = new Vec4(Math.abs(finalTarget[0]-initTarget[0])/animateTime, Math.abs(finalTarget[1]-initTarget[1])/animateTime, Math.abs(finalTarget[2]-initTarget[2])/animateTime, 0);

    while(!(this.camera.position.equals(finalPos,0.001) || this.camera.target.equals(finalTarget,0.001))) {
      let newPos;
      add(newPos,this.camera.position,posStep);
      let newTarget;
      add(newTarget,this.camera.target,targetStep);

      this.camera.setPosition(newPos);
      this.camera.setTarget(newTarget);
      sleep(1);
    }
  }

  setPlayer2POV() {
    const initPos = this.camera.position;
    const finalPos = this.player2Camera.from;
    const animateTime = 2000; // in miliseconds
    const posStep = new Vec4(Math.abs(finalPos[0]-initPos[0])/animateTime, Math.abs(finalPos[1]-initPos[1])/animateTime, Math.abs(finalPos[2]-initPos[2])/animateTime,0);

    const initTarget = this.camera.target;
    const finalTarget = this.player2Camera.to;
    const targetStep = new Vec4(Math.abs(finalTarget[0]-initTarget[0])/animateTime, Math.abs(finalTarget[1]-initTarget[1])/animateTime, Math.abs(finalTarget[2]-initTarget[2])/animateTime, 0);

    while(!(this.camera.position.equals(finalPos,0.001) || this.camera.target.equals(finalTarget,0.001))) {
      let newPos;
      add(newPos,this.camera.position,posStep);
      let newTarget;
      add(newTarget,this.camera.target,targetStep);

      this.camera.setPosition(newPos);
      this.camera.setTarget(newTarget);
      sleep(1);
    }
  }

}