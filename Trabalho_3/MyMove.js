class MyMove extends CGFobject {

    constructor(scene, piece, player, step) {
        super(scene);

        this.piece = piece;
        this.player = player;

        this.initBuffers();
    };


    applyAnimation(animation) {
        this.piece.applyAnimation(animation);
    }
}