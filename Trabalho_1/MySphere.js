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

        var phi = 2*Math.PI / this.slices;
        var teta = 2*Math.PI /this.stacks;

        for (var st = 0; st <= this.stacks; st++) {
            for (var sl = 0; sl <= this.slices; sl++) {

                var Xaux = Math.cos(phi * sl) * Math.cos(teta * st);
                var Yaux = Math.sin(phi * sl) * Math.cos(teta * st);
                var Zaux = Math.sin(teta * st);

                this.vertices.push(this.radius * Xaux, this.radius * Yaux, this.radius * Zaux);
                this.normals.push(Xaux, Yaux, Zaux);

                this.texCoords.push((this.radius*Xaux+this.radius)/(2*this.radius), 
                                    1-(this.radius*Yaux+this.radius)/(2*this.radius));

            }
        }

        for (var st = 0; st < this.stacks; st++) {
            for (var sl = 0; sl < this.slices; sl++) {
                this.indices.push(1 + sl + (this.slices+1) * st, sl + (this.slices +1) * st, sl + (this.slices +1) * (st + 1));
                this.indices.push(1 + sl + (this.slices +1) * st, sl + (this.slices +1) * (st + 1), 1 + sl + (this.slices +1) * (st + 1));

            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
};