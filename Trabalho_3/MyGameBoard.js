/**
 * MyCylinder
 * @constructor
 */

var DEGREE_TO_RAD = Math.PI / 180;

class MyGameBoard extends CGFobject {

    constructor(scene, pieces) {
        super(scene);

        this.pieces = pieces;

        this.initBuffers();
    };

    getPiece(row, column) {
        return this.pieces[row][column];
    }

    //test function
    //sim isto esta esparguete mas e so para ver se funciona
    changeColorId(id) {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (Array.isArray(this.pieces[row][col])) {
                    if (this.pieces[row][col][0].id == id) {
                        this.pieces[row][col][0].addAnimation();
                        this.pieces[row][col][0].changeColor(1, 1);
                        return;
                    } else if (this.pieces[row][col][1].id == id) {
                        this.pieces[row][col][1].addAnimation();
                        this.pieces[row][col][1].changeColor(1, 1);
                        return;
                    }
                } else if (this.pieces[row][col].id == id) {
                    this.pieces[row][col].addAnimation();
                    this.pieces[row][col].changeColor(1, 1);
                    return;
                }
            }
        }
    }


    updateAnimationRectangles(t) {

        this.pieces[0][0].updateAnimation(t);
        this.pieces[0][1].updateAnimation(t);
        this.pieces[0][6].updateAnimation(t);
        this.pieces[1][9].updateAnimation(t);
        this.pieces[6][9].updateAnimation(t);
        this.pieces[9][8].updateAnimation(t);
        this.pieces[9][0].updateAnimation(t);
        this.pieces[6][0].updateAnimation(t);
    }

    updateAnimation(t) {
        for (let row = 1; row < 9; row++) {
            for (let col = 1; col < 9; col++) {
                if (Array.isArray(this.pieces[row][col])) {
                    this.pieces[row][col][0].updateAnimation(t);
                    this.pieces[row][col][1].updateAnimation(t);
                } else
                    this.pieces[row][col].updateAnimation(t);
            }
        }

        this.updateAnimationRectangles(t);
    }

    update(t) {
        this.updateAnimation(t);
    }

    display() {

        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.translate(transfMatrix, transfMatrix, [-11, 0.01, -8]);
        transfMatrix = mat4.scale(transfMatrix, transfMatrix, [2, 2, 2]);
        this.scene.multMatrix(transfMatrix);
        this.displayRectangles(this.pieces);
        for (let row = 1; row < 9; row++) {
            for (let col = 1; col < 9; col++) {
                this.applyTransformation(row, col, this.pieces[row][col]);
            }
        }
        this.scene.popMatrix();

    }


    applyTransformation(row, col, unit) {

        if (Array.isArray(unit)) {
            this.scene.pushMatrix();
            let transfMatrix = mat4.create();
            mat4.translate(transfMatrix, transfMatrix, [col, 0, row]);
            this.scene.multMatrix(transfMatrix);
            this.scene.registerForPick(unit[0].id, unit[0]);
            unit[0].display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            let transfMatrix2 = mat4.create();
            mat4.translate(transfMatrix2, transfMatrix2, [col, 0, row]);
            this.scene.multMatrix(transfMatrix2);
            this.scene.registerForPick(unit[1].id, unit[1]);
            unit[1].display();
            this.scene.popMatrix();
        } else {
            this.scene.pushMatrix();
            let transfMatrix = mat4.create();
            mat4.translate(transfMatrix, transfMatrix, [col, 0, row]);
            this.scene.multMatrix(transfMatrix);
            this.scene.registerForPick(unit.id, unit);
            unit.display();
            this.scene.popMatrix();
        }
    }

    applyTransformationRectangle1(unit) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.rotateY(transfMatrix, transfMatrix, 90 * DEGREE_TO_RAD);
        mat4.translate(transfMatrix, transfMatrix, [-4, 0, 1]);
        this.scene.multMatrix(transfMatrix);
        this.scene.registerForPick(unit.id, unit);
        unit.display();
        this.scene.popMatrix();
    }

    applyTransformationRectangle2(unit) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.translate(transfMatrix, transfMatrix, [1, 0, 0]);
        this.scene.multMatrix(transfMatrix);
        this.scene.registerForPick(unit.id, unit);
        unit.display();
        this.scene.popMatrix();
    }

    applyTransformationRectangle3(unit) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.translate(transfMatrix, transfMatrix, [5, 0, 0]);
        this.scene.multMatrix(transfMatrix);
        this.scene.registerForPick(unit.id, unit);
        unit.display();
        this.scene.popMatrix();
    }

    applyTransformationRectangle4(unit) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.rotateY(transfMatrix, transfMatrix, 90 * DEGREE_TO_RAD);
        mat4.translate(transfMatrix, transfMatrix, [-4, 0, 10]);
        this.scene.multMatrix(transfMatrix);
        this.scene.registerForPick(unit.id, unit);
        unit.display();
        this.scene.popMatrix();
    }

    applyTransformationRectangle5(unit) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.rotateY(transfMatrix, transfMatrix, 90 * DEGREE_TO_RAD);
        mat4.translate(transfMatrix, transfMatrix, [-9, 0, 10]);
        this.scene.multMatrix(transfMatrix);
        this.scene.registerForPick(unit.id, unit);
        unit.display();
        this.scene.popMatrix();
    }

    applyTransformationRectangle6(unit) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.translate(transfMatrix, transfMatrix, [5, 0, 9]);
        this.scene.multMatrix(transfMatrix);
        this.scene.registerForPick(unit.id, unit);
        unit.display();
        this.scene.popMatrix();
    }

    applyTransformationRectangle7(unit) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.translate(transfMatrix, transfMatrix, [0, 0, 9]);
        this.scene.multMatrix(transfMatrix);
        this.scene.registerForPick(unit.id, unit);
        unit.display();
        this.scene.popMatrix();
    }

    applyTransformationRectangle8(unit) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.rotateY(transfMatrix, transfMatrix, 90 * DEGREE_TO_RAD);
        mat4.translate(transfMatrix, transfMatrix, [-8, 0, 1]);
        this.scene.multMatrix(transfMatrix);
        this.scene.registerForPick(unit.id, unit);
        unit.piece.display();
        this.scene.popMatrix();
    }

    displayRectangles(pieces) {
        this.applyTransformationRectangle1(pieces[0][0]);
        this.applyTransformationRectangle2(pieces[0][1]);
        this.applyTransformationRectangle3(pieces[0][6]);
        this.applyTransformationRectangle4(pieces[1][9]);
        this.applyTransformationRectangle5(pieces[6][9]);
        this.applyTransformationRectangle6(pieces[9][8]);
        this.applyTransformationRectangle7(pieces[9][0]);
        this.applyTransformationRectangle8(pieces[6][0]);
    }

}