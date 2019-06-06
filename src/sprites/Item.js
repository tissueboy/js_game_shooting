export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.add_hp = 20;

    this.type = config.type ? config.type : 'none';

    this.body.setGravity(0,0);

    this.body.setVelocityY(100);
    
  }

  collide(obj){

    console.log("obj.type="+obj.type);

    if(obj.type === "player_line"){
    
      this.scene.updateHp(this.add_hp);

    }

    this.destroy();

  }  

}