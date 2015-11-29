class Game {

    public localPlayer;
    public WIDTH = 640;
    public HEIGHT = 640;

    preload() {
        //FPS, for debugging purposes
        game.time.advancedTiming = true;

        game.load.atlas('environment_atlas', './images/environment.png', './images/environment.json');
        game.load.atlas('tank_atlas', './images/tanks.png', './images/tanks.json');
        game.load.atlas('smoke_atlas', './images/smoke.png', './images/smoke.json');
        game.load.image('track', './images/track.png');
        game.load.image('tracks', './images/tracks.png');

        game.load.audio('shoot', './sound/shoot.mp3');
    }

    create() {
        // By setting up global variables in the create function, we initialise them on game start.
        // We need them to be globally available so that the update function can alter them.
        var squareSize = 128;                // The length of a side of the squares. Our image is 15x15 pixels.
        var score = 0;                      // Game score.
        var tick = 0;

        game.world.resize(squareSize * 20, squareSize * 20);

        var map = game.add.tileSprite(0, 0, squareSize * 20, squareSize * 20, 'environment_atlas');
        map.frameName = "land_dirt05.png";

        game.physics.startSystem(Phaser.Physics.P2JS);

        this.localPlayer = new Player(game);
        this.localPlayer.create();

    }

    update() {
        this.localPlayer.update();
        this.localPlayer.updateBarrel();
    }

    render() {
        game.debug.text(String(game.time.fps) || '--', this.WIDTH - 25, 20, "#FFF");
    }

}