import Bullet from '../sprites/Bullet';
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';
import Ball from '../sprites/Ball';
import Ring from '../sprites/Ring';
import Item from '../sprites/Item';
import Heart from '../sprites/Heart';

class GameScene extends Phaser.Scene {
  constructor(test) {
      super({
          key: 'GameScene'
      });
  }
  create(){

    this.gameOver = false;

    this.gameOverText;

    this.score = 0;
    
    this.scoreText = this.add.text(60, 20, this.score).setScrollFactor(0, 0);

    this.hp = 100;
    this.hpMax = 100;
    
    this.hp_bar = this.add.sprite(100, 20, 'hp_bar');
    this.hp_bar.displayWidth = 100;
    this.hp_bar.displayWidthMax = 100;
    this.hp_bar.displayOriginX = 0;
    this.hp_bar.displayOriginY = 0;

    // this.hpText = this.add.text(100, 20, this.hp).setScrollFactor(0, 0);

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




    // this.hp_bar.setScale(10);


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
    this.physics.add.overlap(this.itemGroup, this.bulletGroup,
      function(item,bullet){
        
        item.collide(bullet)
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

      console.log("btn_stop click ");
      if(this.scene.btn_stop_flg === false){
        this.scene.btn_stop_flg = true;
        this.scene.physics.world.pause();
      }else{
        this.scene.btn_stop_flg = false;
        this.scene.physics.world.resume();
      }

    });

    this.shootTimer = this.time.addEvent({
      delay: 2000,
      callback: function() {
        // 0〜300までの乱数を吐き出す
        var randNum = Math.floor(Math.random()*(300-0)+0);
        var ball = new Ball({
          scene: this,
          key: 'ball',
          x: randNum,
          y: -40,
        });
        this.enemyGroup.add(ball);
      },
      callbackScope: this,
      loop: true
    });
    this.shootTimer2 = this.time.addEvent({
      delay: 1000,
      callback: function() {
        // 0〜300までの乱数を吐き出す
        var randNum = Math.floor(Math.random()*(300-0)+0);
        var ring = new Ring({
          scene: this,
          key: 'ring',
          x: randNum,
          y: -40,
        });
        this.enemyGroup.add(ring);
      },
      callbackScope: this,
      loop: true
    });

    this.heartTimer = this.time.addEvent({
      delay: 4000,
      callback: function() {
        // 0〜300までの乱数を吐き出す
        var randNum = Math.floor(Math.random()*(300-0)+0);
        var heart = new Heart({
          scene: this,
          key: 'heart',
          x: randNum,
          y: -40,
        });
        this.itemGroup.add(heart);
      },
      callbackScope: this,
      loop: true
    });

    this.menu = this.add.container(160, 200).setScrollFactor(0, 0).setInteractive();
    this.menu.setVisible(false);

    this.title_start = this.add.sprite(10, 10, 'title_start').setScrollFactor(0, 0).setInteractive();

    this.menu.add(this.title_start);

    this.title_start.on('pointerdown', function (pointer) {

      this.scene.resetGame();

    });

    this.menu.on('pointerdown', function (pointer) {
      console.log("menu click");
    });
  }

  update(time, delta) {
    if (this.gameOver === true){
      this.gameOverText = this.add.text(90, 128, "GAME OVER", {
        fontFamily: 'monospace',
        fontSize: 24,
        fontStyle: 'bold',
        color: '#ffffff',
        style:{
        }
      });
      this.menu.setVisible(true);


      this.physics.world.pause();
      // this.shootTimer = false;
      this.shootTimer.remove(false);
      return false;
    }
    this.player.update(this.keys, time, delta);

    this.enemyGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );  



  }
  updateScore(score){
    this.scoreText.text = Number(this.scoreText.text) + Number(score);
  }
  updateHp(damage){
    // this.hp_bar.scaleX = (this.hp - Number(damage) ) / this.hpMax;
    this.hp = this.hp - Number(damage);
    if(this.hp <= 0){
      this.gameOver = true;
    }else{
      this.hp_bar.displayWidth = this.hp_bar.displayWidthMax*( (this.hp - Number(damage) ) / this.hpMax);
    }
  }

  enemyCollision(){
    console.log("enemyCollision");
  }
  playerLineCollision(){
    console.log("playerLineCollision");
  }
  resetGame(){
    this.scene.start('GameScene');
  }

}

export default GameScene;
