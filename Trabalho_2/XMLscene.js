var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super();

        this.interface = myinterface;
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

        this.sceneInited = false;
        this.roomLight = true;
        this.treeLight = true;
        this.axisActive = false;
        this.initCameras();
        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.setUpdatePeriod(50);

        this.texRTT = new CGFtextureRTT(this,this.gl.canvas.width,this.gl.canvas.height);
        this.secureCam = new MySecurityCamera(this);
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {
        this.camera = new CGFcamera(0.78, 0.1, 500, vec3.fromValues(10, 8, 30), vec3.fromValues(10, 0, 5));
        this.sceneCamera = this.camera;

        this.secCamera = new CGFcamera(0.78,0.1,500,vec3.fromValues(16,10,20),vec3.fromValues(8,2,8));
        
    }

    initViews()
    {
        this.graph.views["secCamera"] = this.secCamera;
        this.secCamID = "secCamera";
        
        this.camera = this.graph.views[this.graph.viewID];
        this.sceneCamera = this.camera;
        this.interface.setActiveCamera(this.camera);
    }
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        var i = 0;
        // Lights index.

        // Reads the lights from the scene graph.
        for (var key in this.graph.lights) {
            if (i >= 8)
                break;              // Only eight lights allowed by WebGL.

            if(key == "roomLight") {
                this.roomLightID = i;
            }

            if(key == "treeLight") {
                this.treeLightID = i;
            }

            if (this.graph.lights.hasOwnProperty(key)) {
                var light = this.graph.lights[key];
                
                this.lights[i].setPosition(light[2][0], light[2][1], light[2][2], light[2][3]);
                this.lights[i].setAmbient(light[3][0], light[3][1], light[3][2], light[3][3]);
                this.lights[i].setDiffuse(light[4][0], light[4][1], light[4][2], light[4][3]);
                this.lights[i].setSpecular(light[5][0], light[5][1], light[5][2], light[5][3]);

                if (light[1] == "spot") {
                    this.lights[i].setSpotCutOff(light[6]);
                    this.lights[i].setSpotExponent(light[7]);
                    this.lights[i].setSpotDirection(light[8][0], light[8][1], light[8][2]);
                }

                this.lights[i].setVisible(true);
                if (light[0])
                    this.lights[i].enable();
                else
                    this.lights[i].disable();

                this.lights[i].update();

                i++;
            }
        }
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    /** Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        this.axis = new CGFaxis(this, this.graph.referenceLength);

        this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

        this.setGlobalAmbientLight(this.graph.ambient[0], this.graph.ambient[1], this.graph.ambient[2], this.graph.ambient[3]);

        this.initLights();

        this.initViews();

        this.sceneInited = true;

        this.interface.createViewDropdown();
        this.interface.createLightsCheckboxes();

    }

    /**
     * Renders the scene.
     */
    render(usingSecCam) {
        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        if(usingSecCam) {
            this.camera = this.secCamera;
        }
        else {
            this.camera = this.sceneCamera;
        }
        //
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        

        this.pushMatrix();
        if(this.axisActive)
            this.axis.display();
        
        
        if (this.sceneInited) {
            
            // Draw axis
            this.setDefaultAppearance();
            //get Array of objects to allow iteration in for loop (JS behavior adaptation)
            const lightArr = Object.keys(this.graph.lights);
            for (var i = 0; i < lightArr.length; i++) {
                this.lights[i].setVisible(true);
                if(i == this.roomLightID) {
                    if(this.roomLight)
                        this.lights[i].enable();
                    else
                        this.lights[i].disable(); 
                }
                else if(i == this.treeLightID) {
                    if(this.treeLight)
                        this.lights[i].enable();
                    else
                        this.lights[i].disable(); 
                }
                else
                    this.lights[i].enable();
                this.lights[i].update();
            }
            // Displays the scene (MySceneGraph function).
            this.graph.displayScene();
        }

        this.popMatrix();
        // ---- END Background, camera and axis setup
    }

    updateCurrView(viewID) {
        this.camera = this.graph.views[viewID];
        this.interface.setActiveCamera(this.camera);
        this.sceneCamera = this.camera;
    }

    updateSecCam(secID) {
        this.secCamera = this.graph.views[secID];
    }

    update(t)
    {
        if(this.sceneInited) {
            this.graph.components["demoRoot"].updateAnimation(t/1000);
            this.secureCam.update(t);
        }
    }

    checkKeys(eventCode) {
        if (eventCode == "KeyM") {
            this.graph.components["demoRoot"].updateMaterial();
        }
    }

    display() {
        
        this.texRTT.attachToFrameBuffer();
        this.render(true);
        this.texRTT.detachFromFrameBuffer();		
        this.render(false);
        
        this.gl.disable(this.gl.DEPTH_TEST);
        this.secureCam.display(this.texRTT);
        this.gl.enable(this.gl.DEPTH_TEST);
    }

   
}