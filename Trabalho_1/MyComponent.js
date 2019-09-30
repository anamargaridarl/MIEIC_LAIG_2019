/**
* MyComponent
* @constructor
*/
class MyComponent extends CGFobject {

    constructor(scene) {
        super(scene);

        this.textures = [];
        this.materials = [];
        this.transformations = [];
        this.children = [];

        this.textHerd = false;
        this.matHerd = false;

        this.initBuffers();
    }

    activateMathHerd() {
        this.matHerd = true;
    }

    activateTextHerd() {
        this.textHerd = true;
    }

    pushTexture(t) {
        this.textures.push(t);
    }

    setTextures(textures) {
        this.textures = textures;
    }

    getTextures() {
        return this.textures;
    }

    pushTransformation(t) {
        this.transformations.push(t);
    }

    setTransformations(transformations) {
        this.transformations = transformations;
    }

    getTransformations() {
        return this.transformations;
    }

    pushMaterial(m) {
        this.materials.push(m);
    }

    setMaterials(materials) {
        this.materials = materials;
    }

    getMaterials() {
        return this.materials;
    }

    pushChildren(p) {
        this.children.push(p);
    }

    setChildren(materials) {
        this.materials = materials;
    }

    getChildren() {
        return this.materials;
    }

};