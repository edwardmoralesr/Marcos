import './style.css';
import Phaser from 'phaser';
import Home from './public/objects/home';
import Modal from './public/objects/modal';

class Main extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
  }

  preload() {
    this.load.image("ike", "/assets/images/background_IKE.png");
    this.load.image("bl", "/assets/images/blbackground.png");
  }

  create() {
    var imageGroup = this.add.group();

    var screenWidth = this.sys.game.config.width;
    var screenHeight = this.sys.game.config.height;

    this.ike = imageGroup.create(0, 0, "ike");
    this.blBackground = imageGroup.create(0, 0, "bl");

    imageGroup.setVisible(false);

    this.ike.setDisplaySize(screenWidth, screenHeight);
    this.blBackground.setDisplaySize(screenWidth, screenHeight);

    this.ike.setOrigin(0, 0);
    this.blBackground.setOrigin(0, 0);

    var delay = 3000;
    var fadeDuration = 500;
    var scene = this;

    imageGroup.getChildren().forEach(function (image, index) {
      scene.time.addEvent({
        delay: index * delay,
        callback: function () {
          image.setVisible(true);
          image.setAlpha(0);
          scene.tweens.add({
            targets: image,
            alpha: 1,
            duration: fadeDuration,
            ease: 'Linear'
          });
        },
        callbackScope: this
      });
    });
    setTimeout(function () {
      scene.scene.switch('Home');
    }, 5000)
    console.log(ENV.MSJ);
  }

  update() {
  }
}

const config = {
  type: Phaser.WEBGL,
  width: ENV.WIDTH_APP,
  height: ENV.HEIGHT_APP,
  canvas: mainCanvas,
  physics: {
    default: "arcade"
  },
  scene: [Main, Modal, Home]
}

const game = new Phaser.Game(config)