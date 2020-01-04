class MyTimer extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.pointer = new MyRectangle(scene, "pointer", -0.05, 0.05, 0, 2);
        this.body = new MyCylinder(scene, 2, 2, 0.2, 30, 30);
        this.face = new MyCircle(scene, 30);
        this.timerTex = new CGFappearance(scene);
        this.faceTex = new CGFtexture(scene, "scenes/images/timer.png");
        this.bodyTex = new CGFtexture(scene, "scenes/images/goldolympic.png");
        this.timeout = false;
        this.isCounting = false;
        this.t = 0;
        this.angle = 0;
    }

    setTimer() {
        if (!this.isCounting) {
            this.t = 0;
            this.isCounting = true;
            this.timeout = false;
            this.angle = 0;
        }
    }

    unsetTimer() {
        this.isCounting = false;
        this.t = 0;
        this.timeout = false;
    }

    update(t) {
        if (this.t == 0)
            this.t = t;
        if ((t - this.t) < 60) {
            this.angle = (t - this.t) / 60 * 2 * Math.PI;
        } else {
            this.timeout = true;
            this.isCounting = false;
        }
    }

    display() {
        this.scene.pushMatrix();

        this.scene.pushMatrix();
        this.scene.translate(11.99, 12, 0);
        this.scene.rotate(this.angle, 1, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.pointer.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(12, 12, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.timerTex.setTexture(this.bodyTex);
        this.timerTex.apply();
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(12, 12, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(2, 1, 2);
        this.timerTex.setTexture(this.faceTex);
        this.timerTex.apply();
        this.face.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}