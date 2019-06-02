export default class PlayerBullets extends Phaser.GameObjects.Sprite {

    constructor(config) {
      // console.log("PlayerBullets");

      super(config.scene, config.x, config.y, config.key);

      // this.body.velocity.y = 1000;
  }

}
