/**
 * MyCylinder
 * @constructor
 */
class MyPiece extends CGFobject {

    constructor(scene, id, piece) {
        super(scene);

        //color 0 --> transparent
        //color 1 --> color player1
        //color 2 --> color player2
        this.color = 0;
        this.id = id;
        this.piece = piece;
        this.animation = null;
        this.original = scene;
        this.initBuffers();
    };

    display() {

        if (this.animation != null) {
            this.scene = this.original;
            this.animation.display(this.scene);
        }

        this.piece.display();
    }

    updateAnimation(t) {
        if (this.animation != null)
            this.animation.update(t);
    }

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

    addAnimation() {
        let keyframes = [];
        let translation = new MyTranslation(0, 1, 0);
        let scale = new MyScale(1.5, 1.5, 1.5);
        let rotation = new MyRotation(this.scene, 0, 0, 0);
        keyframes.push(new KeyFrameAnimation(1, 0, 2, rotation, translation, scale));
        let animation = new Animation(keyframes);
        this.animation = animation;
    }


}