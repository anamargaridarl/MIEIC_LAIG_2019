class MyGameOrchestrator extends CGFobject {

    constructor(scene, gameboard) {
        super(scene);

        this.gamesequence = [];
        this.gameboard = gameboard;
        this.initBuffers();

    };

    display() {
        this.gameboard.display();
        this.gameboard.changeColor();
    }

    changeColor(id) {
        this.gameboard.changeColorId(id);
    }

    registerPickables() {
        this.gameboard.registerPickables();
    }

}