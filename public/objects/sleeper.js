import '../../style.css'
import Phaser from 'phaser'

class Sleeper extends Phaser.Scene {
    constructor() {
        super({ key: 'Sleeper' });
    }

    preload() {
        this.load.image("bg2", "/assets/images/background_sleeper.png");

        this.load.audio('soundPoint', '/assets/audio/point.mp3');
        this.load.audio('soundLost', '/assets/audio/dead.mp3');
    }

    create() {
        this.soundPoint = this.sound.add('soundPoint');
        this.soundLost = this.sound.add('soundLost');

        var screenWidth = this.sys.game.config.width;
        var screenHeight = this.sys.game.config.height;

        this.background_sleeper = this.add.image(0, 0, "bg2").setInteractive();

        this.background_sleeper.setDisplaySize(screenWidth, screenHeight);
        this.background_sleeper.setOrigin(0, 0);

        this.scene.get('Question').sendQuestion(this);
    }
}

export default Sleeper