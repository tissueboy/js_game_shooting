export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(config) {

			super(config.scene,config.x,config.y,config.key,config.vx,config.vy);
      
      console.log("=============ball");

      this.type = "bullet";

			config.scene.physics.world.enable(this);
			config.scene.add.existing(this);
      
      this.attackPoint = 1;
      
			this.body.setGravity(0,0);
      this.body.setVelocity(config.vx,config.vy);  	
		}

    update(time, delta) {

    }

    collided() {

    }

    explode() {
			this.destroy();
    }
}
