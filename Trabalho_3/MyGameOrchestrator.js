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
        //GameBoardMove objects
        this.gamesequence = [];
        //GameBoard object
        this.gameboard = gameboard;
        this.prolog = new MyProlog(scene);
        this.points = new MyPoints(scene, p1, p2);
        /*Stores possible pieces to play in the round
            - used to know which pieces to register for picking*/
        this.possibleplays;
        this.initBuffers();
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
        let state = await this.prolog.addplay(coord[0] + 1, coord[1] + 1, coord[2]);


        //get possible pieces to play for next round
        this.possibleplays = await this.prolog.getPossiblePlays();

        return this.prolog.player;

    }

    async playCPU() {

        //fetch information for this play move
        let lastBoard = this.prolog.board;
        let player = this.prolog.player;

        //play action in prolog
        //      -returns state and already played pieces
        let result = await this.prolog.addplayCPU();

        //piece played in this round
        let pieceProlog = result[1];
        let state = result[0];
        //fetch gameboard piece based on the "prolog piece"
        let piece = this.gameboard.getPieceFromProlog(pieceProlog);

        //save gamemove and actions in board
        let seqPiece = new MyGameBoardMove(this.scene, piece, player, lastBoard);
        seqPiece.play();

        this.gamesequence.push(seqPiece);

        //update points 
        this.points.addPoints(player);

        //get possible pieces to play for next round
        this.possibleplays = await this.prolog.getPossiblePlays();

        return this.prolog.player;
    }

    update(t) {
        this.gameboard.update(t);
    }

    undo() {
        //Fetch information from last move
        this.lastMove = this.gamesequence.pop();
        let lastBoard = this.lastMove.getBoard();
        let lastPiece = this.lastMove.getPiece();
        let lastPlayer = this.lastMove.getPlayer();
        //Undo the prolog information
        this.prolog.undo(lastBoard);
        //Update points
        this.points.undo(lastPlayer);
        //Clean color piece in the board displayed
        lastPiece.cleanPiece();
    }

    movie() {
        this.gameState = GAME_STATE.game_movie;
    }
}