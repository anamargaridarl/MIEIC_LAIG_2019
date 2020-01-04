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


    getPieceFromProlog(piece) {
        let row = piece[0][0];
        let column = piece[0][1];
        let id = piece[1][1];

        if (id == 3 || id == 5)
            return this.getPiece(row, column, 0);
        else if (id == 4 || id == 6)
            return this.getPiece(row, column, 1);
        else
            return this.getPiece(row, column, -1);

    }


    getPiece(row, column, T) {
        if (T != -1)
            return this.pieces[row][column][T];
        else
            return this.pieces[row][column]
    }

    cleanHighlight(possibleplays) {
        for (let i = 0; i < possibleplays.length; i++) {
            let piece = this.getPieceFromProlog(possibleplays[i]);
            piece.cleanHighlight();
        }
    }

    changePlayer(player) {
            for (let row = 0; row < 10; row++) {
                for (let col = 0; col < 10; col++) {
                    if (Array.isArray(this.pieces[row][col])) {
                        this.pieces[row][col][0].changePlayer(player);
                        this.pieces[row][col][1].changePlayer(player);
                    } else
                        this.pieces[row][col].changePlayer(player);
                }
            }
        }
        /* Get information of the selected piece in the board
            -returns an array with row, column and id 
                                                    (0 - upper triangle
                                                     1 - lower triangle
                                                     -1 - other piece */
    getPlayPiece(id) {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (Array.isArray(this.pieces[row][col])) {
                    if (this.pieces[row][col][0].id == id) {
                        return [row, col, 0];
                    } else if (this.pieces[row][col][1].id == id) {
                        return [row, col, 1];;
                    }
                } else if (this.pieces[row][col].id == id) {
                    return [row, col, -1];;
                }
            }
        }
    }

    /* ------------------------- Display functions ---------------------*/

    verifyregisterPicking(possibleplays, id_piece) {
        if (possibleplays == undefined) return false;
        for (let i = 0; i < possibleplays.length; i++) {
            let piece;
            let row = possibleplays[i][0][0];
            let col = possibleplays[i][0][1];
            let id = possibleplays[i][1][1];
            if (id == 3 || id == 5)
                piece = this.pieces[row - 1][col - 1][0];
            else if (id == 4 || id == 6)
                piece = this.pieces[row - 1][col - 1][1];
            else
                piece = this.pieces[row - 1][col - 1];

            if (piece.id == id_piece) return true;
        }

        return false;
    }


    display(possibleplays) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.translate(transfMatrix, transfMatrix, [-11, 0.01, -8]);
        transfMatrix = mat4.scale(transfMatrix, transfMatrix, [2, 2, 2]);
        this.scene.multMatrix(transfMatrix);
        this.displayRectangles(this.pieces, possibleplays);
        for (let row = 1; row < 9; row++) {
            for (let col = 1; col < 9; col++) {
                this.applyTransformation(row, col, this.pieces[row][col], possibleplays);
            }
        }
        this.scene.popMatrix();
    }

    applyTransformation(row, col, unit, possibleplays) {
        if (Array.isArray(unit)) {
            this.scene.pushMatrix();
            let transfMatrix = mat4.create();
            mat4.translate(transfMatrix, transfMatrix, [col, 0, row]);
            this.scene.multMatrix(transfMatrix);
            if (this.verifyregisterPicking(possibleplays, unit[0].id)) {
                this.scene.registerForPick(unit[0].id, unit[0]);
                unit[0].setHighlight();
                unit[0].display();
                this.scene.clearPickRegistration();
            } else {
                unit[0].display();
            }

            this.scene.popMatrix();
            this.scene.pushMatrix();
            let transfMatrix2 = mat4.create();
            mat4.translate(transfMatrix2, transfMatrix2, [col, 0, row]);
            this.scene.multMatrix(transfMatrix2);
            if (this.verifyregisterPicking(possibleplays, unit[1].id)) {
                this.scene.registerForPick(unit[1].id, unit[1]);
                unit[1].setHighlight();
                unit[1].display();
                this.scene.clearPickRegistration();
            } else {
                unit[1].display();
            }
            this.scene.popMatrix();
        } else {
            this.scene.pushMatrix();
            let transfMatrix = mat4.create();
            mat4.translate(transfMatrix, transfMatrix, [col, 0, row]);
            this.scene.multMatrix(transfMatrix);
            if (this.verifyregisterPicking(possibleplays, unit.id)) {
                this.scene.registerForPick(unit.id, unit);
                unit.setHighlight();
                unit.display();
                this.scene.clearPickRegistration();
            } else {
                unit.display();
            }
            this.scene.popMatrix();
        }
    }

    applyTransformationRectangle1(unit, possibleplays) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.rotateY(transfMatrix, transfMatrix, 90 * DEGREE_TO_RAD);
        mat4.translate(transfMatrix, transfMatrix, [-4, 0, 1]);
        this.scene.multMatrix(transfMatrix);
        if (this.verifyregisterPicking(possibleplays, unit.id)) {
            this.scene.registerForPick(unit.id, unit);
            unit.setHighlight();
            unit.display();
            this.scene.clearPickRegistration();
        } else {
            unit.display();
        }

        this.scene.popMatrix();
    }

    applyTransformationRectangle2(unit, possibleplays) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.translate(transfMatrix, transfMatrix, [1, 0, 0]);
        this.scene.multMatrix(transfMatrix);
        if (this.verifyregisterPicking(possibleplays, unit.id)) {
            this.scene.registerForPick(unit.id, unit);
            unit.setHighlight();
            unit.display();
            this.scene.clearPickRegistration();
        } else {
            unit.display();
        }

        this.scene.popMatrix();
    }

    applyTransformationRectangle3(unit, possibleplays) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.translate(transfMatrix, transfMatrix, [5, 0, 0]);
        this.scene.multMatrix(transfMatrix);
        if (this.verifyregisterPicking(possibleplays, unit.id)) {
            this.scene.registerForPick(unit.id, unit);
            unit.setHighlight();
            unit.display();
            this.scene.clearPickRegistration();
        } else {
            unit.display();
        }

        this.scene.popMatrix();
    }

    applyTransformationRectangle4(unit, possibleplays) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.rotateY(transfMatrix, transfMatrix, 90 * DEGREE_TO_RAD);
        mat4.translate(transfMatrix, transfMatrix, [-4, 0, 10]);
        this.scene.multMatrix(transfMatrix);
        if (this.verifyregisterPicking(possibleplays, unit.id)) {
            this.scene.registerForPick(unit.id, unit);
            unit.setHighlight();
            unit.display();
            this.scene.clearPickRegistration();
        } else {
            unit.display();
        }
        this.scene.popMatrix();
    }

    applyTransformationRectangle5(unit, possibleplays) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.rotateY(transfMatrix, transfMatrix, 90 * DEGREE_TO_RAD);
        mat4.translate(transfMatrix, transfMatrix, [-9, 0, 10]);
        this.scene.multMatrix(transfMatrix);
        if (this.verifyregisterPicking(possibleplays, unit.id)) {
            this.scene.registerForPick(unit.id, unit);
            unit.setHighlight();
            unit.display();
            this.scene.clearPickRegistration();
        } else {
            unit.display();
        }
        this.scene.popMatrix();
    }

    applyTransformationRectangle6(unit, possibleplays) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.translate(transfMatrix, transfMatrix, [5, 0, 9]);
        this.scene.multMatrix(transfMatrix);
        if (this.verifyregisterPicking(possibleplays, unit.id)) {
            this.scene.registerForPick(unit.id, unit);
            unit.setHighlight();
            unit.display();
            this.scene.clearPickRegistration();
        } else {
            unit.display();
        }
        this.scene.popMatrix();
    }

    applyTransformationRectangle7(unit, possibleplays) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.translate(transfMatrix, transfMatrix, [0, 0, 9]);
        this.scene.multMatrix(transfMatrix);
        if (this.verifyregisterPicking(possibleplays, unit.id)) {
            this.scene.registerForPick(unit.id, unit);
            unit.setHighlight();
            unit.display();
            this.scene.clearPickRegistration();
        } else {
            unit.display();
        }
        this.scene.popMatrix();
    }

    applyTransformationRectangle8(unit, possibleplays) {
        this.scene.pushMatrix();
        let transfMatrix = mat4.create();
        mat4.rotateY(transfMatrix, transfMatrix, 90 * DEGREE_TO_RAD);
        mat4.translate(transfMatrix, transfMatrix, [-8, 0, 1]);
        this.scene.multMatrix(transfMatrix);
        if (this.verifyregisterPicking(possibleplays, unit.id)) {
            this.scene.registerForPick(unit.id, unit);
            unit.setHighlight();
            unit.display();
            this.scene.clearPickRegistration();
        } else {
            unit.display();
        }
        this.scene.popMatrix();
    }

    displayRectangles(pieces, possibleplays) {
        this.applyTransformationRectangle1(pieces[0][0], possibleplays);
        this.applyTransformationRectangle2(pieces[0][1], possibleplays);
        this.applyTransformationRectangle3(pieces[0][6], possibleplays);
        this.applyTransformationRectangle4(pieces[1][9], possibleplays);
        this.applyTransformationRectangle5(pieces[6][9], possibleplays);
        this.applyTransformationRectangle6(pieces[9][8], possibleplays);
        this.applyTransformationRectangle7(pieces[9][0], possibleplays);
        this.applyTransformationRectangle8(pieces[6][0], possibleplays);
    }

    /* -----------------------Update animations of pieces ------------------------*/

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
}