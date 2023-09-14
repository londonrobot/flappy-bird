import BaseScene from './BaseScene';

export default class ScoreScene extends BaseScene {
  constructor(config) {
    super('ScoreScene', {...config, canGoBack: true});

  }

  create() {
    super.create();

    const bestScoreText = localStorage.getItem('flappyScore');
    this.add.text(...this.screenCenter, `Your best score: ${bestScoreText || 0}`, { font: '32px Verdana', fill: '#333' }).setOrigin(.5);
  }
}