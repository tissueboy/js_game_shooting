export default class Laser extends Phaser.GameObjects.Sprite {
    constructor(config) {

			super(
				config.scene,
				config.x,
				config.y,
				config.vx,
				config.vy,
				config.key
			);

			config.scene.physics.world.enable(this);
			config.scene.add.existing(this);

			console.log("config.key");

			this.damage = 1;
			
			this.body.setGravity(0,0);
			this.body.setVelocity(config.vx,config.vy);

			this.scene.anims.create({
				key: 'shotAnime',
				frames: this.scene.anims.generateFrameNumbers(config.key, { start: 1, end: 1 }),
				frameRate: 10,
				repeat: -1
			});
			
		}
		create(){
			this.anims.play('shotAnime', true);
		}

    update(time, delta) {
        // this.anims.play('laserAnime', true);

        // if (!this.active) {
        //     return;
        // }
        // this.body.setVelocityY(360);

    }

    collided() {
			// if (this.body.velocity.y === 0) {
			// }
			// if (this.body.velocity.x === 0) {
			// }
    }

    explode() {
			this.destroy();
    }
}
