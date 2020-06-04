import * as Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  platforms: Phaser.Physics.Arcade.StaticGroup;
  player: Phaser.Physics.Arcade.Sprite;
  stars: Phaser.Physics.Arcade.Group;
  scoreText: Phaser.GameObjects.Text;
  bombs: Phaser.Physics.Arcade.Group;
  score = 0;

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.setPath('assets/');
    this.load.image('platform', 'platform.png');
    this.load.image('bomb', 'bomb.png');
    this.load.image('star', 'star.png');
    this.load.image('sky', 'sky.png');
    this.load.spritesheet('dude',
      'dude.png', { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
    this.add.image(400, 300, 'sky');
    // Plataformas
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform');

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // ANIMS
    // Quando DUDE for para a esquerda
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    // QUando DUDE não se movimentar
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    // Quando DUDE for para direita
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.physics.add.collider(this.player, this.platforms);

    // CONTROLS
    this.cursors = this.input.keyboard.createCursorKeys();

    // STARS
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160); // Movimentação do DUDE
      this.player.anims.play('left', true); // Animação do DUDE
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
