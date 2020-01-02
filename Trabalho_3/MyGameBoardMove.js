class MyGameBoardMove extends CGFobject {

    constructor(scene, piece, player, board) {
        super(scene);

        this.piece = piece;
        this.player = player;
        this.board = board;
    }

    play() {
        this.piece.addAnimation();
        this.piece.changeColor(1, this.player);
    }

    getBoard() {
        return this.board;
    }

    getPiece() {
        return this.piece;
    }

}