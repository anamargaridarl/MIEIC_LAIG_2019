class MyPoints extends CGFobject {

    constructor(scene, p1, p2) {
        super(scene);

        this.points1 = 0;
        this.points2 = 0;
        this.p1 = p1;
        this.p2 = p2;
        //.
    }

    display() {
        this.scene.pushMatrix();
        this.p1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.p2.display();
        this.scene.popMatrix();

    }

    addPoints(player) {
        if (player == 1)
            this.points1++;
        else
            this.points2++;

        console.log(this.points1);
    }

}