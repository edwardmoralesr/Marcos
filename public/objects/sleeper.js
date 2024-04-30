import '../../style.css'
import Phaser from 'phaser'

class Sleeper extends Phaser.Scene {
    constructor() {
        super({ key: 'Sleeper' });
    }
    player = '';

    preload() {
        this.load.image("bg2", "/assets/images/background_sleeper.png");
        this.load.image("bg3", "/assets/images/background_wakeup.png");
        
        this.player = this.scene.get('Player').getPlayer(this);

        this.load.audio('soundPoint', '/assets/audio/point.mp3');
        this.load.audio('soundLost', '/assets/audio/dead.mp3');
        this.load.audio('soundMusicBox', '/assets/audio/music_box.mp3');
        this.load.audio('SoundSnore', '/assets/audio/snore.mp3');
    }    

    create() {
        this.soundPoint = this.sound.add('soundPoint');
        this.soundLost = this.sound.add('soundLost');

        this.soundBg = this.sound.add('soundMusicBox');
        this.soundBg1 = this.sound.add('SoundSnore');

        var screenWidth = this.sys.game.config.width;
        var screenHeight = this.sys.game.config.height;

        this.background_sleeper = this.add.image(0, 0, "bg2").setInteractive();

        this.background_gameover = this.add.image(0, 0, "bg3").setInteractive();

        this.background_sleeper.setDisplaySize(screenWidth, screenHeight);
        this.background_sleeper.setOrigin(0, 0);
        this.background_gameover.setVisible(true);

        this.background_gameover.setDisplaySize(screenWidth, screenHeight);
        this.background_gameover.setOrigin(0, 0);
        this.background_gameover.setVisible(false);

        this.soundBg.play({
            loop: true
        });
        this.soundBg1.play({
            loop: true
        });
        this.scene.get('Question').sendQuestion(this);
        this.scene.get('Player').startPlayer(this);
    }
}

export default Sleeper