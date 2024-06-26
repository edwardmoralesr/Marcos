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
          { fontStyle: "bolder", fontSize: "26.7px", fill: ENV.FONT_COLOR }
        )
        .setOrigin(0.5);

      pScene.confirmModalButton = pScene.add
        .image(
          modalX + modalWidth / 2 - modalX * 0.85,
          modalY + modalHeight * 0.64,
          "sleeper"
        )
        .setScale(0.22)
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
          pScene.modalBackground.setVisible(false);
          pScene.modalFrame.setVisible(false);
          pScene.modalText.setVisible(false);
          pScene.confirmModalButton.setVisible(false);
          pScene.closeModalButton.setVisible(false);

          resolve("sleeper");
        });

      pScene.closeModalButton = pScene.add
        .image(
          modalX + modalWidth / 2 + modalX * 0.85,
          modalY + modalHeight * 0.64,
          "couple"
        )
        .setScale(0.22)
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
          pScene.modalBackground.setVisible(false);
          pScene.modalFrame.setVisible(false);
          pScene.modalText.setVisible(false);
          pScene.confirmModalButton.setVisible(false);
          pScene.closeModalButton.setVisible(false);

          resolve("couple");
        });

      pScene.backModalButton = pScene.add
        .text(
          modalX + modalWidth / 2 + modalX * 1.6,
          modalY + modalHeight * 0.33,
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

          resolve("back");
        });
    });
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

      now.soundLost.play();
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
          "¡¡¡WINNER!!!",
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
