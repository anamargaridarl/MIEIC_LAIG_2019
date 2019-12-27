class MyGameOrchestrator extends CGFobject {

    constructor(scene, gameboard) {
        super(scene);

        this.gamesequence = [];
        this.gameboard = gameboard;
        this.initBuffers();
        this.prolog = new MyProlog(scene);
    }

    display() {
        this.gameboard.display();
    }

    play(id) {
        let coord = this.gameboard.play(id, this.prolog.player);
        this.prolog.addplay(coord[0], coord[1], coord[2]);
        console.log(this.prolog.getPossiblePlays());
    }

    update(t) {
        this.gameboard.update(t);
    }


}