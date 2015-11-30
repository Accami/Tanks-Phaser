class Bullet {
    private game: Phaser.Game;
    private bullets;

    constructor(game) {
        this.game = game;
        this.bullets = game.add.group();
    }

    create(barrel, color) {
        var temp = game.add.sprite(barrel.x + (64 * Math.cos(barrel.rotation + (Math.PI / 2))), barrel.y + (64 * Math.sin(barrel.rotation + (Math.PI / 2))), 'tank_atlas');
        temp.frameName = 'bullet' + color + 'Silver.png';
        temp.anchor.x = 0.5;
        temp.anchor.y = 0.5;
        game.physics.enable(temp, Phaser.Physics.ARCADE);
        temp.rotation = barrel.rotation + (Math.PI);

        game.physics.arcade.velocityFromRotation(temp.rotation - (Math.PI / 2), 400, temp.body.velocity);

        this.createSmoke(barrel, color);

        this.bullets.add(temp);
    }

    createSmoke(barrel, color) {
        //Takes in tank information to be able to position the smoke animation properly
        var smoke = game.add.sprite(barrel.x + (50 * Math.cos(barrel.rotation + (Math.PI / 2))), barrel.y + (50 * Math.sin(barrel.rotation + (Math.PI / 2))), 'smoke_atlas');
        smoke.anchor.x = 0.5;
        smoke.anchor.y = 0.5;

        //Sprite tinting based off of tank color
        if (color === "Green") { smoke.tint = 0x5a9c5a; }
        else if (color === "Blue") { smoke.tint = 0x179ad2; }
        else if (color === "Red") { smoke.tint = 0xb45212; }
        else if (color === "Beige") { smoke.tint = 0xa59d85; }
        else if (color === "Black") { smoke.tint = 0x46433b; }

        game.add.tween(smoke).to({ alpha: 0 }, 500, "Power0").start();
        game.add.tween(smoke.scale).to({ x: 0.1, y: 0.1 }, 500, "Power0").start()
    }
}