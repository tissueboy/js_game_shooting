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

    if(obj.type === "bullet"){

    
      this.scene.hp = this.scene.hp + this.add_hp;

      console.log("this.scene.hp="+this.scene.hp);

      if(this.scene.hpMax <= this.scene.hp){

        this.scene.hp = this.scene.hpMax;

      }

      console.log("this.scene.hp==="+this.scene.hp);


    }
    this.destroy();

  }  

}