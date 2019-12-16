/**
 * MyCylinder
 * @constructor
 */
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

}