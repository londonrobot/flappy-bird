import BaseScene from './BaseScene';

const pipesToRender = 4;

export default class GameScene extends BaseScene {
  constructor(config) {
    super('GameScene', config);
    
    this.bird = null;
    this.pipes = null;
    this.flapVelocity = 400;
    this.isPaused = false;
    this.isOver = false;

    this.score = 0;
    this.scoreText = '';
  }
  
  create() {
    super.create();
    this.createBird();
    this.createPipes();
    this.createColiders();
    this.createScore();
    this.createPause();
    this.handleInputs();
    this.listenToEvents();
  }

  update(dt, time) {
    this.checkGameStatus();
    this.recyclePipes();
    this.checkScore();
  }
  


  checkScore() {
    if (this.isOver) { return; }
    this.scoreText.setText(`Score: ${this.score}`);
    this.pipes.getChildren().forEach(pipe => {
      if ((Math.ceil(pipe.x) == this.bird.x) || (Math.trunc(pipe.x) == this.bird.x))  {
        this.score += 0.5;
      }
    });
  }

  listenToEvents() {
    if (this.pauseEvent) { return; }

    this.pauseEvent = this.events.on('resume', () => {
      this.initialTime = 3;
      this.countdownText = this.add.text(...this.screenCenter, 'Fly in: ' + this.initialTime, { font: '32px Verdana', fill: '#333' }).setOrigin(.5);
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.countdown,
        callbackScope: this,
        loop: true
      })
    })
  }

  countdown() {
    this.initialTime--;
    this.countdownText.setText('Fly in: ' + this.initialTime);
    if (this.initialTime <= 0) {
      this.isPaused = false;
      this.countdownText.setText('');
      this.physics.resume();
      this.timedEvent.remove();
    }
  }

  createBird() {
    this.isOver = false;
    this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'birds').setOrigin(0, 0);
    this.bird.body.gravity.y = 800;
    this.bird.setCollideWorldBounds(true);

    this.bird.anims.create({
      key: 'flap',
      frames: this.anims.generateFrameNumbers('birds', { start: 0, end: 3 }),
      frameRate: 20,
      repeat: -1
    });
    
    this.bird.play('flap');

  }

  createPipes() {
    this.pipes = this.physics.add.group();
    
    for (let i = 0; i < pipesToRender; i++) {
      const pipeU = this.pipes.create(0, 0, 'pipet')
        .setImmovable(true)
        .setOrigin(0, 1);
      const pipeL = this.pipes.create(0, 0, 'pipeb')
        .setImmovable(true)
        .setOrigin(0, 0);
      this.placePipe(pipeU, pipeL);
    }
  
    this.pipes.setVelocityX(-200);
  }

  createColiders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this)
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem('flappyScore');
    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, { font: '32px Verdana', fill: '#333'});
    this.add.text(16, 52, `Best score: ${bestScore || 0}`, { font: '18px Verdana', fill: '#333'});
  }

  createPause() {
    this.isPaused = false;
    const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause')
      .setScale(2)
      .setInteractive()
      .setOrigin(1);

    pauseButton.on('pointerdown', () => {
      this.isPaused = true;
      this.physics.pause();
      this.scene.pause();
      this.scene.launch('PauseScene');
      console.log('pause');
    });
  }

  handleInputs() {
    this.input.on('pointerdown', this.flap, this);
    this.input.keyboard.on('keydown-SPACE', this.flap, this);
  }

  checkGameStatus() {
    if ((this.bird.y <= 0) || (this.bird.getBounds().bottom >= this.config.height)) {
      this.gameOver();
    }
  }

    
  flap() {
    if (this.isPaused) { return; }
    this.bird.body.velocity.y = -this.flapVelocity;
  }

  saveBestScore() {
    const bestScoreText = localStorage.getItem('flappyScore');
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);
    if (!bestScore || bestScore < this.score) localStorage.setItem('flappyScore', this.score);
  }

  gameOver() {
    this.isOver = true;
    this.physics.pause();
    this.bird.setTint(0x4682B4);
    this.bird.stop('flap');

    this.saveBestScore();

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false
    });
  }

  placePipe(pipeUpper, pipeLower) {
    const rightMostX = this.getRightMostPipe();

    let pipeDistanceX = 330;
    let pipeVerticalDistance = 160;
    let pipeVerticalPosition = Phaser.Math.Between(100, this.config.height - 200);

    pipeUpper.x = rightMostX + pipeDistanceX;
    pipeUpper.y = pipeVerticalPosition;

    pipeLower.x = pipeUpper.x;
    pipeLower.y = pipeUpper.y + pipeVerticalDistance;
  }

  recyclePipes() {

    const tempPipes = [];
    this.pipes.getChildren().forEach(pipe => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
          this.saveBestScore();
        }
      }
    });
  }

  getRightMostPipe() {
    let rightMostX = 0;

    this.pipes.getChildren().forEach(pipe => {
      rightMostX = Math.max(pipe.x, rightMostX);
    }); 

    return rightMostX;
  }

}
