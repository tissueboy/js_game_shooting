import Item from './Item';

export default class Heart extends Item {
  constructor(config) {
    super(config);

    this.type = "heart"
;
    this.scene.anims.create({
      key: 'heartAnime',
      frames: this.scene.anims.generateFrameNumbers(config.key, { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.play('heartAnime', true);
  }
  create(){
    
  }
  update(){
  }
}