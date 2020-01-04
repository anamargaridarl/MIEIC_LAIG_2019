const GAME_STATE = Object.freeze({
    "menu": 0,
    "playing": 1,
    "game_over": 2,
    "game_movie": 3
});

const LEVELS = Object.freeze({
    "easy": '1',
    "hard": '2',
});

//used for movie function
let i = 0;

class MyGameOrchestrator extends CGFobject {

    constructor(scene, gameboard, p1, p2, end) {
        super(scene);

        this.gameState = GAME_STATE.menu;
        //GameBoardMove objects
        this.gamesequence = [];
        //GameBoard object
        this.gameboard = gameboard;
        this.prolog = new MyProlog(scene);
        this.points = new MyPoints(scene, p1, p2);
        this.result = new MyResult(scene, end);
        /*Stores possible pieces to play in the round
            - used to know which pieces to register for picking*/
        this.possibleplays;
        this.initBuffers();

        this.timer = new MyTimer(scene, this.scene.graph.components["Pointer"]);

        //used in movie function
        this.gamesequenceLength = 0;
    }

    async init() {
        this.prolog.initBoard();
        this.possibleplays = await this.prolog.getPossiblePlays();
    }

    display() {
        if (this.gameState != GAME_STATE.playing)
            this.gameboard.display([]);
        else
            this.gameboard.display(this.possibleplays);
        this.points.display();
        if (this.gameState == GAME_STATE.playing)
            this.timer.display();

        if (this.gameState == GAME_STATE.tie || this.gameState == GAME_STATE.game_over)
            this.result.display();
    }

    async processState(state) {
        switch (state) {
            case 0:
                break;
            case 1:
                this.gameState = GAME_STATE.tie;
                this.result.setTex(-1, 1);
                this.timer.unsetTimer();
                this.gameboard.cleanHighlight(this.possibleplays);
                this.possibleplays = [];
                break;
            case 2:
                this.gameState = GAME_STATE.game_over;
                this.result.setTex(this.prolog.player, 0);
                this.timer.unsetTimer();
                this.gameboard.cleanHighlight(this.possibleplays);
                this.possibleplays = [];
                break;
        }
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
        this.processState(state);
        this.gameboard.changePlayer(this.prolog.player);
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
        if (this.timer.isCounting) this.timer.update(t);
        if (this.timer.timeout) this.processState(GAME_STATE.game_over)
    }

    async undo() {
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

        this.possibleplays = await this.prolog.getPossiblePlays();

    }


    movieSequence() {

        if (i >= this.gamesequenceLength)
            clearInterval();
        else {
            this.gamesequence[i].play();
            i++;
        }

    }

    movie() {
        this.gameState = GAME_STATE.game_movie;
        this.possibleplays = [];
        this.cleanBoard();
        this.gamesequenceLength = this.gamesequence.length;

        window.setInterval(function movieSequence(gamesequenceLength, gamesequence) {
            if (i >= gamesequenceLength)
                clearInterval();
            else {
                gamesequence[i].play();
                i++;
            }
        }, 1500, this.gamesequenceLength, this.gamesequence);

    }

    cleanBoard() {
        for (let i = 0; i < this.gamesequence.length; i++) {
            this.gamesequence[i].piece.cleanPiece();
        }
    }
}