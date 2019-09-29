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
        this.primitives = [];
        this.components = [];

        this.initBuffers();
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

    pushPrimitive(p) {
        this.primitives.push(p);
    }

    setPrimitives(primitives) {
        this.primitives = primitives;
    }

    getPrimitives() {
        return this.primitives;
    }

    pushComponent(c) {
        this.components.push(c);
    }

    setComponents(components) {
        this.components = components;
    }

    getComponents() {
        return this.components;
    }
};