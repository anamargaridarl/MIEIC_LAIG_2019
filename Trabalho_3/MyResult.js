class MyResult extends CGFobject {

    constructor(scene, result) {
        super(scene);

        this.result = result;
        this.createNumbersTex();
    }

    display() {
        this.scene.pushMatrix();
        this.result.display();
        this.scene.popMatrix();

    }

    setTex(player, state) {

        switch (state) {
            case 0:
                if (player == 1) {
                    this.result.children[4].texture = this.tex[2];
                    this.result.children[5].texture = this.tex[0];
                } else {
                    this.result.children[4].texture = this.tex[0];
                    this.result.children[5].texture = this.tex[2];
                }
                break;
            case 1:
                this.result.children[4].texture = this.tex[3];
                this.result.children[5].texture = this.tex[3];
                break;
        }
    }

    createNumbersTex() {
        this.tex = {};
        this.tex[0] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/winner1.jpg") };
        this.tex[1] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/winner2.jpg") };
        this.tex[2] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/loose.jpg") };
        this.tex[3] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/tie.jpg") };
    }


}