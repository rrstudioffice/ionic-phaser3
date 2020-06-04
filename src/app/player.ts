export class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    // ANIMS
    // Quando DUDE for para a esquerda
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    // QUando DUDE não se movimentar
    this.scene.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    // Quando DUDE for para direita
    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-160); // Movimentação do DUDE
      this.anims.play('left', true); // Animação do DUDE
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(160);
      this.anims.play('right', true);
    } else {
      this.setVelocityX(0);
      this.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-330);
    }
  }
}
