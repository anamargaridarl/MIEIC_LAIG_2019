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

    createViewDropdown() {
        // this.viewKeys = Object.keys(this.scene.graph.views);
        // this.gui.add(this.scene.graph, "viewID", this.viewKeys)
        //     .name("Current view:")
        //     .onChange(vID => this.scene.updateCurrView(vID));
        // this.gui.add(this.scene, "secCamID", this.viewKeys)
        //     .name("Security Camera:")
        //     .onChange(sID => this.scene.updateSecCam(sID));
    }

    createLightsCheckboxes() {
        this.gui.add(this.scene, "axisActive")
            .name("Display axis");
    }
}