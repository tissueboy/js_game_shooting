import Enemy from './Enemy';

export default class Ring extends Enemy {
  constructor(config) {
    super(config);

    this.type = "ring"
;
    this.scene.anims.create({
      key: 'ringAnime',
      frames: this.scene.anims.generateFrameNumbers(config.key, { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.play('ringAnime', true);
    this.attackPoint = 5;
    this.body.setVelocityY(40);
  }
  create(){
    
  }
  update(){
  }
}