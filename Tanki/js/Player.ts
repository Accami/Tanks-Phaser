class Player {

    private player;
    private cursors;
    private wasd;
    private mouse;
    private tankColor;
    private trackTime = 0;
    private barrel;
    private track;
    private speed = 200;

    constructor(player) {
        this.player = player;
    }

    create() {
        // Set up a Phaser controller for keyboard input.
        this.cursors = game.input.keyboard.createCursorKeys();
        this.wasd =
        {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        this.mouse = game.input.mouse.button;

        this.tankColor = "Green";

        this.player = game.add.sprite(132, 132, 'tank_atlas');
        this.player.frameName = "tank" + this.tankColor + ".png";
        this.player.anchor.x = 0.5;
        this.player.anchor.y = 0.5;
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;

        this.barrel = game.add.sprite(this.player.x, this.player.y, 'tank_atlas');
        this.barrel.frameName = "barrel" + this.tankColor + ".png";
        this.barrel.anchor.x = 0.5;
        game.physics.enable(this.barrel, Phaser.Physics.ARCADE);

    }

    update() {
        this.player.bringToTop();
        this.barrel.bringToTop();

        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.body.angularVelocity = 0;

        this.barrel.body.velocity.x = 0;
        this.barrel.body.velocity.y = 0;
        this.barrel.body.angularVelocity = 0;

        //Angular velocities
        if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.player.body.angularVelocity = this.speed / 2;
        }
        else if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.player.body.angularVelocity = -this.speed / 2;
        }

        //Directional velocities
        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            game.physics.arcade.velocityFromAngle(this.player.angle, this.speed, this.player.body.velocity);
            game.physics.arcade.velocityFromAngle(this.player.angle, this.speed, this.barrel.body.velocity);
            if (game.time.totalElapsedSeconds() - this.trackTime >= 0.1) {
                this.createTrack(this.player);
                this.trackTime = game.time.totalElapsedSeconds();
            }
        }
        else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            game.physics.arcade.velocityFromAngle(this.player.angle, -this.speed, this.player.body.velocity);
            game.physics.arcade.velocityFromAngle(this.player.angle, -this.speed, this.barrel.body.velocity);
            if (game.time.totalElapsedSeconds() - this.trackTime >= 0.1) {
                this.createTrack(this.player);
                this.trackTime = game.time.totalElapsedSeconds();
            }
        }


        this.barrel.x = this.player.x;
        this.barrel.y = this.player.y;

        var x = this.player.x;
        var y = this.player.y;
    }

    updateBarrel() {
        this.barrel.rotation = game.math.angleBetween(this.player.x, this.player.y, game.camera.x + game.input.activePointer.x, game.camera.y + game.input.activePointer.y) + 3 * (Math.PI / 2);
    }

    createTrack(tank) {
        this.track = game.add.sprite(tank.x + (Math.cos(tank.rotation + (Math.PI / 2))), tank.y + (Math.sin(tank.rotation + (Math.PI / 2))), 'track');
        this.track.rotation = tank.rotation + (Math.PI / 2);
        this.track.scale.y = 1;
        this.track.anchor.x = 0.5;
        this.track.anchor.y = 0.5;

        game.add.tween(this.track).to({ alpha: 0 }, 5000, "Power0").start();
    }

}