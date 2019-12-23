class MyGameOrchestrator extends CGFobject {

    constructor(scene, gameboard) {
        super(scene);

        this.gamesequence = [];
        this.gameboard = gameboard;
        this.initBuffers();

    };

    display() {
        this.gameboard.display();
    }

}