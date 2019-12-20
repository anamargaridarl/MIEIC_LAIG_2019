/**
 * MyComponent
 * @constructor
 */
class MyComponent {

    constructor(scene, children, materials, texture, transformation, animation) {
        this.scene = scene;
        this.original = scene;
        this.children = children;
        this.materials = materials;
        this.texture = texture;
        this.transformation = transformation;
        this.currMatIndex = 0;
        this.animation = animation;


    }

    display(textureP, materialP) {

        if (this.animation != null) {
            this.scene = this.original;
            this.animation.display(this.scene);
        }

        if (this.transformation) {
            this.scene.multMatrix(this.transformation);
        }

        if (this.materials[this.currMatIndex] == "inherit") {
            if (this.texture.tex_t == "inherit") {
                materialP.setTexture(this.getParentTexture(textureP));
            } else if (this.texture.tex_t == "none") {
                materialP.setTexture(null);
            } else {
                materialP.setTexture(this.texture.tex_t);
            }
            materialP.apply();
        } else {
            if (this.texture.tex_t == "inherit") {
                this.materials[this.currMatIndex].setTexture(this.getParentTexture(textureP));
            } else if (this.texture.tex_t == "none") {
                this.materials[this.currMatIndex].setTexture(null);
            } else {
                this.materials[this.currMatIndex].setTexture(this.texture.tex_t);
            }
            this.materials[this.currMatIndex].apply();
        }

        let texP = (this.texture.tex_t == "inherit") ? textureP : this.texture;
        let matP = (this.materials[this.currMatIndex] == "inherit") ? materialP : this.materials[this.currMatIndex];
        for (let children of this.children) {
            //check if is component
            if (children instanceof MyComponent) {
                this.scene.pushMatrix();
                children.display(texP, matP);
                this.scene.popMatrix();
            } else { // or primitive
                if (children.updateTexCoords != null) { //if has function to update texCoords (eg: Triangle & Rectangle)
                    children.updateTexCoords(texP.s, texP.t);
                }
                children.display();
            }
        }

    }

    getParentTexture(texStruct) {
        if (texStruct.tex_t == "none")
            return null;
        else
            return texStruct.tex_t;
    }

    updateMaterial() {
        this.currMatIndex = (this.currMatIndex + 1) % this.materials.length;

        for (let child of this.children) {
            if (child instanceof MyComponent)
                child.updateMaterial();
        }
    }

    updateAnimation(t) {
        if (this.animation)
            this.animation.update(t, this.scene);

        for (let child of this.children) {
            if (child instanceof MyComponent)
                child.updateAnimation(t, this.scene);
        }
    }

};