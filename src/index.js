import Phaser from 'phaser';

import GameScene from './scenes/GameScene';
import MenuScene from './scenes/MenuScene';
import PreloadScene from './scenes/PreloadScene';
import ScoreScene from './scenes/ScoreScene';
import PauseScene from './scenes/PauseScene';

const width = 400;
const height = 600;

const sharedConfig = {
  width,
  height,
  startPosition: {
    x: width / 10,
    y: height / 2
  }
}

const Scenes = [
  PreloadScene,
  MenuScene,
  ScoreScene,
  GameScene,
  PauseScene
];

const initScenes = () => Scenes.map((scene) => new scene(sharedConfig));

const config = {
  type: Phaser.AUTO,
  ...sharedConfig,
  width: 400,
  height: 600,
  parent: "game",
  dom: {
    createContainer: true,
  },
  backgroundColor: '0x4682B4',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    }
  },
  scene: initScenes()
}

const game = new Phaser.Game(config);

