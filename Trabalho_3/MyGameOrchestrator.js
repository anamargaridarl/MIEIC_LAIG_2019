const GAME_STATE = Object.freeze({
    "menu": 0,
    "playing": 1,
    "game_over": 2,
    "game_movie": 3
});



class MyGameOrchestrator extends CGFobject {

    constructor(scene, gameboard, p1, p2) {
        super(scene);

        this.gameState = GAME_STATE.menu;
        this.gamesequence = [];
        this.gameboard = gameboard;
        this.initBuffers();
        this.prolog = new MyProlog(scene);
        this.points = new MyPoints(scene, p1, p2);
        this.possibleplays;
    }

    async init() {
        this.prolog.initBoard();
        this.possibleplays = await this.prolog.getPossiblePlays();
    }

    async display() {
        this.gameboard.display(this.possibleplays);
        this.points.display();
    }

    async play(id) {
        //fetch information from gameboard
        let coord = this.gameboard.getPlayPiece(id);
        let piece = this.gameboard.getPiece(coord[0], coord[1], coord[2]);
        //actions in selected piece
        let seqPiece = new MyGameBoardMove(this.scene, piece, this.prolog.player, this.prolog.board);
        seqPiece.play();
        this.gamesequence.push(seqPiece);
        //update points 
        this.points.addPoints(this.prolog.player);
        //actions passed to prolog
        await this.prolog.addplay(coord[0] + 1, coord[1] + 1, coord[2]);
        this.possibleplays = await this.prolog.getPossiblePlays();
    }

    update(t) {
        this.gameboard.update(t);
    }

    undo() {
        this.lastMove = this.gamesequence.pop();
        let lastBoard = this.lastMove.getBoard();
        let lastPiece = this.lastMove.getPiece();
        let lastPlayer = this.lastMove.getPlayer();
        this.prolog.undo(lastBoard);
        this.points.undo(lastPlayer);
        lastPiece.cleanPiece();
    }



}