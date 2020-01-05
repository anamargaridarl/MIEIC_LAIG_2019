class MyResult extends CGFobject {

    constructor(scene, result) {
        super(scene);

        this.theme;
        this.result = result;
        this.createNumbersTex();
    }

    setTheme() {
        this.theme = this.scene.graph.filename;
    }
    display() {
        this.scene.pushMatrix();
        this.result.display();
        this.scene.popMatrix();

    }

    setTex(player, state) {

        if (this.theme == "game.xml") {
            switch (state) {
                case 1:
                    this.result.children[4].texture = this.tex[0];
                    this.result.children[5].texture = this.tex[2];
                    break;
                case 2:

                    this.result.children[4].texture = this.tex[2];
                    this.result.children[5].texture = this.tex[1];
                    break;
                case 3:
                    this.result.children[4].texture = this.tex[3];
                    this.result.children[5].texture = this.tex[3];
                    break;
            }
        } else if (this.theme == "game2.xml") {
            switch (state) {
                case 1:
                    this.result.children[4].texture = this.tex[5];
                    this.result.children[5].texture = this.tex[6];
                    break;
                case 2:

                    this.result.children[4].texture = this.tex[6];
                    this.result.children[5].texture = this.tex[4];
                    break;
                case 3:
                    this.result.children[4].texture = this.tex[7];
                    this.result.children[5].texture = this.tex[7];
                    break;
            }

        }
    }


    createNumbersTex() {
        this.tex = {};
        this.tex[0] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/winner1.jpg") };
        this.tex[1] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/winner2.jpg") };
        this.tex[2] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/loose.jpg") };
        this.tex[3] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/tie.jpg") };

        this.tex[4] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/winnerspace1.jpg") };
        this.tex[5] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/winnerspace2.jpg") };
        this.tex[6] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/lostsapce.jpg") };
        this.tex[7] = { s: 1, t: 1, tex_t: new CGFtexture(this.scene, "scenes/images/tiespace.jpg") };

    }


}