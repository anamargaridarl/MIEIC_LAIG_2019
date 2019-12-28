class MyGameOrchestrator extends CGFobject {

    constructor(scene, gameboard, p1, p2) {
        super(scene);

        this.gamesequence = [];
        this.gameboard = gameboard;
        this.initBuffers();
        this.prolog = new MyProlog(scene);
        this.points = new MyPoints(scene, p1, p2);

    }

    display() {
        let possibleplays = this.prolog.getPossiblePlays();
        this.gameboard.registerPicking(possibleplays);
        this.gameboard.display();
        this.points.display();
    }

    play(id) {
        //fetch information from gameboard
        let coord = this.gameboard.getPlayPiece(id);
        let piece = this.gameboard.getPiece(coord[0], coord[1], coord[2]);
        //actions in selected piece
        let seqPiece = new MyGameBoardMove(this.scene, piece, this.prolog.player);
        seqPiece.play();
        this.gamesequence.push(seqPiece);
        //update points 
        this.points.addPoints(this.prolog.player);
        //actions passed to prolog
        this.prolog.addplay(coord[0], coord[1], coord[2]);
        console.log(this.prolog.getPossiblePlays());
    }

    update(t) {
        this.gameboard.update(t);
    }


}