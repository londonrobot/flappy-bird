import Phaser from 'phaser';

export default class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2]
  }
  
  create() {
    this.add.image(0, 0, 'sky').setOrigin(.5, 0);

    if (this.config.canGoBack) {
      const backBtn = this.add.image(this.config.width - 10, this.config.height - 10, 'back')
        .setOrigin(1)
        .setScale(1)
        .setInteractive();
    
      backBtn.on('pointerdown', () => {
        this.scene.start('MenuScene');
      });
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPosition = -42;

    menu.forEach(menuItem => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPosition];
      menuItem.textGO = this.add.text(...menuPosition, menuItem.text, { fill: '#333', font: '32px Verdana' }).setOrigin(0.5, 1);
      lastMenuPosition += 42;
      setupMenuEvents(menuItem);
    });
  };
}