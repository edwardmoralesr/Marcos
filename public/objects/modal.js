import '../../style.css'
import Phaser from 'phaser'

// Escena del modal
class Modal extends Phaser.Scene {
    constructor() {
        super({ key: 'Modal', active: false });
    }

    getDefaultModal(now) {
        return new Promise((resolve, reject) => {

            const fontFace = new FontFace(ENV.FONT, ENV.FONT_URL);

            var pScene = now;

            const screenWidth = pScene.sys.game.config.width;
            const screenHeight = pScene.sys.game.config.height;

            const modalWidth = screenWidth / 2;
            const modalHeight = screenHeight / 2;
            const modalX = (screenWidth - modalWidth) / 2;
            const modalY = (screenHeight - modalHeight) / 2;

            pScene.modalBackground = pScene.add.rectangle((modalX * 1) + modalWidth / 2, (modalY + modalHeight / 2) * 1.08, modalHeight * 0.93, modalWidth * 1.2, 0x000, 0.5);

            pScene.modalFrame = pScene.add.rectangle(modalX + modalWidth / 2, (modalY + modalHeight / 2) * 1.08, modalHeight * 0.9, modalWidth * 1.14, 0x000);

            pScene.modalText = pScene.add.text(modalX + modalWidth / 2, (modalY + modalHeight / 2) * 0.9, pScene.infoModal.msj, { fontSize: '23.5px', fill: ENV.FONT_COLOR }).setOrigin(0.5);

            pScene.confirmModalButton = pScene.add.text((modalX + modalWidth / 2) - (modalX * 0.75), modalY + modalHeight * 0.58, pScene.infoModal.confirm, { fontSize: '27px', fill: ENV.FONT_COLOR })
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    pScene.modalBackground.setVisible(false);
                    pScene.modalFrame.setVisible(false);
                    pScene.modalText.setVisible(false);
                    pScene.confirmModalButton.setVisible(false);
                    pScene.closeModalButton.setVisible(false);

                    resolve(true);
                });

            pScene.closeModalButton = pScene.add.text((modalX + modalWidth / 2) + (modalX * 0.75), modalY + modalHeight * 0.58, pScene.infoModal.back, { fontSize: '27px', fill: ENV.FONT_COLOR })
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    pScene.modalBackground.setVisible(false);
                    pScene.modalFrame.setVisible(false);
                    pScene.modalText.setVisible(false);
                    pScene.confirmModalButton.setVisible(false);
                    pScene.closeModalButton.setVisible(false);

                    resolve(false);
                });
            //})
        });
    }
}

export default Modal