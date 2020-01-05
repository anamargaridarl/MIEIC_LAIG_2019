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

        this.P1;
        this.P2;

        this.undo;

        this.sceneIndex;


        return true;
    }

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

    createUndoButton() {
        if (this.scene.player1 == 2 || this.scene.player2 == 2)
            this.f0.remove(this.undo);
        else
            this.undo = this.f0.add(this.scene, 'undo').name('Undo');
    }


    createStartButton() {
        this.f0.add(this.scene, 'start').name('Start');
    }

    createMovieButton() {
        this.f1.add(this.scene, 'movie').name('Movie');
    }

    createAxisCheckboxes() {
        this.f0.add(this.scene, 'axisActive').name('Display axis');
    }

    createLightsCheckboxes() {
        this.f2.add(this.scene, 'lightActive').name('Night Mode');
    }

    createLevelP1Dropdown() {

        if (this.scene.player1 == 2) {
            this.typeKeys = LEVELS;
            this.P1 = this.f0.add(this.scene, 'currentLevel1', this.typeKeys)
                .name('Level PLayer1: ')
                .onChange(level => this.scene.setLevel1(parseInt(level)));
        } else
            this.f0.remove(this.P1);
    }

    createLevelP2Dropdown() {

        if (this.scene.player2 == 2) {
            this.typeKeys = LEVELS;
            this.P2 = this.f0.add(this.scene, 'currentLevel2', this.typeKeys)
                .name('Level PLayer2: ')
                .onChange(level => this.scene.setLevel2(parseInt(level)));
        } else
            this.f0.remove(this.P2);


    }

    createPOVDropdown() {
        this.typeKeys = POV;
        this.f3.add(this.scene, 'currentPOV', this.typeKeys)
            .name('POV: ')
            .onChange(pov => this.scene.setPOV(pov));
    }

    createThemeDropdown() {

        const LEVELS = Object.freeze({
            "OLYMPICS": "game.xml",
            "SPACEDOGS": "game2.xml"
        });

        this.sceneIndex = this.scene.graph.filename;
        this.typeKeys = LEVELS;

        this.f4.add(this, "sceneIndex", this.typeKeys)
            .name("Current Scene")
            .onChange(filename => {
                this.scene.graph.loadXML(filename);
            });

    }


}