import Bullet from '../sprites/Bullet';
// import PlayerBullets from '../helpers/PlayerBullets';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {

    super(config.scene, config.x, config.y, config.key);

    console.log(config.scene);

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.player_shot_line = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xFFFFFF } });
    this.player_shot_line.lineStyle(2, 0xFFFFFF);

    this.BetweenPoints = Phaser.Math.Angle.BetweenPoints;
    this.velocityFromRotation = this.scene.physics.velocityFromRotation;
    this.shotVelocity = new Phaser.Math.Vector2();
    this.shotPower = 400;

    this.countTouch = 0;

    this.attackPoint = 1;

    this.touchStart = {
      x:0,
      y:0
    };
    this.touchMove = {
      x:0,
      y:0
    };
    this.anglePlayer = {
      x:0,
      y:0
    }
  }

  create(){
  }

  update(keys, time, delta) {
    if(keys.isTOUCH === true){
      this.player_shot_line.clear();
      this.player_shot_line.lineBetween(
        this.x,
        this.y,
        this.x + (keys.TOUCH_MOVE_X - keys.TOUCH_START_X),
        this.y + (keys.TOUCH_MOVE_Y - keys.TOUCH_START_Y)
      );
      this.touchStart.x = keys.TOUCH_START_X;
      this.touchStart.y = keys.TOUCH_START_Y;
      this.touchMove.x = keys.TOUCH_MOVE_X;
      this.touchMove.y = keys.TOUCH_MOVE_Y;

      this.angleShot = this.BetweenPoints(this.touchStart,this.touchMove);

    }
    if(keys.isRELEASE === true && this.countTouch === 0){

      this.velocityFromRotation(this.angleShot, this.shotPower, this.shotVelocity);
      this.countTouch++;
      this.bullet();
    }else{
      keys.isRELEASE = false;
      this.countTouch = 0;
    }

  }
  bullet(){
    // console.log("this.x==="+this.x);
    var bullet = new Bullet({
      scene: this.scene,
      key: 'bullet_s',
      x: this.x,
      y: this.y,
      vx: this.shotVelocity.x,
      vy: this.shotVelocity.y,
    });
    this.scene.bulletGroup.add(bullet);   
    this.countTouch++;     
  }
}
