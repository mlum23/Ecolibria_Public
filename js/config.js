var config = {
  type: Phaser.CANVAS,
  scale: {
    width: 1280,
    height: 1280,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  scene: [Title_Scene, GameScene, UIScene]
};
var game = new Phaser.Game(config);
