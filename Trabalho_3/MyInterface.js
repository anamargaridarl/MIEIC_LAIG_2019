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
        this.typeKeys = this.scene.type_player;
        this.f0.add(this.scene, 'player1', this.typeKeys)
            .name('Player1:')
            .onChange(tID => this.scene.updatePlayer1(tID));
    }

    createViewDropdown2() {
        this.typeKeys = this.scene.type_player;
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
}