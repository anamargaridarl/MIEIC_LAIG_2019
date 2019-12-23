/**
 * MyCylinder
 * @constructor
 */
class MyPiece extends CGFobject {

    constructor(scene, id, piece) {
        super(scene);

        this.id = id;
        //color 0 --> transparent
        //color 1 --> color player1
        //color 2 --> color player2
        this.color = 0;
        this.piece = piece;

        this.initBuffers();
    };

    //step = 1 --> next 
    //step = 0 --> undo
    changeColor(step, player) {
        if (step == 1) {
            if (this.color == 1)
                return "Already played piece";
            else
                this.color = player;
        } else {
            if (this.color == 0)
                return "Piece still wasn't played ";
            else
                this.color = 0;
        }

    }

    applyColor() {
        this.piece.changeCurrentMaterialIndex(this.color);
    }

    applyAnimation(animation) {

    }


}