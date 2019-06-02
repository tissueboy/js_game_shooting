import Enemy from './Enemy';

export default class Ball extends Enemy {
  constructor(config) {
    super(config);

    this.type = "ball"
;
    this.scene.anims.create({
      key: 'ballAnime',
      frames: this.scene.anims.generateFrameNumbers(config.key, { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.play('ballAnime', true);
  }
  create(){
    
  }
  update(){
  }
}