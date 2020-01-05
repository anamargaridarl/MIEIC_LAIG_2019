class MyProlog {

    constructor(scene) {
        this.scene = scene
        this.player = 1;
        this.alreadyplayed = [];
        this.gamestate = 0;
        this.board = [];

    }

    async undo(board) {
        this.board = board;
        this.alreadyplayed.shift();
        this.changePlayer();
    }

    async getPoints() {
        return [this.player1Points, this.player2Points];
    }

    getBoard() {
        return this.board;
    }

    async getPossiblePlays() {
        const plays = await MyRequestHandler.getPossiblePlays(this.board, this.alreadyplayed);
        this.possibleplays = plays.poss;
        return this.possibleplays;
    }

    async initBoard() {
        const auxboard = await MyRequestHandler.initBoard();
        this.board = auxboard.b;
    }

    changePlayer() {
        if (this.player == 1) {
            this.player = 2;
        } else {
            this.player = 1;
        }
    }

    async addplay(row, column, T) {
        let playermove = await MyRequestHandler.playerMove(this.board, this.alreadyplayed, this.player, row, column, T);
        this.board = playermove.board;
        this.alreadyplayed = playermove.played;
        this.gamestate = playermove.state;
        this.changePlayer();
        return playermove.state;
    }

    async addplayCPU(level) {
        let cpumove = await MyRequestHandler.cpuMove(this.board, this.alreadyplayed, this.player, level);
        this.board = cpumove.board;
        this.alreadyplayed = cpumove.played;
        this.gamestate = cpumove.state;
        this.changePlayer();
        return [cpumove.state, this.alreadyplayed[0]];
    }

}