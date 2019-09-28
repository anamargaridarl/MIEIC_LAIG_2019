class MySphere extends CGFobject {
    constructor(scene, id, radius, slices, stacks) {
        super(scene);

        this.id = id;
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = (2 * Math.PI) / this.slices;
        var teta = Math.PI / (2 * this.stacks);

        for (var st = 0; st <= this.stacks * 2; st++) {
            for (var sl = 0; sl <= this.slices; sl++) {

                var Xaux = Math.cos(phi * sl) * Math.cos(teta * st);
                var Yaux = Math.sin(phi * sl) * Math.cos(teta * st);
                var Zaux = Math.sin(teta * st);

                this.vertices.push(this.radius * Xaux, this.radius * Yaux, this.radius * Zaux);
                this.normals.push(Xaux, Yaux, Zaux);

                //this.texCoords.push((Math.cos(sl * phi) * Math.cos(teta * st) + 1) / 2, (Math.sin( phi * sl) * Math.cos(teta * sl) + 1) / 2);

            }
        }

        for (var st = 0; st < this.stacks; st++) {
            for (var sl = 0; sl < this.slices; sl++) {

                if (sl == this.slices - 1) {
                    this.indices.push(this.slices * st, this.slices * (st + 1), sl + this.slices * (st + 1));
                    this.indices.push(this.slices * st, sl + this.slices * (st + 1), sl + this.slices * st);
                } else {

                    this.indices.push(sl + this.slices * st, 1 + sl + this.slices * st, sl + this.slices * (st + 1));
                    this.indices.push(1 + sl + this.slices * st, 1 + sl + this.slices * (st + 1), sl + this.slices * (st + 1));
                }

            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
};