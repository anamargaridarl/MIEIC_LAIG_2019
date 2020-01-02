class MyPoints extends CGFobject {

    constructor(scene, p1, p2) {
        super(scene);

        this.points1 = 0;
        this.points2 = 0;
        this.p1 = p1;
        this.p2 = p2;
        this.createNumbersTex();
        this.setScoreTex(this.points1, this.points2);
    }

    display() {
        this.scene.pushMatrix();
        this.p1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.p2.display();
        this.scene.popMatrix();

    }

    setScoreTex(points1, points2) {
        let pts1 = "00" + points1;
        pts1 = pts1.substr(pts1.length - 2);
        console.log("left: " + parseInt(pts1[0]) + " right: " + parseInt(pts1[1]));
        this.p1.children[0].children[5].children[1].texture = this.numbersTex[parseInt(pts1[0])];
        this.p1.children[0].children[5].children[2].texture = this.numbersTex[parseInt(pts1[1])];

        let pts2 = "00" + points2;
        pts2 = pts2.substr(pts2.length - 2);

        this.p2.children[0].children[5].children[1].texture = this.numbersTex[parseInt(pts2[0])];
        this.p2.children[0].children[5].children[2].texture = this.numbersTex[parseInt(pts2[1])];

    }

    addPoints(player) {
        if (player == 1)
            this.points1++;
        else
            this.points2++;

        this.setScoreTex(this.points1, this.points2);

    }

    undo(player) {
        if (player == 1)
            this.points1--;
        else
            this.points2--;

        this.setScoreTex(this.points1, this.points2);
    }

    createNumbersTex() {
        this.numbersTex = {};
        this.numbersTex[0] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/0.png") };
        this.numbersTex[1] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/1.png") };
        this.numbersTex[2] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/2.png") };
        this.numbersTex[3] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/3.png") };
        this.numbersTex[4] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/4.png") };
        this.numbersTex[5] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/5.png") };
        this.numbersTex[6] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/6.png") };
        this.numbersTex[7] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/7.png") };
        this.numbersTex[8] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/8.png") };
        this.numbersTex[9] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/9.png") };
    }


}