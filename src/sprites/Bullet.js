export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(config) {

			super(config.scene,config.x,config.y,config.key,config.vx,config.vy);
      
      this.type = "bullet";

			config.scene.physics.world.enable(this);
			config.scene.add.existing(this);
      
      this.attackPoint = 1;
      
			this.body.setGravity(0,0);
      this.body.setVelocity(config.vx,config.vy);  	
		}

    update(time, delta) {
      if(this.y > 480 || this.y < 0 || this.x < 0 || this.x > 320){
        this.destroy();
      }
    }

    collided() {

    }

    explode() {
			this.destroy();
    }
}
