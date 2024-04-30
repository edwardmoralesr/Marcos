import '../../style.css'
import Phaser from 'phaser'

class Player extends Phaser.Scene {
    constructor() {
        super({ key: 'Player' });
    }

    getPlayer(more) {
        ENV.RUN_PLAYER = true;        
        switch (ENV.PLAYER) {
            default:
                more.load.image("player0r", "/assets/images/Marcos Right 0.png");
                more.load.image("player1r", "/assets/images/Marcos Right 1.png");
                more.load.image("player2r", "/assets/images/Marcos Right 2.png");

                more.load.image("player0l", "/assets/images/Marcos Left 0.png");
                more.load.image("player1l", "/assets/images/Marcos Left 1.png");
                more.load.image("player2l", "/assets/images/Marcos Left 2.png");

                more.load.image("player0f", "/assets/images/Marcos Front 0.png");
                more.load.image("player1f", "/assets/images/Marcos Front 1.png");
                more.load.image("player2f", "/assets/images/Marcos Front 2.png");

                more.load.image("player0b", "/assets/images/Marcos Back 0.png");
                more.load.image("player1b", "/assets/images/Marcos Back 1.png");
                more.load.image("player2b", "/assets/images/Marcos Back 2.png");

                more.load.image("player0fGO", "/assets/images/Marcos Front 0 GO.png");

                break;
        }

    }

    startPlayer(page) {

        switch (page.scene.key) {
            case 'Sleeper':
                this.runPlayerRight(page, 0, 90, -0.2, -0.7, 250, 90, 1400);                
                break;
            case 'Goal':
                break;
            default:
                break;
        }

    }

    gameOverPlayer(page) {
        ENV.RUN_PLAYER = false;
        switch (page.scene.key) {
            case 'Sleeper':
                page.playerGO = page.add.sprite(133, 474, "player0fGO")
                page.playerGO.setDisplaySize(115, 155);
                page.playerGO.setOrigin(-0.2, -0.7);

                if(page.playerF)
                    page.playerF.setVisible(false);
                if(page.playerB)
                    page.playerB.setVisible(false);
                if(page.playerR)
                    page.playerR.setVisible(false);
                if(page.playerRL)
                    page.playerL.setVisible(false);
                break;
            case 'Goal':
                break;
            default:
                break;
        }
    }

    runPlayerRight(more, x1, y1, x2, y2, x3, y3, time) {

        more.playerR = more.add.sprite(x1, y1, "player0r")
        more.playerR.setDisplaySize(150, 150);
        more.playerR.setOrigin(x2, y2);

        more.anims.create({
            key: 'characterAnimationR',
            frames: [
                { key: 'player0r' },
                { key: 'player1r' },
                { key: 'player2r' }
            ],
            frameRate: 5,
            repeat: -1 // -1 loop eterno
        });

        more.playerR.play('characterAnimationR');

        var now = this;

        more.tweens.add({
            targets: more.playerR,
            x: x3,
            y: y3,
            duration: time,
            ease: 'Linear',
            repeat: 0, // 0 no se repite
            onComplete: function () {
                more.playerR.setVisible(false);
                if(ENV.RUN_PLAYER)
                    now.runPlayerFront(more, 250, 90, -0.2, -0.7, 250, 180, 800);
            }
        });
    }

    runPlayerFront(more, x1, y1, x2, y2, x3, y3, time) {

        more.playerF = more.add.sprite(x1, y1, "player0f")
        more.playerF.setDisplaySize(110, 160);
        more.playerF.setOrigin(x2, y2);

        more.anims.create({
            key: 'characterAnimationF',
            frames: [
                { key: 'player0f' },
                { key: 'player1f' },
                { key: 'player2f' }
            ],
            frameRate: 5,
            repeat: -1 // -1 loop eterno
        });

        more.playerF.play('characterAnimationF');

        var now = this;

        more.tweens.add({
            targets: more.playerF,
            x: x3,
            y: y3,
            duration: time,
            ease: 'Linear',
            repeat: 0, // 0 no se repite
            onComplete: function () {
                more.playerF.setVisible(false);
                if(ENV.RUN_PLAYER)
                    now.runPlayerLeft(more, 250, 200, -0.2, -0.7, 0, 200, 1400);  
            }
        });
    }

    runPlayerLeft(more, x1, y1, x2, y2, x3, y3, time) {

        more.playerL = more.add.sprite(x1, y1, "player0l")
        more.playerL.setDisplaySize(150, 150);
        more.playerL.setOrigin(x2, y2);

        more.anims.create({
            key: 'characterAnimationL',
            frames: [
                { key: 'player0l' },
                { key: 'player1l' },
                { key: 'player2l' }
            ],
            frameRate: 5,
            repeat: -1 // -1 loop eterno
        });

        more.playerL.play('characterAnimationL');

        var now = this;

        more.tweens.add({
            targets: more.playerL,
            x: x3,
            y: y3,
            duration: time,
            ease: 'Linear',
            repeat: 0, // 0 no se repite
            onComplete: function () {
                more.playerL.setVisible(false);
                if(ENV.RUN_PLAYER)
                    now.runPlayerBack(more, 0, 200, -0.2, -0.7, 0, 100, 800);
            }
        });
    }

    runPlayerBack(more, x1, y1, x2, y2, x3, y3, time) {

        more.playerB = more.add.sprite(x1, y1, "player0b")
        more.playerB.setDisplaySize(110, 160);
        more.playerB.setOrigin(x2, y2)
        more.anims.create({
            key: 'characterAnimationB',
            frames: [
                { key: 'player0b' },
                { key: 'player1b' },
                { key: 'player2b' }
            ],
            frameRate: 5,
            repeat: -1 // -1 loop eterno
        });

        more.playerB.play('characterAnimationB');

        var now = this;

        more.tweens.add({
            targets: more.playerB,
            x: x3,
            y: y3,
            duration: time,
            ease: 'Linear',
            repeat: 0, // 0 no se repite
            onComplete: function () {
                more.playerB.setVisible(false);
                if(ENV.RUN_PLAYER)
                    now.runPlayerRight(more, 0, 90, -0.2, -0.7, 250, 90, 1500); 
            }
        });
    }
}

export default Player