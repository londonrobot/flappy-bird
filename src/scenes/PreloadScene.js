import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('sky', './assets/sprites/sky.png');
    this.load.image('bird', './assets/sprites/bird.png');
    this.load.image('pipet', './assets/sprites/pipe-top.png');
    this.load.image('pipeb', './assets/sprites/pipe-bottom.png');
    this.load.image('pause', './assets/sprites/pause.png');
    this.load.image('back', './assets/sprites/back.png');
    this.load.spritesheet('birds', './assets/sprites/birds.png', { frameWidth: 34, frameHeight: 24 });
  }

  create() {
    this.scene.start('MenuScene');
  }
}