class MyGameOrchestrator extends CGFobject {

    constructor(scene ) {
        super(scene);

        this.gamesequence = [];
        //this.animator = new MyAnimator();

        let filename = getUrlVars()['file'] || "game.xml" || "christmas.xml";
        this.theme = new MySceneGraph(filename,scene);
        this.gameboard = new MyGameBoard(scene, theme.pieces);
        //this.prolog = new MyPrologInterface();
        this.initBuffers();
    };

    display(){
        this.gameboard.display();
        this.theme.displayScene();
    }
}