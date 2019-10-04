/**
* MyComponent
* @constructor
*/
class MyComponent extends CGFobject {

    constructor(scene, children, materials, texture, transformation) {
        super(scene);
        this.children = children;
        this.materials = materials;
        this.texture = texture;
        this.transformation = transformation;
        this.currMatIndex = 0;
    }
    
    display(textureP,materialP) {
        
        if(this.transformation) {
            this.scene.multMatrix(this.transformation);
        }

        if(this.materials[this.currMatIndex] == "inherit") {                                                                         
            if(this.texture == "inherit") {                                     
                materialP.setTexture(textureP);                                     
            }                                     
            else if (this.texture == "none") {                                     
                materialP.setTexture(null);                                     
            }                                     
            else {                                     
                materialP.setTexture(this.texture.tex_t);                                     
            }                                     
            materialP.apply();                                     
        }                                     
        else {                                     
            if(this.texture == "inherit") {                                     
                this.materials[this.currMatIndex].setTexture(textureP);                                     
            }                                     
            else if (this.texture == "none") {                                     
                this.materials[this.currMatIndex].setTexture(null);                                     
            }                                     
            else {                                     
                this.materials[this.currMatIndex].setTexture(this.texture.tex_t);                                     
            }                                     
            this.materials[this.currMatIndex].apply();                                     
        }                                     

        let texP = (this.texture == "inherit") ? textureP: this.texture;
        let matP = (this.materials[this.currMatIndex] == "inherit") ? materialP : this.materials[this.currMatIndex];
        for( let children of this.children) {
            //check if is component
            if(children instanceof MyComponent) {
                this.scene.pushMatrix();
                children.display(texP,matP);
                this.scene.popMatrix();
            }
            else { // or primitive
                if(children.updateTexCoords != null) { //if has function to update texCoords (eg: Triangle & Rectangle)
                    children.updateTexCoords(this.texture.s,this.texture.t);
                }
                children.display();
            }
        }
    }

    updateMaterial() {
        this.currMatIndex = (this.currMatIndex+1) % this.materials.length;

        for(let child of this.children) {
            child.updateMaterial();
        }
    }

};