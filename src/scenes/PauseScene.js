import BaseScene from './BaseScene';

export default class PauseScene extends BaseScene {
  constructor(config) {
    super('PauseScene', config);

    this.menu = [
      { scene: 'GameScene', text: 'Continue' },
      { scene: 'MenuScene', text: 'Exit' },
    ]
  }

  create() {
    super.create();

    this.createMenu(this.menu, this.setupMenuEvents.bind(this)); 
  }

  setupMenuEvents(menuItem) {
    const textGameObject = menuItem.textGO;
    textGameObject.setInteractive();
    textGameObject.on('pointerover', () => {
      textGameObject.setStyle({ cursor: 'pointer', fill: '#4682B4' });
    });

    textGameObject.on('pointerout', () => {
      textGameObject.setStyle({ fill: '#333' });
    });

    textGameObject.on('pointerup', () => {
      if (menuItem.scene && menuItem.text === 'Continue') {
        this.scene.stop();
        this.scene.resume(menuItem.scene);
      } else {
        this.scene.stop('GameScene');
        // старт завершает текущую, но не все открытые сцены, видимо
        this.scene.start(menuItem.scene); // menuscene
      }
    });

  }

}