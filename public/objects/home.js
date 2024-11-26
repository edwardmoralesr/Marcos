import "../../style.css";
import Phaser from "phaser";

class Home extends Phaser.Scene {
  constructor() {
    super({ key: "Home" });
  }

  preload() {
    this.load.audio("sound", "/assets/audio/melody_principal.mp3");
    this.load.image("bg", "/assets/images/background_init.png");

    this.load.image("play", "/assets/images/Jugar.png");
    this.load.image("modeE", "/assets/images/Facil.png");
    this.load.image("modeN", "/assets/images/Normal.png");
    this.load.image("modeH", "/assets/images/Dificil.png");

    this.load.image("vsCpu", "/assets/images/VsCPU.png");
    this.load.image("vs2p", "/assets/images/Vs2P.png");

    this.load.image("audioOn", "/assets/images/AudioOn.png");
    this.load.image("audioOff", "/assets/images/AudioOff.png");

    this.load.image("sleeper", "/assets/images/Trivia.png");
    this.load.image("couple", "/assets/images/Pares.png");
    this.load.image("playNow", "/assets/images/Jugar_p.png");

    this.load.image("marcos0r", "/assets/images/Marcos Right 0.png");
    this.load.image("marcos1r", "/assets/images/Marcos Right 1.png");
    this.load.image("marcos2r", "/assets/images/Marcos Right 2.png");

    this.load.image("marcos0l", "/assets/images/Marcos Left 0.png");
    this.load.image("marcos1l", "/assets/images/Marcos Left 1.png");
    this.load.image("marcos2l", "/assets/images/Marcos Left 2.png");
  }

  create() {
    this.soundHome = this.sound.add("sound");
    this.soundHome.play({
      loop: true,
    });
    if (!ENV.SOUND) {
      this.soundHome.stop();
    }

    ENV.WORLD = "sleeper";
    ENV.VERSUS = "CPU";

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
    this.versus = this.add.image(0, 0, "vsCpu").setInteractive();
    this.audio = this.add
      .image(0, 0, ENV.SOUND == true ? "audioOn" : "audioOff")
      .setInteractive();

    this.play.setDisplaySize(130, 65);
    this.play.setOrigin(-1.09, -3.5);

    this.mode.setDisplaySize(130, 65);
    this.mode.setOrigin(-1.09, -5.25);

    this.versus.setDisplaySize(130, 65);
    this.versus.setOrigin(-1.09, -6.97);

    this.audio.setDisplaySize(130, 65);
    this.audio.setOrigin(-1.09, -8.72);

    this.runPlayerRight();

    this.setLevel(-1);

    var now = this;

    //Button Play
    this.play.on("pointerdown", () => {
      now.infoModal = {
        msj: "Elige un juego",
        confirm: "",
        back: "X",
      };
      now.modal = now.scene.get("Modal");
      now.modal.getWorldModal(now).then((response) => {
        switch (response) {
          case "sleeper":
            this.soundHome.stop();
            now.scene.switch("Sleeper");
            break;
          case "couple":
            this.soundHome.stop();
            now.scene.switch("Couple");
            break;
          case "next":
            this.play.emit("pointerdown");
            break;
          default:
            break;
        }
      });
    });

    //Button Level
    this.mode.on("pointerdown", () => {
      now.setLevel(ENV.LEVEL);
    });

    //Button Versus
    this.versus.on("pointerdown", () => {
      now.setVersus(ENV.VERSUS);
    });

    //Button Audio
    this.audio.on("pointerdown", () => {
      now.setAudio(ENV.SOUND);
    });
  }
  update() {}

  runPlayerRight() {
    this.playerR = this.add.sprite(-400, 100, "marcos0r");
    this.playerR.setDisplaySize(150, 150);
    this.playerR.setOrigin(0, -3.66);

    this.anims.create({
      key: "characterAnimationR",
      frames: [{ key: "marcos0r" }, { key: "marcos1r" }, { key: "marcos2r" }],
      frameRate: 5,
      repeat: -1, // -1 loop eterno
    });

    this.playerR.play("characterAnimationR");

    var now = this;

    this.tweens.add({
      targets: this.playerR,
      x: 800,
      duration: 4000,
      ease: "Linear",
      repeat: 0, // 0 no se repite
      onComplete: function () {
        now.runPlayerLeft();
      },
    });
  }

  runPlayerLeft() {
    this.playerL = this.add.sprite(800, 100, "marcos0l");
    this.playerL.setDisplaySize(150, 150);
    this.playerL.setOrigin(0, -3.66);

    this.anims.create({
      key: "characterAnimationL",
      frames: [{ key: "marcos0l" }, { key: "marcos1l" }, { key: "marcos2l" }],
      frameRate: 5,
      repeat: -1, // -1 loop eterno
    });

    this.playerL.play("characterAnimationL");

    var now = this;

    this.tweens.add({
      targets: this.playerL,
      x: -400,
      duration: 4000,
      ease: "Linear",
      repeat: 0, // 0 no se repite
      onComplete: function () {
        now.runPlayerRight();
      },
    });
  }

  setLevel(level) {
    switch (level) {
      case "E":
        ENV.LEVEL = "N";
        break;
      case "N":
        ENV.LEVEL = "H";
        break;
      default:
        ENV.LEVEL = "E";
        break;
    }
    this.add
      .image(0, 0, "mode" + ENV.LEVEL)
      .setVisible(true)
      .setOrigin(-1.09, -5.25)
      .setDisplaySize(130, 65);
  }

  setVersus(versus) {
    var imgVersus = versus == "CPU" ? "vs2p" : "vsCpu";
    ENV.VERSUS = versus == "CPU" ? "2P" : "CPU";
    this.add
      .image(0, 0, imgVersus)
      .setVisible(true)
      .setOrigin(-1.09, -6.97)
      .setDisplaySize(130, 65);
  }

  setAudio(level) {
    var imgAudio = level == true ? "audioOff" : "audioOn";
    if (!level) {
      ENV.SOUND = true;
      this.soundHome.play({
        loop: true,
      });
    } else {
      ENV.SOUND = false;
      this.soundHome.stop();
    }

    this.add
      .image(0, 0, imgAudio)
      .setVisible(true)
      .setOrigin(-1.09, -8.73)
      .setDisplaySize(130, 65);
  }
}

export default Home;
