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
        this.initBuffers();
    };

    display() {

        if (this.animation != null) {
            this.animation.display(this.scene);
        }

        this.applyColor();
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
        let translation1 = new MyTranslation(0, 0.2, 0);
        let scale1 = new MyScale(1.1, 1.1, 1.1);
        let translation2 = new MyTranslation(0, 0.03, 0);
        let scale2 = new MyScale(0.85, 0.85, 0.85);
        let rotation = new MyRotation(this.scene, 0, 0, 0);
        keyframes.push(new KeyFrameAnimation(1, 0, 2, rotation, translation1, scale1));
        keyframes.push(new KeyFrameAnimation(2, 2, 4, rotation, translation2, scale2));
        let animation = new Animation(keyframes);
        this.animation = animation;
    }


}