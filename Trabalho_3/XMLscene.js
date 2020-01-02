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
        this.undoActive = false;
        this.initCameras();
        this.enableTextures(true);
        this.setPickEnabled(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.updatePeriod = 50;
        this.setUpdatePeriod(this.updatePeriod);

        this.board;
        this.orchestrator;
        this.orchestratorInit = false;
        this.type_player = ["pc", "human"];
        this.player1 = "human";
        this.player2 = "human";

        this.player = 1;

    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {
        this.camera = new CGFcamera(0.78, 0.1, 500, vec3.fromValues(10, 8, 30), vec3.fromValues(10, 0, 5));
        this.sceneCamera = this.camera;
    }

    initViews() {

            this.camera = this.graph.views[this.graph.viewID];
            this.sceneCamera = this.camera;
            this.interface.setActiveCamera(this.camera);
            this.povs = new MyPOV(this, this.camera);
            this.currentPOV = this.povs.currentPOV;
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
                break; // Only eight lights allowed by WebGL.

            if (key == "roomLight") {
                this.roomLightID = i;
            }

            if (key == "treeLight") {
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


        this.board = new MyGameBoard(this.graph.scene, this.graph.pieces);
        this.orchestrator = new MyGameOrchestrator(this, this.board, this.graph.components["Score_P1"], this.graph.components["Score_P2"]);
        this.sceneInited = true;
        this.orchestratorInit = true;

        /*Create interface options*/
        this.interface.createStartButton();
        this.interface.createViewDropdown1();
        this.interface.createViewDropdown2();
        this.interface.createLightsCheckboxes();
        this.interface.createUndoButton();
        this.interface.createMovieButton();
        this.interface.createPOVDropdown();

    }

    undo() {
        if (this.orchestrator.gameState == GAME_STATE.playing) {
            console.log('undo');
            this.orchestrator.undo();
        }
    }

    start() {

        if (this.orchestrator.gameState == GAME_STATE.game_over || this.orchestrator.gameState == GAME_STATE.tie || this.orchestrator.gameState == GAME_STATE.menu || this.orchestrator.gameState == GAME_STATE.game_movie) {
            console.log('start')
                //clean pickresults and board
            this.pickResults.splice(0, this.pickResults.length);
            this.clearPickRegistration();
            this.board.cleanBoard();

            //start game
            this.orchestrator = new MyGameOrchestrator(this, this.board, this.graph.components["Score_P1"], this.graph.components["Score_P2"]);
            this.sceneInited = true;
            this.orchestratorInit = true;
            this.orchestrator.gameState = GAME_STATE.playing;
        }
    }

    movie() {
        if (this.orchestrator.gameState == GAME_STATE.game_over || this.orchestrator.gameState == GAME_STATE.tie) {
            this.orchestrator.movie();
            this.orchestrator.gameState = GAME_STATE.game_movie;
        }
    }

    updatePlayer1(tid) {
        this.player1 = tid;
        this.start();
    }

    updatePlayer2(tid) {
        this.player2 = tid;
        this.start();
    }

    logPicking() {

        if (!this.pickMode) {
            if (this.pickResults !== null && this.pickResults.length > 0) {
                for (let i = 0; i < this.pickResults.length; i++) {
                    const obj = this.pickResults[i][0];
                    if (obj) {
                        const clickId = this.pickResults[i][1];
                        console.log("Picked object: " + obj + ", with pick id " + clickId);
                        this.player = this.orchestrator.play(clickId);
                    }
                }
                this.pickResults.splice(0, this.pickResults.length);
            }
        }

    }

    /**
     * Renders the scene.
     */
    render() {
        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // if (usingSecCam) {
        //     this.camera = this.secCamera;
        // } else {
        //     this.camera = this.sceneCamera;
        // }
        //
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();


        this.pushMatrix();
        if (this.axisActive)
            this.axis.display();


        if (this.sceneInited) {

            if (this.orchestratorInit) {
                this.orchestrator.init();
                this.orchestratorInit = false;
            }

            // Draw axis
            this.setDefaultAppearance();
            //get Array of objects to allow iteration in for loop (JS behavior adaptation)
            const lightArr = Object.keys(this.graph.lights);
            for (var i = 0; i < lightArr.length; i++) {
                this.lights[i].setVisible(true);
                if (i == this.roomLightID) {
                    if (this.roomLight)
                        this.lights[i].enable();
                    else
                        this.lights[i].disable();
                } else if (i == this.treeLightID) {
                    if (this.treeLight)
                        this.lights[i].enable();
                    else
                        this.lights[i].disable();
                } else
                    this.lights[i].enable();
                this.lights[i].update();
            }
            // Displays the scene (MySceneGraph function).
            this.graph.displayScene();
        }

        this.popMatrix();
        // ---- END Background, camera and axis setup
    }

    setPOV(pov) {
        this.currentPov = pov;
        this.povs.setChangingPOV(pov, this.updatePeriod);
    }

    update(t) {
        if (this.sceneInited) {
            this.graph.components["Root"].updateAnimation(t / 1000);
            this.orchestrator.update(t / 1000);
            if (this.povs.changingPOV) this.updateCamera();
        }
    }

    updateCamera() {
        this.camera = this.povs.update(this.camera);
        this.interface.setActiveCamera(this.camera);
    }

    checkKeys(eventCode) {
        if (eventCode == "KeyM") {
            this.graph.components["Root"].updateMaterial();
        }
    }

    play() {

        if (this.player == 1 && this.player1 == "pc")
            this.player = this.orchestrator.playCPU();
        else if (this.player == 2 && this.player2 == "pc")
            this.player = this.orchestrator.playCPU();

    }

    display() {

        this.render();

        if (!this.orchestratorInit && this.orchestrator != undefined) {

            if (this.orchestrator.gameState == GAME_STATE.playing) {
                this.play();
                this.logPicking();
            }


            this.clearPickRegistration();
            this.orchestrator.display();
        }

    }


}