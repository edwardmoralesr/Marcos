import '../../style.css'
import Phaser from 'phaser'

class Home extends Phaser.Scene {
    constructor() {
        super({ key: 'Home' });
        this.player;
    }

    preload() {
        this.load.audio('sound', '/assets/audio/melody_principal.mp3');
        this.load.image("bg", "/assets/images/background_init.png");

        this.load.image("play", "/assets/images/Jugar.png");
        this.load.image("modeE", "/assets/images/Facil.png");
        this.load.image("modeN", "/assets/images/Normal.png");
        this.load.image("modeH", "/assets/images/Dificil.png");
        this.load.image("exit", "/assets/images/Salir.png");

        this.load.image("marcos", "/assets/images/Marcos Right 0.png");
    }

    create() {

        var sound = this.sound.add('sound');
        sound.play({
            loop: true
        });

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

        this.play.setDisplaySize(100, 50);
        this.play.setOrigin(-1.25, -4.1);

        this.mode.setDisplaySize(100, 50);
        this.mode.setOrigin(-1.25, -6.3);

        this.exit.setDisplaySize(100, 50);
        this.exit.setOrigin(-1.25, -8.5);

        //Marcos
        this.player = this.physics.add.image(0, 100, "marcos")
        this.player.setDisplaySize(100, 100);
        this.player.setOrigin(0, -4.1);

        var now = this;

        //Button Exit Modal         
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
}

export default Home