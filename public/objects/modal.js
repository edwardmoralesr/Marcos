import "../../style.css";
import Phaser from "phaser";

// Escena del modal
class Modal extends Phaser.Scene {
  constructor() {
    super({ key: "Modal", active: false });
  }

  getWorldModal(now) {
    return new Promise((resolve, reject) => {
      var pScene = now;

      const screenWidth = pScene.sys.game.config.width;
      const screenHeight = pScene.sys.game.config.height;

      const modalWidth = screenWidth / 2;
      const modalHeight = screenHeight / 2;
      const modalX = (screenWidth - modalWidth) / 2;
      const modalY = (screenHeight - modalHeight) / 2;

      pScene.modalBackground = pScene.add.rectangle(
        modalX * 1 + modalWidth / 2,
        (modalY + modalHeight / 2) * 1.08,
        modalHeight * 0.93,
        modalWidth * 2.2,
        0x000,
        0.5
      );

      pScene.modalFrame = pScene.add.rectangle(
        modalX + modalWidth / 2,
        (modalY + modalHeight / 2) * 1.08,
        modalHeight * 0.9,
        modalWidth * 2.1,
        0x000
      );

      pScene.modalText = pScene.add
        .text(
          modalX + modalWidth / 2,
          (modalY + modalHeight / 2) * 0.63,
          pScene.infoModal.msj,
          { fontStyle: "bolder", fontSize: "26.7px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5);

      pScene.modalInfo = pScene.add.text(
        (modalX + modalWidth / 2) * 0.32,
        (modalY + modalHeight / 2) * 0.75,
        ENV.WORLD == "couple"
          ? "Encuentra la\n\npareja de\n\ncada Michi\n\ny cada letra\n\nen el menor tiempo posible.\n\n\nPara dos jugadores gana el\n\nque encuentre el último par."
          : ENV.WORLD == "sleeper"
          ? "Marcos quiere jugar toda la\n\nnoche sin despertarnos.\n\nResponde bien cada pregunta\n\n             y ZZzZZZzZz\n\n             profundamente.\n\n\n             Mejora tu score\n\n             en poco tiempo."
          : ENV.WORLD == "vet"
          ? "Marcos se dividió en dos\n\nde camino al Veterinario.\n\nBloquea el paso para darles\n\nsu vitamina.\n\nSelecciona una\n\nvitamina para\n\nmoverla a una\n\nposición libre entre líneas."
          : ENV.WORLD == "xhulu"
          ? "             Xhulu es el\n\n             postre favori-\n\n             to de Marcos.\n\n             Apuesta contra\n\nél por travieso. 1,2,3,4 de-\n\nposita $$$, 5 envía $$$ a 6\n\ny 6 envía $$$ al pozo. Gana\n\nquien deje al rival sin $$$."
          : 1,
        { fontStyle: "bolder", fontSize: "19px", fill: ENV.FONT_COLOR }
      );

      pScene.modalImage = pScene.add
        .image(
          ENV.WORLD == "couple"
            ? modalX + modalWidth / 2 + modalX * 0.75
            : ENV.WORLD == "sleeper"
            ? modalX + modalWidth / 2 - modalX * 0.71
            : ENV.WORLD == "vet"
            ? modalX + modalWidth / 2 + modalX * 0.9
            : ENV.WORLD == "xhulu"
            ? modalX + modalWidth / 2 - modalX * 0.71
            : 1,

          ENV.WORLD == "couple"
            ? (modalY + modalHeight) * 0.6
            : ENV.WORLD == "sleeper"
            ? (modalY + modalHeight) * 0.79
            : ENV.WORLD == "vet"
            ? (modalY + modalHeight) * 0.78
            : ENV.WORLD == "xhulu"
            ? (modalY + modalHeight) * 0.6
            : 1,
          ENV.WORLD
        )
        .setScale(0.22)
        .setOrigin(0.5)
        .setInteractive();

      pScene.backModalButton = pScene.add
        .text(
          modalX + modalWidth / 2 + modalX * 1.6,
          modalY + modalHeight * 0.1,
          pScene.infoModal.back,
          { fontStyle: "bolder", fontSize: "27px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
          pScene.modalBackground.setVisible(false);
          pScene.modalFrame.setVisible(false);
          pScene.modalText.setVisible(false);
          pScene.modalInfo.setVisible(false);
          pScene.modalImage.setVisible(false);
          pScene.rightModalButton.setVisible(false);
          pScene.leftModalButton.setVisible(false);
          pScene.playModalButton.setVisible(false);
          ENV.WORLD = "sleeper";
          resolve("back");
        });

      pScene.rightModalButton = pScene.add
        .text(
          modalX + modalWidth / 2 + modalX * 1.4,
          modalY + modalHeight * 0.99,
          ">",
          { fontStyle: "bolder", fontSize: "37px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
          this.getWorldMenu("R");
          pScene.modalBackground.setVisible(false);
          pScene.modalFrame.setVisible(false);
          pScene.modalText.setVisible(false);
          pScene.modalInfo.setVisible(false);
          pScene.modalImage.setVisible(false);
          pScene.rightModalButton.setVisible(false);
          pScene.leftModalButton.setVisible(false);
          pScene.playModalButton.setVisible(false);

          resolve("next");
        });

      pScene.leftModalButton = pScene.add
        .text(
          modalX + modalWidth / 2 + modalX * -1.4,
          modalY + modalHeight * 0.99,
          "<",
          { fontStyle: "bolder", fontSize: "37px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
          this.getWorldMenu("L");
          pScene.modalBackground.setVisible(false);
          pScene.modalFrame.setVisible(false);
          pScene.modalText.setVisible(false);
          pScene.modalInfo.setVisible(false);
          pScene.modalImage.setVisible(false);
          pScene.rightModalButton.setVisible(false);
          pScene.leftModalButton.setVisible(false);
          pScene.playModalButton.setVisible(false);

          resolve("next");
        });

      pScene.playModalButton = pScene.add
        .image(modalX + modalWidth / 2, modalY + modalHeight * 1, "playNow", {
          fontStyle: "bolder",
          fontSize: "27px",
          fill: ENV.FONT_COLOR,
        })
        .setScale(0.44)
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
          pScene.modalBackground.setVisible(false);
          pScene.modalFrame.setVisible(false);
          pScene.modalText.setVisible(false);
          pScene.modalInfo.setVisible(false);
          pScene.modalImage.setVisible(false);
          pScene.rightModalButton.setVisible(false);
          pScene.leftModalButton.setVisible(false);
          pScene.playModalButton.setVisible(false);

          resolve(ENV.WORLD);
        });
    });
  }

  getWorldMenu(nav) {
    debugger;
    switch (ENV.WORLD) {
      case "sleeper":
        ENV.WORLD = nav == "R" ? "couple" : "xhulu";
        break;
      case "couple":
        ENV.WORLD = nav == "R" ? "vet" : "sleeper";
        break;
      case "vet":
        ENV.WORLD = nav == "R" ? "xhulu" : "couple";
        break;
      case "xhulu":
        ENV.WORLD = nav == "R" ? "sleeper" : "vet";
        break;
    }
  }

  getDefaultModal(now) {
    return new Promise((resolve, reject) => {
      var pScene = now;

      const screenWidth = pScene.sys.game.config.width;
      const screenHeight = pScene.sys.game.config.height;

      const modalWidth = screenWidth / 2;
      const modalHeight = screenHeight / 2;
      const modalX = (screenWidth - modalWidth) / 2;
      const modalY = (screenHeight - modalHeight) / 2;

      pScene.modalBackground = pScene.add.rectangle(
        modalX * 1 + modalWidth / 2,
        (modalY + modalHeight / 2) * 1.08,
        modalHeight * 0.93,
        modalWidth * 1.2,
        0x000,
        0.5
      );

      pScene.modalFrame = pScene.add.rectangle(
        modalX + modalWidth / 2,
        (modalY + modalHeight / 2) * 1.08,
        modalHeight * 0.9,
        modalWidth * 1.14,
        0x000
      );

      pScene.modalText = pScene.add
        .text(
          modalX + modalWidth / 2,
          (modalY + modalHeight / 2) * 0.9,
          pScene.infoModal.msj,
          { fontStyle: "bolder", fontSize: "23.5px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5);

      pScene.confirmModalButton = pScene.add
        .text(
          modalX + modalWidth / 2 - modalX * 0.75,
          modalY + modalHeight * 0.58,
          pScene.infoModal.confirm,
          { fontStyle: "bolder", fontSize: "27px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
          pScene.modalBackground.setVisible(false);
          pScene.modalFrame.setVisible(false);
          pScene.modalText.setVisible(false);
          pScene.confirmModalButton.setVisible(false);
          pScene.closeModalButton.setVisible(false);

          resolve(true);
        });

      pScene.closeModalButton = pScene.add
        .text(
          modalX + modalWidth / 2 + modalX * 0.75,
          modalY + modalHeight * 0.58,
          pScene.infoModal.back,
          { fontStyle: "bolder", fontSize: "27px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
          pScene.modalBackground.setVisible(false);
          pScene.modalFrame.setVisible(false);
          pScene.modalText.setVisible(false);
          pScene.confirmModalButton.setVisible(false);
          pScene.closeModalButton.setVisible(false);

          resolve(false);
        });
    });
  }

  getQuestionModal(now) {
    return new Promise((resolve, reject) => {
      var pScene = now;

      const screenWidth = pScene.sys.game.config.width;
      const screenHeight = pScene.sys.game.config.height;

      const modalWidth = (screenWidth / 2) * pScene.infoModal.hQ;
      const modalHeight = screenHeight / 2;
      const modalX = (screenWidth - modalWidth) / 2;
      const modalY = ((screenHeight - modalHeight) / 2) * pScene.infoModal.yQ;

      pScene.modalBackground = pScene.add.rectangle(
        modalX + modalWidth / 2,
        (modalY + modalHeight / 2) * 1.08,
        modalHeight * 0.93,
        modalWidth * 1.2,
        0x000,
        0.5
      );
      pScene.modalFrame = pScene.add.rectangle(
        modalX + modalWidth / 2,
        (modalY + modalHeight / 2) * 1.08,
        modalHeight * 0.9,
        modalWidth * 1.14,
        0x000
      );

      pScene.modalText = pScene.add
        .text(
          modalX + modalWidth / 2,
          (modalY + modalHeight / 2) * 0.51 * pScene.infoModal.yQ,
          pScene.infoModal.question,
          { fontStyle: "bolder", fontSize: "23.5px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5);

      pScene.modalBackgroundOpOne = pScene.add.rectangle(
        (modalX + modalWidth / 2) * 0.5,
        (modalY + modalHeight / 2) * (7.45 * pScene.infoModal.yA),
        modalHeight * 0.42,
        modalWidth * 0.5,
        0x000,
        0.5
      );
      pScene.modalFrameOpOne = pScene.add.rectangle(
        (modalX + modalWidth / 2) * 0.5,
        (modalY + modalHeight / 2) * (7.45 * pScene.infoModal.yA),
        modalHeight * 0.4,
        modalWidth * 0.4,
        0x000
      );

      pScene.modalBackgroundOpTwo = pScene.add.rectangle(
        (modalX + modalWidth / 2) * 1.5,
        (modalY + modalHeight / 2) * (7.45 * pScene.infoModal.yA),
        modalHeight * 0.42,
        modalWidth * 0.5,
        0x000,
        0.5
      );
      pScene.modalFrameOpTwo = pScene.add.rectangle(
        (modalX + modalWidth / 2) * 1.5,
        (modalY + modalHeight / 2) * (7.45 * pScene.infoModal.yA),
        modalHeight * 0.4,
        modalWidth * 0.4,
        0x000
      );

      pScene.optionOneModalButton = pScene.add
        .text(
          modalX + modalWidth / 2 - modalX * pScene.infoModal.xA,
          modalY + modalHeight * pScene.infoModal.yA,
          pScene.infoModal.optionOne,
          { fontStyle: "bolder", fontSize: "27px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
          pScene.modalBackground.setVisible(false);
          pScene.modalFrame.setVisible(false);
          pScene.modalText.setVisible(false);
          pScene.optionOneModalButton.setVisible(false);
          pScene.optionTwoModalButton.setVisible(false);

          pScene.modalBackgroundOpOne.setVisible(false);
          pScene.modalBackgroundOpTwo.setVisible(false);
          pScene.modalFrameOpOne.setVisible(false);
          pScene.modalFrameOpTwo.setVisible(false);

          resolve(pScene.infoModal.optionOne);
        });

      pScene.optionTwoModalButton = pScene.add
        .text(
          modalX + modalWidth / 2 + modalX * pScene.infoModal.xA,
          modalY + modalHeight * pScene.infoModal.yA,
          pScene.infoModal.optionTwo,
          { fontStyle: "bolder", fontSize: "27px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
          pScene.modalBackground.setVisible(false);
          pScene.modalFrame.setVisible(false);
          pScene.modalText.setVisible(false);
          pScene.optionOneModalButton.setVisible(false);
          pScene.optionTwoModalButton.setVisible(false);

          pScene.modalBackgroundOpOne.setVisible(false);
          pScene.modalBackgroundOpTwo.setVisible(false);
          pScene.modalFrameOpOne.setVisible(false);
          pScene.modalFrameOpTwo.setVisible(false);

          resolve(pScene.infoModal.optionTwo);
        });
    });
  }

  getGameOverModal(now) {
    return new Promise((resolve, reject) => {
      var pScene = now;

      now.infoModal = {
        msj: "¿Volver a jugar?",
        confirm: "Si",
        back: "No",
      };

      if (ENV.SOUND) {
        now.soundLost.play();
      }
      if (now.scene.key == "Sleeper") now.background_gameover.setVisible(true);
      if (now.soundBg) now.soundBg.stop();
      if (now.soundBg1) now.soundBg1.stop();

      now.scene.get("Player").gameOverPlayer(now);

      const screenWidth = pScene.sys.game.config.width;
      const screenHeight = pScene.sys.game.config.height;

      const modalWidth = screenWidth / 2;
      const modalHeight = screenHeight / 2;
      const modalX = (screenWidth - modalWidth) / 2;
      const modalY = (screenHeight - modalHeight) / 2;

      pScene.modalBackground = pScene.add.rectangle(
        modalX * 1 + modalWidth / 2,
        (modalY + modalHeight / 2) * 1.08,
        modalHeight * 0.93,
        modalWidth * 1.2,
        0x000,
        0.5
      );

      pScene.modalFrame = pScene.add.rectangle(
        modalX + modalWidth / 2,
        (modalY + modalHeight / 2) * 1.08,
        modalHeight * 0.9,
        modalWidth * 1.14,
        0x000
      );

      pScene.modalGameOverText = pScene.add
        .text(
          modalX + modalWidth / 2,
          (modalY + modalHeight / 2) * 1.07,
          "GAME OVER",
          { fontStyle: "bolder", fontSize: "47.4px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5);

      setTimeout(function () {
        pScene.modalGameOverText.setVisible(false);
        pScene.modalText = pScene.add
          .text(
            modalX + modalWidth / 2,
            (modalY + modalHeight / 2) * 0.9,
            pScene.infoModal.msj,
            { fontStyle: "bolder", fontSize: "25.5px", fill: ENV.FONT_COLOR }
          )
          .setOrigin(0.5);

        pScene.confirmModalButton = pScene.add
          .text(
            modalX + modalWidth / 2 - modalX * 0.75,
            modalY + modalHeight * 0.58,
            pScene.infoModal.confirm,
            { fontStyle: "bolder", fontSize: "27px", fill: ENV.FONT_COLOR }
          )
          .setOrigin(0.5)
          .setInteractive()
          .on("pointerdown", () => {
            pScene.modalBackground.setVisible(false);
            pScene.modalFrame.setVisible(false);
            pScene.modalText.setVisible(false);
            pScene.confirmModalButton.setVisible(false);
            pScene.closeModalButton.setVisible(false);

            resolve(true);
          });

        pScene.closeModalButton = pScene.add
          .text(
            modalX + modalWidth / 2 + modalX * 0.75,
            modalY + modalHeight * 0.58,
            pScene.infoModal.back,
            { fontStyle: "bolder", fontSize: "27px", fill: ENV.FONT_COLOR }
          )
          .setOrigin(0.5)
          .setInteractive()
          .on("pointerdown", () => {
            pScene.modalBackground.setVisible(false);
            pScene.modalFrame.setVisible(false);
            pScene.modalText.setVisible(false);
            pScene.confirmModalButton.setVisible(false);
            pScene.closeModalButton.setVisible(false);

            resolve(false);
          });
      }, 2000);
    });
  }

  getWinnerModal(now) {
    return new Promise((resolve, reject) => {
      var pScene = now;

      now.infoModal = {
        msj: "¿Volver a jugar?",
        confirm: "Si",
        back: "No",
      };

      //now.soundLost.play();
      if (now.scene.key == "Sleeper") now.background_gameover.setVisible(true);
      if (now.soundBg) now.soundBg.stop();
      if (now.soundBg1) now.soundBg1.stop();

      now.scene.get("Player").gameOverPlayer(now);

      const screenWidth = pScene.sys.game.config.width;
      const screenHeight = pScene.sys.game.config.height;

      const modalWidth = screenWidth / 2;
      const modalHeight = screenHeight / 2;
      const modalX = (screenWidth - modalWidth) / 2;
      const modalY = (screenHeight - modalHeight) / 2;

      pScene.modalBackground = pScene.add.rectangle(
        modalX * 1 + modalWidth / 2,
        (modalY + modalHeight / 2) * 1.08,
        modalHeight * 0.93,
        modalWidth * 1.2,
        0x000,
        0.5
      );

      pScene.modalFrame = pScene.add.rectangle(
        modalX + modalWidth / 2,
        (modalY + modalHeight / 2) * 1.08,
        modalHeight * 0.9,
        modalWidth * 1.14,
        0x000
      );

      pScene.modalGameOverText = pScene.add
        .text(
          modalX + modalWidth / 2,
          (modalY + modalHeight / 2) * 1.07,
          ENV.VERSUS == "CPU"
            ? "¡¡¡GANASTE!!!"
            : "¡¡GANASTE " + now.turn + "P!!",
          { fontStyle: "bolder", fontSize: "47.4px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5);

      setTimeout(function () {
        pScene.modalGameOverText.setVisible(false);
        pScene.modalText = pScene.add
          .text(
            modalX + modalWidth / 2,
            (modalY + modalHeight / 2) * 0.9,
            pScene.infoModal.msj,
            { fontStyle: "bolder", fontSize: "25.5px", fill: ENV.FONT_COLOR }
          )
          .setOrigin(0.5);

        pScene.confirmModalButton = pScene.add
          .text(
            modalX + modalWidth / 2 - modalX * 0.75,
            modalY + modalHeight * 0.58,
            pScene.infoModal.confirm,
            { fontStyle: "bolder", fontSize: "27px", fill: ENV.FONT_COLOR }
          )
          .setOrigin(0.5)
          .setInteractive()
          .on("pointerdown", () => {
            pScene.modalBackground.setVisible(false);
            pScene.modalFrame.setVisible(false);
            pScene.modalText.setVisible(false);
            pScene.confirmModalButton.setVisible(false);
            pScene.closeModalButton.setVisible(false);

            resolve(true);
          });

        pScene.closeModalButton = pScene.add
          .text(
            modalX + modalWidth / 2 + modalX * 0.75,
            modalY + modalHeight * 0.58,
            pScene.infoModal.back,
            { fontStyle: "bolder", fontSize: "27px", fill: ENV.FONT_COLOR }
          )
          .setOrigin(0.5)
          .setInteractive()
          .on("pointerdown", () => {
            pScene.modalBackground.setVisible(false);
            pScene.modalFrame.setVisible(false);
            pScene.modalText.setVisible(false);
            pScene.confirmModalButton.setVisible(false);
            pScene.closeModalButton.setVisible(false);

            resolve(false);
          });
      }, 2000);
    });
  }
}

export default Modal;
