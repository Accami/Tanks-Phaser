var game = new Phaser.Game(640, 640, Phaser.AUTO, 'Tanks');



game.state.add('Game', Game);

game.state.start('Game');