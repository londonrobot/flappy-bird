import BaseScene from './BaseScene';

export default class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);

    this.menu = [
      { scene: 'GameScene', text: 'Play' },
      { scene: 'ScoreScene', text: 'Score' },
      { scene: null, text: 'Exit' },
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
      textGameObject.setStyle({ cursor: 'pointer', fill: '#4682B4'});
    });

    textGameObject.on('pointerout', () => {
      textGameObject.setStyle({ fill: '#333' });
    });

    textGameObject.on('pointerup', () => {
      menuItem.scene && this.scene.start(menuItem.scene);

      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });

  }

}