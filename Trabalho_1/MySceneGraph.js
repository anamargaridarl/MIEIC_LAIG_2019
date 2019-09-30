var DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var SCENE_INDEX = 0;
var VIEWS_INDEX = 1;
var AMBIENT_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var TRANSFORMATIONS_INDEX = 6;
var PRIMITIVES_INDEX = 7;
var COMPONENTS_INDEX = 8;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * @constructor
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        this.nodes = [];
        this.components = [];

        this.idRoot = null;                    // The id of the root element.

        this.views = [];

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "lxs")
            return "root tag <lxs> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <scene>
        var index;
        if ((index = nodeNames.indexOf("scene")) == -1)
            return "tag <scene> missing";
        else {
            if (index != SCENE_INDEX)
                this.onXMLMinorError("tag <scene> out of order " + index);

            //Parse scene block
            if ((error = this.parseScene(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseView(nodes[index])) != null)
                return error;
        }

        // <ambient>
        if ((index = nodeNames.indexOf("ambient")) == -1)
            return "tag <ambient> missing";
        else {
            if (index != AMBIENT_INDEX)
                this.onXMLMinorError("tag <ambient> out of order");

            //Parse ambient block
            if ((error = this.parseAmbient(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }
        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <transformations>
        if ((index = nodeNames.indexOf("transformations")) == -1)
            return "tag <transformations> missing";
        else {
            if (index != TRANSFORMATIONS_INDEX)
                this.onXMLMinorError("tag <transformations> out of order");

            //Parse transformations block
            if ((error = this.parseTransformations(nodes[index])) != null)
                return error;
        }

        // <primitives>
        if ((index = nodeNames.indexOf("primitives")) == -1)
            return "tag <primitives> missing";
        else {
            if (index != PRIMITIVES_INDEX)
                this.onXMLMinorError("tag <primitives> out of order");

            //Parse primitives block
            if ((error = this.parsePrimitives(nodes[index])) != null)
                return error;
        }

        // <components>
        if ((index = nodeNames.indexOf("components")) == -1)
            return "tag <components> missing";
        else {
            if (index != COMPONENTS_INDEX)
                this.onXMLMinorError("tag <components> out of order");

            //Parse components block
            if ((error = this.parseComponents(nodes[index])) != null)
                return error;

            this.components.push(null)
        }
        this.log("all parsed");
    }

    /**
     * Parses the <scene> block. 
     * @param {scene block element} sceneNode
     */
    parseScene(sceneNode) {

        // Get root of the scene.
        var root = this.reader.getString(sceneNode, 'root')
        if (root == null)
            return "no root defined for scene";

        this.idRoot = root;

        // Get axis length        
        var axis_length = this.reader.getFloat(sceneNode, 'axis_length');
        if (axis_length == null)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        this.referenceLength = axis_length || 1;

        this.log("Parsed scene");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {view block element} viewsNode
     */
    parseView(viewsNode) {
        var children = [];
        var grandChildren = [];
        var nodeNames = []; //grandchildren names

        children = viewsNode.children;

        this.cameras = []
        //FOR US TO DO:
        //check if there is one view at least
        if (children == null)
            return "no view available"; //error or return?

        //check for a valid default view 
        //need checking?     <views default="defaultCamera">

        //in a loop parse all views
        //create camera struct (different for 'perspective' and 'ortho'), adding it to the map
        for (var i = 0; i < children.length; i++) {

            grandChildren = children[i].children;

            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            if (children[i].nodeName != "perspective" && children[i].nodeName != "ortho") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            var angle = this.reader.getFloat(children[i], 'angle')
            var near = this.reader.getFloat(children[i], 'near')
            var far = this.reader.getFloat(children[i], 'far')


            if (children[i].nodeName == "perspective") {

                var fromIndex = nodeNames.indexOf("from");
                var toIndex = nodeNames.indexOf("to");

                var from = this.parseCoordinates3D(grandChildren[fromIndex], "the FROM perpective");
                var to = this.parseCoordinates3D(grandChildren[toIndex], "the TO perspective");

                var camerap = new CGFcamera(angle, near, far, from, to)
                this.views[children[i].id] = camerap;
            }
            else if (children[i].nodeName == "ortho") {

                var left = this.reader.getFloat(children[i], 'left')
                var right = this.reader.getFloat(children[i], 'right')
                var bottom = this.reader.getFloat(children[i], 'bottom')
                var top = this.reader.getFloat(children[i], 'top')

                var fromIndex = nodeNames.indexOf("from");
                var toIndex = nodeNames.indexOf("to");
                var upIndex = nodeNames.indexOf("up");

                var from = this.parseCoordinates3D(grandChildren[fromIndex], "the FROM perpective");
                var to = this.parseCoordinates3D(grandChildren[toIndex], "the TO perspective");

                if (upIndex == null)
                    var up = vec3.fromValues(0, 1, 0)
                else
                    var up = this.parseCoordinates3D(grandChildren[upIndex], "the UP perspective");

                var camerao = new CGFcameraOrtho(left, right, bottom, top, near, far, from, to, up)
                this.views[children[i].id] = camerao;
            }

        }
        return null;
    }

    /**
     * Parses the <ambient> node.
     * @param {ambient block element} ambientsNode
     */
    parseAmbient(ambientsNode) {

        var children = ambientsNode.children;

        this.ambient = [];
        this.background = [];

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var ambientIndex = nodeNames.indexOf("ambient");
        var backgroundIndex = nodeNames.indexOf("background");

        var color = this.parseColor(children[ambientIndex], "ambient");
        if (!Array.isArray(color))
            return color;
        else
            this.ambient = color;

        color = this.parseColor(children[backgroundIndex], "background");
        if (!Array.isArray(color))
            return color;
        else
            this.background = color;

        this.log("Parsed ambient");

        return null;
    }

    /**
     * Parses the <light> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {
        var children = lightsNode.children;

        this.lights = [];
        var numLights = 0;

        var grandChildren = [];
        var nodeNames = [];

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "omni" && children[i].nodeName != "spot") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                attributeNames.push(...["location", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["position", "color", "color", "color"]);
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            // Light enable/disable
            var enableLight = true;
            var aux = this.reader.getBoolean(children[i], 'enabled');
            if (!(aux != null && !isNaN(aux) && (aux == true || aux == false)))
                this.onXMLMinorError("unable to parse value component of the 'enable light' field for ID = " + lightId + "; assuming 'value = 1'");

            enableLight = aux || 1;

            //Add enabled boolean and type name to light info
            global.push(enableLight);
            global.push(children[i].nodeName);

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "position")
                        var aux = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID" + lightId);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID" + lightId);

                    if (!Array.isArray(aux))
                        return aux;

                    global.push(aux);
                }
                else
                    return "light " + attributeNames[i] + " undefined for ID = " + lightId;
            }

            // Gets the additional attributes of the spot light
            if (children[i].nodeName == "spot") {
                var angle = this.reader.getFloat(children[i], 'angle');
                if (!(angle != null && !isNaN(angle)))
                    return "unable to parse angle of the light for ID = " + lightId;

                var exponent = this.reader.getFloat(children[i], 'exponent');
                if (!(exponent != null && !isNaN(exponent)))
                    return "unable to parse exponent of the light for ID = " + lightId;

                var targetIndex = nodeNames.indexOf("target");

                // Retrieves the light target.
                var targetLight = [];
                if (targetIndex != -1) {
                    var aux = this.parseCoordinates3D(grandChildren[targetIndex], "target light for ID " + lightId);
                    if (!Array.isArray(aux))
                        return aux;

                    targetLight = aux;
                }
                else
                    return "light target undefined for ID = " + lightId;

                global.push(...[angle, exponent, targetLight])
            }

            this.lights[lightId] = global;
            numLights++;
        }

        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

        this.log("Parsed lights");
        return null;
    }

    /**
     * Parses the <textures> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {

        const textures = texturesNode.children;

        if (textures.length == 0) {
            return "no textures present in the scene. Must be at least one texture.";
        }

        this.textures = [];

        for (let i = 0; i < textures.length; i++) {
            if (textures[i].nodeName != "texture") {
                this.onXMLMinorError("unknown tag <" + textures[i].nodeName + ">");
                continue;
            }

            // Get id of the current texture.
            const textureID = this.reader.getString(textures[i], 'id');
            if (textureID == null)
                return "no ID defined for material";

            // Checks for repeated IDs.
            if (this.textures[textureID] != null)
                return "ID must be unique for each light (conflict: ID = " + textureID + ")";

            const texFile = this.reader.getString(textures[i], 'file');
            // Checks if file extension is valid, ignores the texture completely otherwise.
            if (texFile.match(/(\.jpg)$/) == null && texFile.match(/(\.png)$/) == null) {
                this.onXMLMinorError("Texture file of invalid format (must be jpg or png). Ignoring texture.");
                continue;
            }

            let tex = new CGFtexture(this.scene, texFile);
            console.log("Texture id: " + textureID + "\tFilename: " + texFile);
            this.textures[textureID] = tex;
        }

        return null;
    }

    /**
     * Parses the <materials> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        var children = materialsNode.children;

        this.materials = [];

        var grandChildren = [];
        var nodeNames = [];

        // Any number of materials.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current material.
            var materialID = this.reader.getString(children[i], 'id');
            if (materialID == null)
                return "no ID defined for material";

            // Checks for repeated IDs.
            if (this.materials[materialID] != null)
                return "ID must be unique for each material (conflict: ID = " + materialID + ")";

            const shine = this.reader.getFloat(children[i], 'shininess');
            if (!(shine != null && !isNaN(shine)))
                return "unable to parse shine of the primitive coordinates for ID = " + materialID;

            let newMaterial = new CGFappearance(this.scene);
            newMaterial.setShininess(shine);

            //Has materials attributes
            grandChildren = children[i].children;

            //collect attr names
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            //excess attributes warning
            if (grandChildren.length > 4) {
                this.onXMLMinorError("there is excess of attributes. Unknown attrbutes will be ignored")
            }

            const emissionIndex = nodeNames.indexOf("emission");
            const ambientIndex = nodeNames.indexOf("ambient");
            const diffuseIndex = nodeNames.indexOf("diffuse");
            const specularIndex = nodeNames.indexOf("specular");

            let attr_parsed = 0; //to check if strange attributes were on the file

            let color = [];
            if (emissionIndex != -1) {
                color = this.parseColor(grandChildren[emissionIndex], "emission");
                newMaterial.setEmission(...color);
                attr_parsed++;
            }

            if (ambientIndex != -1) {
                color = this.parseColor(grandChildren[ambientIndex], "ambient");
                newMaterial.setAmbient(...color);
                attr_parsed++;
            }
            if (diffuseIndex != -1) {
                color = this.parseColor(grandChildren[diffuseIndex], "diffuse");
                newMaterial.setDiffuse(...color);
                attr_parsed++;
            }
            if (specularIndex != -1) {
                color = this.parseColor(grandChildren[specularIndex], "specular");
                newMaterial.setSpecular(...color);
                attr_parsed++;
            }

            if (attr_parsed != 4) {
                this.onXMLMinorError("Unknown components detected, but ignored");
            }

            this.materials[materialID] = newMaterial;
        }

        this.log("Parsed materials");
        return null;
    }

    parseTransformationCore(transformationNodes, comp, transformationID) {

        var transfMatrix = mat4.create();

        for (var j = 0; j < transformationNodes.length; j++) {
            switch (transformationNodes[j].nodeName) {
                case 'translate':
                    var coordinates = this.parseCoordinates3D(transformationNodes[j], "translate transformation for ID " + transformationID);
                    if (!Array.isArray(coordinates))
                        return coordinates;

                    transfMatrix = mat4.translate(transfMatrix, transfMatrix, coordinates);
                    break;
                case 'scale':
                    var coordinates = this.parseCoordinates3D(transformationNodes[j], "scale transformation for ID " + transformationID);
                    if (!Array.isArray(coordinates))
                        return coordinates;

                    transfMatrix = mat4.scale(transfMatrix, transfMatrix, coordinates);
                    break;
                case 'rotate':
                    var axis = this.reader.getString(transformationNodes[j], 'axis');
                    var angle = this.reader.getFloat(transformationNodes[j], 'angle');

                    switch (axis) {
                        case 'x':
                            transfMatrix = mat4.rotateX(transfMatrix, transfMatrix, angle);
                            break;
                        case 'y':
                            transfMatrix = mat4.rotateY(transfMatrix, transfMatrix, angle);
                            break;
                        case 'z':
                            transfMatrix = mat4.rotateZ(transfMatrix, transfMatrix, angle);
                            break;
                    }
                    break;
            }

            if (comp != null)
                comp.pushTransformation(transfMatrix);
            else
                this.transformations[transformationID] = transfMatrix;

        }


    }

    /**
     * Parses the <transformations> block.
     * @param {transformations block element} transformationsNode
     */
    parseTransformations(transformationsNode) {
        var children = transformationsNode.children;

        this.transformations = [];

        var grandChildren = [];

        // Any number of transformations.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "transformation") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current transformation.
            var transformationID = this.reader.getString(children[i], 'id');
            if (transformationID == null)
                return "no ID defined for transformation";

            // Checks for repeated IDs.
            if (this.transformations[transformationID] != null)
                return "ID must be unique for each transformation (conflict: ID = " + transformationID + ")";


            grandChildren = children[i].children;
            // Specifications for the current transformation.

            this.parseTransformationCore(grandChildren, null, transformationID);

            this.log("Parsed transformations");
            return null;
        }
    }

    /**
     * Parses the <primitives> block.
     * @param {primitives block element} primitivesNode
     */
    parsePrimitives(primitivesNode) {
        var children = primitivesNode.children;

        this.primitives = [];

        var grandChildren = [];

        // Any number of primitives.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "primitive") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current primitive.
            var primitiveId = this.reader.getString(children[i], 'id');
            if (primitiveId == null)
                return "no ID defined for texture";

            // Checks for repeated IDs.
            if (this.primitives[primitiveId] != null)
                return "ID must be unique for each primitive (conflict: ID = " + primitiveId + ")";

            grandChildren = children[i].children;

            // Validate the primitive type
            if (grandChildren.length != 1 ||
                (grandChildren[0].nodeName != 'rectangle' && grandChildren[0].nodeName != 'triangle' &&
                    grandChildren[0].nodeName != 'cylinder' && grandChildren[0].nodeName != 'sphere' &&
                    grandChildren[0].nodeName != 'torus')) {
                return "There must be exactly 1 primitive type (rectangle, triangle, cylinder, sphere or torus)"
            }

            // Specifications for the current primitive.
            var primitiveType = grandChildren[0].nodeName;

            // Retrieves the primitive coordinates.
            if (primitiveType == 'rectangle') {
                // x1
                var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                if (!(x1 != null && !isNaN(x1)))
                    return "unable to parse x1 of the primitive coordinates for ID = " + primitiveId;

                // y1
                var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                if (!(y1 != null && !isNaN(y1)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;

                // x2
                var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                if (!(x2 != null && !isNaN(x2) && x2 > x1))
                    return "unable to parse x2 of the primitive coordinates for ID = " + primitiveId;

                // y2
                var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                if (!(y2 != null && !isNaN(y2) && y2 > y1))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;

                var rect = new MyRectangle(this.scene, primitiveId, x1, x2, y1, y2);

                this.primitives[primitiveId] = rect;
            }
            else if (primitiveType == 'cylinder') {
                //parse values for each type of primitive
                //check values and create the primitives, adding it to the 'this.primitives' array
                const base = this.reader.getFloat(grandChildren[0], 'base');
                if (!(base != null && !isNaN(base)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                const top = this.reader.getFloat(grandChildren[0], 'top');
                if (!(top != null && !isNaN(top)))
                    return "unable to parse top of the primitive coordinates for ID = " + primitiveId;

                const hgt = this.reader.getFloat(grandChildren[0], 'height');
                if (!(hgt != null && !isNaN(hgt)))
                    return "unable to parse height of the primitive coordinates for ID = " + primitiveId;

                const slices = this.reader.getFloat(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices)))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;

                const stacks = this.reader.getFloat(grandChildren[0], 'stacks');
                if (!(stacks != null && !isNaN(stacks)))
                    return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;

                const cylin = new MyCylinder(this.scene, base, top, hgt, slices, stacks);

                this.primitives[primitiveId] = cylin;

            }
            else if (primitiveType == 'torus') {

                const inner = this.reader.getFloat(grandChildren[0], 'inner');
                if (!(inner != null && !isNaN(inner)))
                    return "unable to parse inner of the primitive coordinates for ID = " + primitiveId;

                const outer = this.reader.getFloat(grandChildren[0], 'outer');
                if (!(outer != null && !isNaN(outer)))
                    return "unable to parse outer of the primitive coordinates for ID = " + primitiveId;

                const slices = this.reader.getFloat(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices)))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;

                const loops = this.reader.getFloat(grandChildren[0], 'loops');
                if (!(loops != null && !isNaN(loops)))
                    return "unable to parse loops of the primitive coordinates for ID = " + primitiveId;

                const torus = new MyTorus(this.scene, inner, outer, slices, loops);

                this.primitives[primitiveId] = torus;
            }
            else if (primitiveType == 'triangle') {
                // x1
                var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                if (!(x1 != null && !isNaN(x1)))
                    return "unable to parse x1 of the primitive coordinates for ID = " + primitiveId;
                // y1
                var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                if (!(y1 != null && !isNaN(y1)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;
                //z1
                var z1 = this.reader.getFloat(grandChildren[0], 'z1');
                if (!(z1 != null && !isNaN(z1)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;
                // x2
                var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                if (!(x2 != null && !isNaN(x2)))
                    return "unable to parse x2 of the primitive coordinates for ID = " + primitiveId;
                // y2
                var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                if (!(y2 != null && !isNaN(y2)))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;
                //z2
                var z2 = this.reader.getFloat(grandChildren[0], 'z2');
                if (!(z2 != null && !isNaN(z2)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;
                // x3
                var x3 = this.reader.getFloat(grandChildren[0], 'x3');
                if (!(x3 != null && !isNaN(x3)))
                    return "unable to parse x2 of the primitive coordinates for ID = " + primitiveId;
                // y3
                var y3 = this.reader.getFloat(grandChildren[0], 'y3');
                if (!(y3 != null && !isNaN(y3)))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;
                // z3
                var z3 = this.reader.getFloat(grandChildren[0], 'z3');
                if (!(z3 != null && !isNaN(z3)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;


                var triang = new MyTriangle(this.scene, primitiveId, x1, y1, z1, x2, y2, z2, x3, y3, z3);

                this.primitives[primitiveId] = triang;



            }
            else if (primitiveType == 'sphere') {

                const radius = this.reader.getFloat(grandChildren[0], 'radius');
                if (!(radius != null && !isNaN(radius)))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;

                const slices = this.reader.getFloat(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices)))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;

                const stacks = this.reader.getFloat(grandChildren[0], 'stacks');
                if (!(stacks != null && !isNaN(stacks)))
                    return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;

                var sphere = new MySphere(this.scene, primitiveId, radius, slices, stacks);

                this.primitives[primitiveId] = sphere;


            }
        }

        this.log("Parsed primitives");
        return null;
    }

    //-------------- Component parser -------------------------------------------
    parseTransformationsComp(grandChildren, transformationIndex, comp) {
        var transformationNodes = [];
        var grandgrandChildren = [];

        if (transformationIndex == null)
            this.onXMLMinorError("Tranformation component doesn't exist");

        grandgrandChildren = grandChildren[transformationIndex].children;

        for (var p = 0; p < grandgrandChildren.length; p++) {


            if (grandgrandChildren[p].nodeName == 'transformationref') {
                var id = this.reader.getString(grandgrandChildren[p], 'id');

                if (id == null)
                    this.onXMLMinorError("No id associated to transformation");

                if (this.transformations[id] == null)
                    this.onXMLMinorError("Invalid tranformation id:" + id);
                else {
                    this.comp.pushTransformation(id)
                }
            }
            else {
                transformationNodes.push(grandgrandChildren[p]);
            }
        }

        this.parseTransformationCore(transformationNodes, comp, null);
    }

    parseMaterialsComp(grandChildren, materialsIndex, comp) {

        var lastMaterial;
        var grandgrandChildren = [];

        //make sure section exists
        if (materialsIndex == null)
            this.onXMLMinorError("No materials section present in this component");

        grandgrandChildren = grandChildren[materialsIndex].children;

        //make sure at least one material exists
        if (grandgrandChildren == null)
            this.onXMLMinorError("No materials present in this component.Should exist at least one");

        for (var p = 0; p < grandgrandChildren.length; p++) {

            var id = this.reader.getString(grandgrandChildren[p], 'id');

            if (id == "inherit" && p != 0) {
                this.comp.activateMathHerd();
                continue;
            }
            else if (this.materials[id] != null)
                comp.pushMaterial(id);
            else
                this.onXMLMinorError("Invalid material id:" + id);

            lastMaterial = this.reader.getString(grandgrandChildren[p], 'id');
        }
    }

    parseTexturesComp(grandChildren, textureIndex, comp) {

        var grandgrandChildren = [];

        if (textureIndex == null)
            this.onXMLMinorError("Texture component doesn't exist");

        grandgrandChildren = grandChildren[textureIndex];


        var id = this.reader.getString(grandgrandChildren, 'id');
       // var length_s = this.reader.getFloat(grandgrandChildren, 'length_s');
    //var lenght_t = this.reader.getFloat(grandgrandChildren, 'lenght_t');
        var text = [];

        if (id == "inherit") {
            this.comp.activateTextHerd();
        }
        if (id == "none") {
            this.comp.pushTexture(null);
        }
        else if (this.textures[id] != null) {
           /* if ((length_s == null && length_t != null) || (length_s != null && length_t == null))
                this.onXMLMinorError("impossible to only have one lenght parameter>");
            else { //need to put in structure*/
                text.push(id);
              //  text.push(lenght_s);
                //text.push(lenght_t);
                comp.pushTexture(text);
           // }
        }

    }

    parseChildrenComp(grandChildren, childrenIndex, comp) {

        var grandgrandChildren = [];

        if (childrenIndex == null)
            this.onXMLMinorError("Children component doesn't exist");

        grandgrandChildren = grandChildren[childrenIndex].children;

        //make sure at least one material exists present in this component.Should exist at least one
        if (grandgrandChildren == null)
            this.onXMLMinorError("No children present in this component.Should exist at least one");


        for (var p = 0; p < grandgrandChildren.length; p++) {

            var id = this.reader.getString(grandgrandChildren[p], 'id');

            if (this.components[id] != null || this.primitives[id] != null) {
                comp.pushChildren(id);
            }
            else
                this.onXMLMinorError("unknown tag <" + id + ">");

        }
    }



    /**
* Parses the <components> block.
* @param {components block element} componentsNode
*/
    parseComponents(componentsNode) {

        var flag = 0;

        var children = componentsNode.children;
        var grandChildren = [];
        var nodeNames = [];

        //need to check for rootid

        // Any number of components.
        for (var i = 0; i < children.length; i++) {

            this.comp = new MyComponent(this.scene);

            if (children[i].nodeName != "component") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current component.
            var componentID = this.reader.getString(children[i], 'id');
            if (componentID == null)
                return "no ID defined for componentID";

            if (componentID == this.idRoot)
                flag = 1;

            // Checks for repeated IDs.
            if (this.components[componentID] != null)
                return "ID must be unique for each component (conflict: ID = " + componentID + ")";


            grandChildren = children[i].children; //component properties

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            var transformationIndex = nodeNames.indexOf("transformation");
            var materialsIndex = nodeNames.indexOf("materials");
            var textureIndex = nodeNames.indexOf("texture");
            var childrenIndex = nodeNames.indexOf("children");


            this.parseTransformationsComp(grandChildren, transformationIndex, this.comp);

            this.parseMaterialsComp(grandChildren, materialsIndex, this.comp);

            this.parseTexturesComp(grandChildren, textureIndex, this.comp);

            this.parseChildrenComp(grandChildren, childrenIndex, this.comp)



            this.components.push(this.comp);
        }

        if (flag == 0)
            return "There needs to exists at least a component with same id as root";

    }


    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates3D(node, messageError) {
        var position = [];

        // x
        var x = this.reader.getFloat(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = this.reader.getFloat(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = this.reader.getFloat(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates4D(node, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = this.reader.getFloat(node, 'w');
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseColor(node, messageError) {
        var color = [];

        // R
        var r = this.reader.getFloat(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return "unable to parse R component of the " + messageError;

        // G
        var g = this.reader.getFloat(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return "unable to parse G component of the " + messageError;

        // B
        var b = this.reader.getFloat(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return "unable to parse B component of the " + messageError;

        // A
        var a = this.reader.getFloat(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return "unable to parse A component of the " + messageError;

        color.push(...[r, g, b, a]);

        return color;
    }

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene() {
        //To do: Create display loop for transversing the scene graph
        this.camera = this.views['defaultCamera'];
        //To test the parsing/creation of the primitives, call the display function directly
        // this.materials['demoMaterial'].setTexture(this.textures['melhorCao']);
        this.materials['demoMaterial'].apply();
        // this.primitives['sp'].display();



        //this.primitives['demoCylinder'].display();
        //this.primitives['demoTorus'].display();
    }
}