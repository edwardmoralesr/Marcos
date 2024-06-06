import '../../style.css'
import Phaser from 'phaser'

class Home extends Phaser.Scene {
    constructor() {
        super({ key: 'Home' });
    }

    preload() {

        this.load.audio('sound', '/assets/audio/melody_principal.mp3');
        this.load.image("bg", "/assets/images/background_init.png");

        this.load.image("play", "/assets/images/Jugar.png");
        this.load.image("modeE", "/assets/images/Facil.png");
        this.load.image("modeN", "/assets/images/Normal.png");
        this.load.image("modeH", "/assets/images/Dificil.png");
        this.load.image("exit", "/assets/images/Salir.png");

        this.load.image("sleeper", "/assets/images/Trivia.png");
        this.load.image("couple", "/assets/images/Pares.png");

        this.load.image("marcos0r", "/assets/images/Marcos Right 0.png");
        this.load.image("marcos1r", "/assets/images/Marcos Right 1.png");
        this.load.image("marcos2r", "/assets/images/Marcos Right 2.png");

        this.load.image("marcos0l", "/assets/images/Marcos Left 0.png");
        this.load.image("marcos1l", "/assets/images/Marcos Left 1.png");
        this.load.image("marcos2l", "/assets/images/Marcos Left 2.png");
    }

    create() {

        var sound = this.sound.add('sound');
        sound.play({
            loop: true
        });

        if (!ENV.SOUND) {
            sound.stop();
        }

        var imageGroup = this.add.group();

        var screenWidth = this.sys.game.config.width;
        var screenHeight = this.sys.game.config.height;

        //Background
        this.background = imageGroup.create(0, 0, "bg");

        this.background.setDisplaySize(screenWidth, screenHeight);
        this.background.setOrigin(0, 0);

        //Menu
        this.play = this.add.image(0, 0, "play").setInteractive();
        this.mode = this.add.image(0, 0, "modeE").setInteractive();
        this.exit = this.add.image(0, 0, "exit").setInteractive();

        this.play.setDisplaySize(130, 65);
        this.play.setOrigin(-1.09, -4.1);

        this.mode.setDisplaySize(130, 65);
        this.mode.setOrigin(-1.09, -6.3);

        this.exit.setDisplaySize(130, 65);
        this.exit.setOrigin(-1.09, -8.5);

        this.runPlayerRight();

        this.setLevel(-1);

        var now = this;

        //Button Play         
        this.play.on('pointerdown', () => {

            now.infoModal = {
                msj: 'Elige un juego',
                confirm: '',
                back: 'X'
            }
            now.modal = now.scene.get('Modal');
            now.modal.getWorldModal(now).then(response => {
                switch(response){
                    case 'sleeper':
                        sound.stop();
                        now.scene.switch('Sleeper');
                        break;
                    case 'couple':
                        sound.stop();
                        now.scene.switch('Couple');
                         break;
                    default:
                        break;
                    break;
                }                
            });
        });

        //Button Level         
        this.mode.on('pointerdown', () => {
            now.setLevel(ENV.LEVEL);
        });

        //Button Exit         
        this.exit.on('pointerdown', () => {
            now.infoModal = {
                msj: '¿Quieres salir del juego?',
                confirm: 'Si',
                back: 'No'
            }
            now.modal = now.scene.get('Modal');
            now.modal.getDefaultModal(now).then(response => {
                if (response) {
                    this.game.destroy();
                }
            });
        });
    }
    update() { }

    runPlayerRight() {

        this.playerR = this.add.sprite(-400, 100, "marcos0r")
        this.playerR.setDisplaySize(150, 150);
        this.playerR.setOrigin(0, -3.66);

        this.anims.create({
            key: 'characterAnimationR',
            frames: [
                { key: 'marcos0r' },
                { key: 'marcos1r' },
                { key: 'marcos2r' }
            ],
            frameRate: 5,
            repeat: -1 // -1 loop eterno
        });

        this.playerR.play('characterAnimationR');

        var now = this;

        this.tweens.add({
            targets: this.playerR,
            x: 800,
            duration: 4000,
            ease: 'Linear',
            repeat: 0, // 0 no se repite
            onComplete: function () {
                now.runPlayerLeft();
            }
        });
    }


    runPlayerLeft() {

        this.playerL = this.add.sprite(800, 100, "marcos0l")
        this.playerL.setDisplaySize(150, 150);
        this.playerL.setOrigin(0, -3.66);

        this.anims.create({
            key: 'characterAnimationL',
            frames: [
                { key: 'marcos0l' },
                { key: 'marcos1l' },
                { key: 'marcos2l' }
            ],
            frameRate: 5,
            repeat: -1 // -1 loop eterno
        });

        this.playerL.play('characterAnimationL');

        var now = this;

        this.tweens.add({
            targets: this.playerL,
            x: -400,
            duration: 4000,
            ease: 'Linear',
            repeat: 0, // 0 no se repite
            onComplete: function () {
                now.runPlayerRight();
            }
        });
    }

    setLevel(level) {
        switch (level) {
            case 'E':
                ENV.LEVEL = 'N';
                break;
            case 'N':
                ENV.LEVEL = 'H';
                break;
            default:
                ENV.LEVEL = 'E';
                break;
        }
        this.add.image(0, 0, 'mode' + ENV.LEVEL).setVisible(true)
            .setOrigin(-1.09, -6.3)
            .setDisplaySize(130, 65);
    }
}

export default Home