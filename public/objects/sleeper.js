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

        this.sendQuestion();
    }

    sendQuestion() {
        this.question = this.scene.get('Question');
        var q = this.question.randomQuestion();
        var random = Phaser.Math.RND.between(0, 1);

        var now = this;
        setTimeout(function () {
            now.infoModal = {
                question: q.txtQuestion,
                optionOne: random == 0 ? q.d : q.e,
                optionTwo: random == 0 ? q.e : q.d,
                yQ: 2.1,
                hQ: 0.5,
                xA: 0.7,
                yA: 0.1,
            }
            now.modal = now.scene.get('Modal');
            now.modal.getQuestionModal(now).then(response => {
                if (response == q.d) {
                    now.soundPoint.play();
                    now.sendQuestion();
                } else {
                    now.soundLost.play();
                    now.infoModal = {
                        msj: '¿Volver a jugar?',
                        confirm: 'Si',
                        back: 'No'
                    }
                    now.modal = now.scene.get('Modal');
                    now.modal.getDefaultModal(now).then(response => {
                        if (response) {
                            now.sendQuestion();
                        } else {
                            now.scene.start('Home');
                        }
                    });
                }
            });
        }, 2000)
    }
}

export default Sleeper