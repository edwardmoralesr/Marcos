import '../../style.css'
import Phaser from 'phaser'

class Question extends Phaser.Scene {
    constructor() {
        super({ key: 'Question', active: false });
    }

    sendQuestion(page) {
        var q = this.randomQuestion(page.scene.key);
        var random = Phaser.Math.RND.between(0, 1);

        var now = page;
        var more = this;
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
                    more.sendQuestion(now);
                } else {
                    now.modal.getGameOverModal(now).then(response => {
                        if (response) {
                            more.sendQuestion(now);
                        } else {
                            now.scene.start('Home');
                        }
                    });
                }
            });
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