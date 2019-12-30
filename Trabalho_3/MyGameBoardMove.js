class MyGameBoardMove extends CGFobject {

    constructor(scene, piece, player) {
        super(scene);

        this.piece = piece;
        this.player = player;
    }

    play() {
        this.piece.addAnimation();
        this.piece.changeColor(1, this.player);
    }

}