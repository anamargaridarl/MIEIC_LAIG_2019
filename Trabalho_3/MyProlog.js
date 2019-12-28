class MyProlog extends CGFobject {

    constructor(scene) {
        super(scene);

        this.initBuffers();
        this.player = 1;
        this.player1Points = 0;
        this.player2Points = 0;
        this.alreadyplayed = [];
        this.gamestate = 0;
        this.board;
        this.possibleplays = [];
        this.initBoard();
    }

    async getPoints() {
        return [this.player1Points, this.player2Points];

    }

    async getBoard() {
        return this.board;

    }

    async getPossiblePlays() {
        let plays = await MyRequestHandler.getPossiblePlays(this.board, this.alreadyplayed);
        this.possibleplays = plays.poss;
        return this.possibleplays;
    }

    async initBoard() {
        let auxboard = await MyRequestHandler.initBoard();
        this.board = auxboard.b;
    }

    async testRequests() {
        let board = await MyRequestHandler.initBoard();
        console.log(board);

        let cpumove = await MyRequestHandler.cpuMove(board.b, [], 1, 1);
        console.log(cpumove);

        cpumove = await MyRequestHandler.cpuMove(cpumove.board, cpumove.played, 2, 1);
        console.log(cpumove);

        let plays = await MyRequestHandler.getPossiblePlays(cpumove.board, cpumove.played);
        console.log(plays);

        const row = plays.poss[0][0][0];
        const column = plays.poss[0][0][1];
        console.log(row);
        let playermove = await MyRequestHandler.playerMove(cpumove.board, cpumove.played, 1, row, column, -1);
        console.log(playermove);
    }


    changePlayer() {
        if (this.player == 1) {
            this.player1Points++;
            this.player = 2;
        } else {
            this.player2Points++;
            this.player = 1;
        }
    }

    async addplay(row, column, T) {
        let playermove = await MyRequestHandler.playerMove(this.board, [], this.player, row, column, T);
        this.board = playermove.board;
        this.alreadyplayed = playermove.played;
        this.gamestate = playermove.state;
        this.changePlayer();

    }


}