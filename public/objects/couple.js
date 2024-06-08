import "../../style.css";
import Phaser from "phaser";

class Couple extends Phaser.Scene {
  constructor() {
    super({ key: "Couple" });
  }
  player = "";
  ordenArray = [];
  try = 0;
  a = 0;
  b = 0;
  btnA = null;
  btnB = null;
  point = 0;
  pointLife = 0;

  preload() {
    this.load.image("bgCouple", "/assets/images/background_couple.png");
    this.load.image("card", "/assets/images/Card.png");
    this.load.image("imgLPCouple", "/assets/images/LP.png");

    this.load.image("coup1", "/assets/images/Coup1.png");
    this.load.image("coup2", "/assets/images/Coup2.png");
    this.load.image("coup3", "/assets/images/Coup3.png");
    this.load.image("coup4", "/assets/images/Coup4.png");
    this.load.image("coup5", "/assets/images/Coup5.png");
    this.load.image("coup6", "/assets/images/Coup6.png");
    this.load.image("coup7", "/assets/images/Coup7.png");
    this.load.image("coup8", "/assets/images/Coup8.png");
    this.load.image("coup9", "/assets/images/Coup9.png");

    this.load.audio("soundPointCouple", "/assets/audio/point3.mp3");
    this.load.audio("soundLost", "/assets/audio/dead.mp3");
    this.load.audio("soundSelect", "/assets/audio/jump3.mp3");
    this.load.audio("soundNoSelect", "/assets/audio/select.mp3");
    this.load.audio("soundWin", "/assets/audio/win3.mp3");
    this.load.audio("SoundBg", "/assets/audio/couple.mp3");
  }

  create() {
    this.player = "";
    this.ordenArray = [];
    this.try = 0;
    this.a = 0;
    this.b = 0;
    this.btnA = null;
    this.btnB = null;
    this.point = 0;
    this.pointLife = 0;

    this.soundPointCouple = this.sound.add("soundPointCouple");
    this.soundLost = this.sound.add("soundLost");
    this.soundSelect = this.sound.add("soundSelect");
    this.soundNoSelect = this.sound.add("soundNoSelect");
    this.soundWin = this.sound.add("soundWin");
    this.soundBg = this.sound.add("SoundBg");

    var screenWidth = this.sys.game.config.width;
    var screenHeight = this.sys.game.config.height;

    this.background_couple = this.add.image(0, 0, "bgCouple").setInteractive();
    this.background_couple.setDisplaySize(screenWidth, screenHeight);
    this.background_couple.setOrigin(0, 0);

    this.soundBg.play({
      loop: true,
    });

    var i = 1;
    this.randomOrdenArray();
    var scene = this;
    setTimeout(function () {
      while (i < 19) {
        scene.createPanel(i);
        i++;
      }
    }, 2000);
    this.pointLife = ENV.LEVEL == "E" ? 9 : ENV.LEVEL == "N" ? 6 : 3;
    this.getPointLife(null);
    this.getTime();
  }

  randomOrdenArray() {
    var i = 1;
    while (i < 10) {
      this.ordenArray.push(i);
      this.ordenArray.push(i);
      i++;
    }
    this.ordenArray = this.shuffleArray(this.ordenArray);
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  createPanel(orden) {
    const screenWidth = this.sys.game.config.width;
    const screenHeight = this.sys.game.config.height;

    const modalWidth = screenWidth / 2;
    const modalHeight = screenHeight / 2;
    const modalX = (screenWidth - modalWidth) / 2;
    const modalY = (screenHeight - modalHeight) / 2;

    var ordenX = this.setOrdenX(orden);
    var ordenY = this.setOrdenY(orden);

    var confirmModalButton = this.add
      .image(
        modalX + modalWidth / 2 - modalX * ordenX,
        modalY + modalHeight * ordenY,
        "card"
      )
      .setScale(0.16)
      .setOrigin(0.5)
      .setName("card" + orden)
      .setInteractive()
      .on("pointerdown", () => {
        confirmModalButton.setVisible(true);
        this.compare(confirmModalButton);
      });
  }

  visibleCard(btn) {
    //debugger;
    var pos = btn.name.replace("card", "");
    btn.setTexture("coup" + this.ordenArray[pos - 1]);
    btn.setScale(0.235);
  }

  compare(btn) {
    //debugger;

    var value = btn.name;

    this.try = this.try == 0 ? 1 : this.try == 1 ? 2 : 1;

    this.btnA = this.try == 1 ? btn : this.btnA;
    this.btnB = this.try == 2 ? btn : this.btnB;

    this.visibleCard(btn);

    this.a = this.try == 1 ? value.replace("card", "") : this.a;
    this.b = this.try == 2 ? value.replace("card", "") : this.b;
    //debugger;
    if (this.try == 1) this.soundSelect.play();
    if (this.a != 0 && this.b != 0) {
      if (
        this.ordenArray[this.a - 1] == this.ordenArray[this.b - 1] &&
        this.a != this.b
      ) {
        this.btnA.disableInteractive();
        this.btnB.disableInteractive();
        this.soundPointCouple.play();
        this.point++;
        this.getPointLife("+");
      } else {
        this.time.addEvent({
          delay: 500,
          callback: function () {
            this.btnA.setTexture("card").setScale(0.16);
            this.btnB.setTexture("card").setScale(0.16);
          },
          callbackScope: this,
        });
        this.soundNoSelect.play();
        this.getPointLife("-");
      }
      this.a = 0;
      this.b = 0;

      if (this.point == 9) {
        this.soundBg.stop();
        this.soundWin.play();

        this.modal = this.scene.get("Modal");
        this.eventTimer.destroy();
        this.modal.getWinnerModal(this).then((response) => {
          //debugger;
          this.soundWin.stop();
          if (response) {
            this.scene.start("Couple");
          } else {
            this.scene.start("Home");
          }
        });
      }
    }
  }

  changeButton() {
    this.btnA.setTexture("card").setScale(0.16);
    this.btnB.setTexture("card").setScale(0.16);
  }

  getPointLife(point) {
    const screenWidth = this.sys.game.config.width;
    const screenHeight = this.sys.game.config.height;

    const modalWidth = screenWidth / 2;
    const modalHeight = screenHeight / 2;
    const modalX = (screenWidth - modalWidth) / 2;
    const modalY = (screenHeight - modalHeight) / 2;

    this.pointLife =
      point == "+"
        ? this.pointLife + 1
        : point == "-"
        ? this.pointLife - 1
        : this.pointLife;

    if (this.score) {
      this.score.setVisible(false);
    }

    if (this.heartLifePoint) {
      this.heartLifePoint.setVisible(false);
    }

    this.heartLifePoint = this.add
      .image(
        (modalX + modalWidth / 2) * 0.24,
        (modalY + modalHeight / 2) * 0.15,
        "imgLPCouple"
      )
      .setOrigin(0.5)
      .setScale(0.5);
    this.score = this.add
      .text(
        (modalX + modalWidth / 2) * 0.4,
        (modalY + modalHeight / 2) * 0.15,
        "x" + this.pointLife,
        { fontStyle: "bolder", fontSize: "25.2px", fill: "#000" }
      )
      .setOrigin(0.5);

    if (this.pointLife == 0) {
      this.modal = this.scene.get("Modal");
      this.eventTimer.destroy();
      this.hiddenCards();
      this.modal.getGameOverModal(this).then((response) => {
        //debugger;
        if (response) {
          this.scene.start("Couple");
        } else {
          this.scene.start("Home");
        }
      });
    }
  }

  hiddenCards() {
    var i = 1;
    while (i < 19) {
      var buttonCards = this.children.getByName("card" + i);
      buttonCards.setVisible(false);
      i++;
    }
  }

  getTime() {
    this.timeLife = 0;
    const screenWidth = this.sys.game.config.width;
    const screenHeight = this.sys.game.config.height;

    const modalWidth = screenWidth / 2;
    const modalHeight = screenHeight / 2;
    const modalX = (screenWidth - modalWidth) / 2;
    const modalY = (screenHeight - modalHeight) / 2;

    if (this.timer) {
      this.timer.setVisible(false);
    }
    if (this.eventTimer) {
      this.eventTimer.destroy();
    }

    this.timer = this.add
      .text(
        (modalX + modalWidth / 2) * 1.62,
        (modalY + modalHeight / 2) * 0.15,
        "TIME:" + this.timeLife,
        { fontStyle: "bolder", fontSize: "25.2px", fill: "#000" }
      )
      .setOrigin(0.5);
    var more = this;
    this.eventTimer = this.time.addEvent({
      delay: 1000,
      callback: function () {
        this.timeLife++;
        this.timer.setText("TIME:" + this.timeLife);
      },
      callbackScope: this,
      loop: true,
    });
  }

  setOrdenX(o) {
    switch (o) {
      case 1:
      case 4:
      case 7:
      case 10:
      case 13:
      case 16:
        return 1.1;
        break;
      case 2:
      case 5:
      case 8:
      case 11:
      case 14:
      case 17:
        return 0.05;
        break;
      case 3:
      case 6:
      case 9:
      case 12:
      case 15:
      case 18:
        return -1;
        break;
    }
  }

  setOrdenY(o) {
    switch (o) {
      case 1:
      case 2:
      case 3:
        return -0.13;
        break;
      case 4:
      case 5:
      case 6:
        return 0.13;
        break;

      case 7:
      case 8:
      case 9:
        return 0.39;
        break;

      case 10:
      case 11:
      case 12:
        return 0.65;
        break;

      case 13:
      case 14:
      case 15:
        return 0.91;
        break;

      case 16:
      case 17:
      case 18:
        return 1.17;
        break;
    }
  }
}

export default Couple;
