import '../../style.css'
import Phaser from 'phaser'

class Question extends Phaser.Scene {
    constructor() {
        super({ key: 'Question', active: false });
    }

    randomQuestion() {
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
            e,
            txtQuestion: '¿' + a.toString() + (randomOp1 == '*' ? ' x ' : ' / ') + b.toString() + '?'
        });
    }

    customQuestion() {
        var res = {
            txtQuestion: '¿Capital de Colombia?',
            d: 'Bogotá',
            e: 'Lima'
        }
        return res;
    }
}

export default Question