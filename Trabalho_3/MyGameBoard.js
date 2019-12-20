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

    applyTransformation(row, col, piece) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.translate(transfMatrix, transfMatrix, [row, 0, col]);
        this.scene.multMatrix(transfMatrix);
        piece.display();
        this.scene.popMatrix();
    }

    display() {

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                this.applyTransformation(row, col, this.pieces[row][col]);
            }
        }
    }

}