import Bullet from '../sprites/Bullet';
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';
import Ball from '../sprites/Ball';

class GameScene extends Phaser.Scene {
  constructor(test) {
      super({
          key: 'GameScene'
      });
  }
  create(){

    this.score = 0;
    
    this.scoreText = this.add.text(60, 20, this.score).setScrollFactor(0, 0);

    this.hp = 100;

    this.hpText = this.add.text(100, 20, this.hp).setScrollFactor(0, 0);

    this.enemyGroup = this.add.group();

    this.itemGroup = this.add.group();

    this.player = new Player({
      scene: this,
      key: 'player',
      x: 152,
      y: 320,
    });

    this.player_line = this.physics.add.sprite(160, 340, 'player_line');

    this.player_line.type = "player_line";

    // this.playerBullets = this.physics.add.group();

    this.bulletGroup = this.add.group();

    this.physics.add.overlap(this.player, this.enemyGroup, this.enemyCollision);

    this.physics.add.overlap(this.player_line, this.enemyGroup,
      function(player_line,enemy){
        
        enemy.collide(enemy,player_line)
      }
    );

    this.physics.add.overlap(this.bulletGroup, this.enemyGroup, 
      function(bullet,enemy){
        enemy.collide(enemy,bullet)
      }
    );

    
    this.keys = {
      TOUCH_START_X: 0,
      TOUCH_START_Y: 0,
      TOUCH_MOVE_X: 0,
      TOUCH_MOVE_Y: 0,
      isTOUCH: false,
      isRELEASE: false
    };

    this.input.on('pointerdown', function (pointer) {
      this.keys.TOUCH_START_X = pointer.x;
      this.keys.TOUCH_START_Y = pointer.y;
      this.keys.isTOUCH = true;
    }, this);

    this.input.on('pointerup', function (pointer) {
      this.keys.isTOUCH = false;
      this.keys.isRELEASE = true;
      this.keys.TOUCH_START_X = 0;
      this.keys.TOUCH_START_Y = 0;
      this.keys.DIRECTION = 0;
    }, this);


    this.input.on('pointermove', function (pointer) {
      this.keys.TOUCH_MOVE_X = pointer.x;
      this.keys.TOUCH_MOVE_Y = pointer.y;
    }, this);

    this.btn_stop = this.add.sprite(20, 20, 'btn_stop').setScrollFactor(0, 0).setInteractive();
    
    this.btn_stop_flg = false;

    this.btn_stop.on('pointerdown', function (pointer) {
      if(this.scene.btn_stop_flg === false){
        this.scene.btn_stop_flg = true;
        this.scene.physics.world.pause();
      }else{
        this.scene.btn_stop_flg = false;
        this.scene.physics.world.resume();
      }

    });

    this.shootTimer = this.time.addEvent({
      delay: 1000,
      callback: function() {
        // 0〜300までの乱数を吐き出す
        var randNum = Math.floor(Math.random()*(300-0)+0);
        var ball = new Ball({
          scene: this,
          key: 'ball',
          x: randNum,
          y: -40,
        });
        // laser.setScale(this.scaleX);
        this.enemyGroup.add(ball);
      },
      callbackScope: this,
      loop: true
    });

  }

  update(time, delta) {

    this.player.update(this.keys, time, delta);

    this.enemyGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );
    // this.bulletGroup.children.entries.forEach(
    //   (sprite) => {
    //     sprite.update(time, delta);
    //   }
    // );

  }
  updateScore(score){
    this.scoreText.text = Number(this.scoreText.text) + Number(score);
  }
  updateHp(damage){
    this.hpText.text = Number(this.hpText.text) - Number(damage);
  }

  enemyCollision(){
    console.log("enemyCollision");
  }
  playerLineCollision(){
    console.log("playerLineCollision");
  }

}

export default GameScene;
