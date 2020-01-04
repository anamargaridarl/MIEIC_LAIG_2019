/**
 * MyInterface class, creating a GUI interface.
 */
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();
        this.f0 = this.gui.addFolder('Game Menu');
        this.f1 = this.gui.addFolder('Movie');
        this.f2 = this.gui.addFolder('Lights');
        this.f3 = this.gui.addFolder('Cameras');
        this.f4 = this.gui.addFolder('Themes');
        this.f0.open();

        this.sceneIndex;

        // add a group of controls (and open/expand by defult)
        this.initKeys();

        return true;
    }


    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function() {};
    }

    processKeyDown(event) {
        this.scene.checkKeys(event.code);
    };

    createViewDropdown1() {
        this.typeKeys = TYPE_PLAYER;
        this.f0.add(this.scene, 'player1', this.typeKeys)
            .name('Player1:')
            .onChange(tID => this.scene.updatePlayer1(tID));
    }

    createViewDropdown2() {
        this.typeKeys = TYPE_PLAYER;
        this.f0.add(this.scene, 'player2', this.typeKeys)
            .name('Player2:')
            .onChange(tID => this.scene.updatePlayer2(tID));
    }

    //USE THIS TO ADD SCENE
    // createViewDropdown3() {
    //     this.typeKeys = this.scene.type_player;
    //     this.gui.add(this.scene, 'player2', this.typeKeys)
    //         .name('Player2:')
    //         .onChange(tID => this.scene.updatePlayer2(tID));
    // }

    createUndoButton() {
        this.f0.add(this.scene, 'undo').name('Undo');
    }

    createStartButton() {
        this.f0.add(this.scene, 'start').name('Start');
    }

    createMovieButton() {
        this.f1.add(this.scene, 'movie').name('Movie');
    }

    createLightsCheckboxes() {
        this.f0.add(this.scene, 'axisActive').name('Display axis');
    }

    createLevelP1Dropdown() {

        if (this.scene.player1 == 2) {
            this.typeKeys = LEVELS;
            this.f0.add(this.scene, 'currentLevel', this.typeKeys)
                .name('Level PLayer1: ')
                .onChange(level => this.scene.setLevel(level));
        }
    }

    createLevelP2Dropdown() {

        if (this.scene.player2 == 2) {
            this.typeKeys = LEVELS;
            this.f0.add(this.scene, 'currentLevel', this.typeKeys)
                .name('Level PLayer2: ')
                .onChange(level => this.scene.setLevel(level));
        }
    }

    createPOVDropdown() {
        this.typeKeys = POV;
        this.f3.add(this.scene, 'currentPOV', this.typeKeys)
            .name('POV: ')
            .onChange(pov => this.scene.setPOV(pov));
    }

    createThemeDropdown() {

        const sceneDropdownModel = [
            "game.xml",
            "game2.xml"
        ];

        this.sceneIndex = this.scene.graph.filename;

        this.f4.add(this, "sceneIndex", sceneDropdownModel)
            .name("Current Scene")
            .onChange(filename => this.scene.graph.loadXML(filename));

    }


}