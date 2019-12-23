/**
 * MyCylinder
 * @constructor
 */

var DEGREE_TO_RAD = Math.PI / 180;

class MyGameBoard extends CGFobject {

    constructor(scene, pieces) {
        super(scene);

        //pieces is already an array of arrays
        this.pieces = pieces;

        this.initBuffers();
    };

    getPiece(row, column) {
        return this.pieces[row][column];
    }

    applyTransformation(row, col, unit) {

        if (Array.isArray(unit)) {
            this.scene.pushMatrix();
            let transfMatrix = mat4.create();
            mat4.translate(transfMatrix, transfMatrix, [col, 0, row]);
            this.scene.multMatrix(transfMatrix);
            unit[0].piece.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            let transfMatrix2 = mat4.create();
            mat4.translate(transfMatrix2, transfMatrix2, [col, 0, row]);
            this.scene.multMatrix(transfMatrix2);
            unit[1].piece.display();
            this.scene.popMatrix();
        } else {
            this.scene.pushMatrix();
            let transfMatrix = mat4.create();
            mat4.translate(transfMatrix, transfMatrix, [col, 0, row]);
            this.scene.multMatrix(transfMatrix);
            unit.piece.display();
            this.scene.popMatrix();
        }
    }

    applyTransformationRectangle(row, col, unit) {
        this.scene.pushMatrix();
        unit.piece.display();
        this.scene.popMatrix();
    }

    displayRectangles(pieces) {
        this.applyTransformationRectangle(0, 0, pieces[0][0]);
        this.applyTransformationRectangle(1, 0, pieces[1][0]);
    }

    display() {

        this.displayRectangles(this.pieces);
        for (let row = 1; row < 9; row++) {
            for (let col = 1; col < 9; col++) {
                this.applyTransformation(row, col, this.pieces[row][col]);
            }
        }

    }

}