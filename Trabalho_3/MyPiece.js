/**
 * MyCylinder
 * @constructor
 */
class MyPiece extends CGFobject {

    constructor(scene, id, color, piece) {
        super(scene);

        //color 0 --> transparent
        //color 1 --> color
        this.color = 0;
        this.piece = piece;

        this.initBuffers();
    };

    //step = 1 --> next 
    //step = 0 --> undo
    changeColor(step) {
        if (step == 1) {
            if (this.color == 1)
                return "Already played piece";
            else
                this.color = 1;
        } else {
            if (this.color == 0)
                return "Piece still wasn't played ";
            else
                this.color = 0;
        }
    }


}