class MyRotation {
    constructor(scene, angle_x, angle_y, angle_z) {
        this.scene = scene;
        this.angle_x = angle_x;
        this.angle_y = angle_y;
        this.angle_z = angle_z;
    }

    calcRotation(axis, angle, transfMatrix) {
        switch (axis) {
            case 'x':
                transfMatrix =
                    mat4.rotateX(transfMatrix, transfMatrix, angle * DEGREE_TO_RAD);
                break;
            case 'y':
                transfMatrix =
                    mat4.rotateY(transfMatrix, transfMatrix, angle * DEGREE_TO_RAD);
                break;
            case 'z':
                transfMatrix =
                    mat4.rotateZ(transfMatrix, transfMatrix, angle * DEGREE_TO_RAD);
                break;
        }
    }

    update(t, animation, keyframe, matrix) {

        let instance = animation.keyframes[keyframe - 1].instance;
        let lastinstance = animation.keyframes[keyframe - 1].lastinstance;

        let per = 1 - ((instance - t) / (instance - lastinstance));
        if (per > 1)
            per = 1;
        let a_x = 0;
        let a_y = 0;
        let a_z = 0;

        if (keyframe > 1) {
            let n = keyframe - 2;
            a_x = animation.keyframes[n].rotation.angle_x;
            a_y = animation.keyframes[n].rotation.angle_y;
            a_z = animation.keyframes[n].rotation.angle_z;
        }

        let divX = (this.angle_x - a_x) * per;
        this.calcRotation('x', divX, matrix);

        let divY = (this.angle_y - a_y) * per;
        this.calcRotation('y', divY, matrix);


        let divZ = (this.angle_z - a_z) * per;
        this.calcRotation('z', divZ, matrix);

    }
}