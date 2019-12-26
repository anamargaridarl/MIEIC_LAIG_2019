class MyGameOrchestrator extends CGFobject {

    constructor(scene, gameboard) {
        super(scene);

        this.gamesequence = [];
        this.gameboard = gameboard;
        this.initBuffers();
        this.buildBoard();
    }

    async buildBoard() {
        let board = await MyRequestHandler.initBoard();
        console.log(board);
    }

    display() {
        this.gameboard.display();
        //test function
        this.gameboard.changeColor();
        
    }

    //test function
    changeColor(id) {
        this.gameboard.changeColorId(id);
    }


}