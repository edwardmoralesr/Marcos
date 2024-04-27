import '../../style.css'
import Phaser, { NONE } from 'phaser'

class Question extends Phaser.Scene {
    constructor() {
        super({ key: 'Question', active: false });
    }

    point = -1;
    eventTimer;

    getTime(now) {

        this.timeLife = 4;
        const screenWidth = now.sys.game.config.width;
        const screenHeight = now.sys.game.config.height;

        const modalWidth = screenWidth / 2;
        const modalHeight = screenHeight / 2;
        const modalX = (screenWidth - modalWidth) / 2;
        const modalY = (screenHeight - modalHeight) / 2;

        if (now.timer) {
            now.timer.setVisible(false);
        }
        if (this.eventTimer) {
            this.eventTimer.destroy();
        }

        now.timer = now.add.text((modalX + modalWidth / 2) * 1.62, (modalY + modalHeight / 2) * 0.15, 'TIME:' + this.timeLife, { fontStyle: 'bolder', fontSize: '25.2px', fill: '#FFF' }).setOrigin(0.5);
        var more = this;
        this.eventTimer = now.time.addEvent({
            delay: 1000,
            callback: function () {
                this.timeLife--;
                now.timer.setText('TIME:' + this.timeLife);
                if (this.timeLife <= 0) {
                    this.eventTimer.destroy();
                    now.modal.getGameOverModal(now).then(response => {
                        more.point = -1;
                        if (response) {
                            now.scene.start('Sleeper');
                        } else {
                            now.scene.start('Home');
                        }
                    });
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    getPoint(now) {

        const screenWidth = now.sys.game.config.width;
        const screenHeight = now.sys.game.config.height;

        const modalWidth = screenWidth / 2;
        const modalHeight = screenHeight / 2;
        const modalX = (screenWidth - modalWidth) / 2;
        const modalY = (screenHeight - modalHeight) / 2;

        this.point++;

        if (now.score) {
            now.score.setVisible(false);
        }

        now.score = now.add.text((modalX + modalWidth / 2) * 0.4, (modalY + modalHeight / 2) * 0.15, 'SCORE:' + this.point, { fontStyle: 'bolder', fontSize: '25.2px', fill: '#FFF' }).setOrigin(0.5);
    }

    sendQuestion(page) {
        var q = this.randomQuestion(page.scene.key);
        var random = Phaser.Math.RND.between(0, 1);

        var now = page;
        var more = this;
        more.getPoint(now);
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
                more.eventTimer.destroy();
                if (response == q.d) {
                    now.soundPoint.play();
                    more.sendQuestion(now);
                } else {
                    now.modal.getGameOverModal(now).then(response => {
                        more.point = -1;
                        if (response) {
                            now.scene.start('Sleeper');
                        } else {
                            now.scene.start('Home');
                        }
                    });
                }
            });
            more.getTime(now);
        }, 2000)
    }

    randomQuestion(page) {
        this.rootPage = page;
        var random = Phaser.Math.RND.between(0, 1)

        return random == 0 ? this.mathQuestion() : this.customQuestion();
    }

    intNumber(num) {
        var floorNumber = Math.floor(num);
        var ceilNumber = Math.ceil(num);
        var isInteger = (floorNumber === ceilNumber);

        return isInteger;
    }

    mathQuestion() {
        var a, b, c, d, e = 0;
        var op1 = ['*', '/'];

        var res = {};

        a = ENV.LEVEL == 'E' ? Phaser.Math.RND.between(2, 9) : ENV.LEVEL == 'N' ? Phaser.Math.RND.between(4, 11) : Phaser.Math.RND.between(7, 17);
        b = ENV.LEVEL == 'E' ? Phaser.Math.RND.between(2, 9) : ENV.LEVEL == 'N' ? Phaser.Math.RND.between(4, 11) : Phaser.Math.RND.between(7, 17);

        var randomOp1 = Phaser.Math.RND.pick(op1);

        c = (ENV.LEVEL == 'H' || ENV.LEVEL == 'N') && randomOp1 == '/' ? Phaser.Math.RND.between(1.7, 1.9) : Phaser.Math.RND.between(3, 5);

        d = randomOp1 == '*' ? a * b : a / b;

        e = (ENV.LEVEL == 'H' || ENV.LEVEL == 'N') && randomOp1 == '/' ? c / d : c + d;

        d = this.intNumber(d) == false ? d.toFixed(1) : d;
        e = this.intNumber(e) == false ? e.toFixed(1) : e;

        return (this.intNumber(d) == false && ENV.LEVEL == 'E' ? this.mathQuestion() : res = {
            a,
            b,
            d,
            e: (d == e ? e + 1 : e),
            txtQuestion: '¿' + a.toString() + (randomOp1 == '*' ? ' x ' : ' / ') + b.toString() + '?'
        });
    }

    customQuestion() {
        var keys = '';
        var num = 0;
        var res = {};

        keys = Object.keys(ENV.KNOWLEDGE.knowledge);
        num = Phaser.Math.RND.between(1, keys.length);

        var q = ENV.KNOWLEDGE.knowledge['Q' + num];

        return (q.a == ENV.LEVEL && q.b == this.rootPage ? res = {
            a: q.a,
            b: q.b,
            d: q.d,
            e: q.e,
            txtQuestion: q.c
        } : this.customQuestion());
    }
}

export default Question