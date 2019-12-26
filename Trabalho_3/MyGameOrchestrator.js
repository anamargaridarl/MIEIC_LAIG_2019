class MyGameOrchestrator extends CGFobject {

    constructor(scene, gameboard) {
        super(scene);

        this.gamesequence = [];
        this.gameboard = gameboard;
        this.initBuffers();

    };

    display() {
        this.gameboard.display();
        //test function
        // this.gameboard.changeColor();
    }

    //test function
    changeColor(id) {
        this.gameboard.changeColorId(id);
    }

    update(t) {
        this.gameboard.update(t);
    }


}