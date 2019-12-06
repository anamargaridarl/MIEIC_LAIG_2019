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
        var teta = Math.PI /(2*this.stacks);

        for (var st = 0; st <= 2*this.stacks; st++) {
            for (var sl = 0; sl <= this.slices; sl++) {

                var Xaux = Math.cos(phi * sl) * Math.sin(teta * st);
                var Yaux = Math.sin(phi * sl) * Math.sin(teta * st);
                var Zaux = -Math.cos(teta * st);

                this.vertices.push(this.radius * Xaux, this.radius * Yaux, this.radius * Zaux);
                this.normals.push(Xaux, Yaux, Zaux);
                
                this.texCoords.push((phi*sl)/(2*Math.PI),
                1-(teta*st)/(Math.PI));
              
            }
        }

        for (var st = 0; st < 2*this.stacks; st++) {
            for (var sl = 0; sl < this.slices; sl++) {
                this.indices.push((this.slices+1) * st + sl, (this.slices +1) * st + sl + 1,(this.slices +1) * (st+1) + sl);
                this.indices.push((this.slices +1) * st + sl + 1,(this.slices +1) * (st + 1) + sl +1,(this.slices +1) * (st + 1) + sl);

            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
};