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
                    this.result.children[0].texture = this.tex[1];
                    this.result.children[1].texture = this.tex[0];
                } else {
                    this.result.children[0].texture = this.tex[0];
                    this.result.children[1].texture = this.tex[1];
                }
                break;
            case 1:
                this.result.children[0].texture = this.tex[2];
                this.result.children[1].texture = this.tex[2];
                break;
        }
    }

    createNumbersTex() {
        this.tex = {};
        this.tex[0] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/winner.png") };
        this.tex[1] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/looser.png") };
        this.tex[2] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/tie.png") };
    }


}