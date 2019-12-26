class MyGameOrchestrator extends CGFobject {

    constructor(scene, gameboard) {
        super(scene);

        this.gamesequence = [];
        this.gameboard = gameboard;
        this.initBuffers();
        this.testRequests();
    }

    async testRequests() {
        let board = await MyRequestHandler.initBoard();
        console.log(board);

        let cpumove = await MyRequestHandler.cpuMove(board.b,[],1,1);
        console.log(cpumove);

        cpumove = await MyRequestHandler.cpuMove(cpumove.board,cpumove.played,2,1);
        console.log(cpumove);

        let plays = await MyRequestHandler.getPossiblePlays(cpumove.board,cpumove.played);
        console.log(plays);

        const row = plays.poss[0][0][0];
        const column = plays.poss[0][0][1];
        console.log(row);
        let playermove = await MyRequestHandler.playerMove(cpumove.board,cpumove.played,1,row,column,-1);
        console.log(playermove);
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