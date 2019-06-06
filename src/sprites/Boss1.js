import Ball from './Ball';

export default class Boss1 extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.x = config.x;
    this.y = config.y;

    this.hp = 8;

    this.visible = false;

    this.start_pos_y = config.y;

    this.experience = config.experience ? config.experience : 10;

    this.type = config.type ? config.type : 'none';

    this.alive = true;

    this.attackPoint = 1;

    this.experience = 10;

    this.overlapCount = 0;
        
    this.body.setGravity(0,0);

    this.direction = 1;

    this.move_flg = false;

    this.alive = true;

    this.boss1_hand1 = this.scene.add.sprite(this.x, this.y + 20, 'boss1_hand1');
    this.boss1_hand1.visible = false;

    this.boss1_hand2 = this.scene.add.sprite(this.x, this.y + 20, 'boss1_hand2');
    this.boss1_hand2.visible = false;

    config.scene.physics.world.enable(this.boss1_hand1);
    config.scene.add.existing(this.boss1_hand1);

    config.scene.physics.world.enable(this.boss1_hand2);
    config.scene.add.existing(this.boss1_hand2);

    this.boss1ShotGroup = this.scene.add.group();

    this.scene.anims.create({
      key: 'explosionAnimeEnemyL',
      frames: this.scene.anims.generateFrameNumbers('explosion_l', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: 0
    });

    this.attackTimer = this.scene.time.addEvent({
      delay: 3000,
      callback: function() {
        // if()
        this.attackTimer.paused = true;
        // this.move_flg = true;
      },
      callbackScope: this,
      loop: true
    });

  }
  update(keys, time, delta) {

    if(this.alive === false){
      return false;
    }
    if(this.body.touching.none === true){
      this.overlapCount = 0;
    }
    if(this.x > 200){
      this.direction = -1;
    }
    if(this.x < 100){
      this.direction = 1;
    }
    this.x = this.x + 1 * this.direction;

    this.boss1_hand1.x = this.x - 40;
    this.boss1_hand2.x = this.x + 40;

    if(this.y > 200 && this.alive === true) {
      // this.body.velocity.y = 0;
      for(var i = 1; i < 4; i++){
        var w = 0;
        switch(i){
          case 1:
            w = this.x - 60;
            break;
          case 2:
            w = this.x;
            break;
          case 3:
            w = this.x + 60;
            break;
        }
        var ball = new Ball({
          scene: this.scene,
          key: 'ball',
          x: w,
          y: this.y,
        });
        this.scene.enemyGroup.add(ball);  
      }
      this.body.setVelocity(0,-450);
    }else{
      if(this.attackTimer.paused === true && this.body.velocity.y === 0  && this.alive === true){
        this.body.setVelocity(0,300);
        this.boss1_hand1.body.setVelocity(0,300);
        this.boss1_hand2.body.setVelocity(0,300);  
      }
    }
    if(this.attackTimer.paused === true  &&  this.y > 200 && this.alive === true){
      this.body.setVelocity(0,-450);
      this.boss1_hand1.body.setVelocity(0,-450);
      this.boss1_hand2.body.setVelocity(0,-450);  
    }

    if(this.attackTimer.paused === true  &&  this.start_pos_y > this.y && this.body.velocity.y < 0  && this.alive === true){
      this.body.setVelocity(0,0);
      this.boss1_hand1.body.setVelocity(0,0);
      this.boss1_hand2.body.setVelocity(0,0);
      this.attackTimer.paused = false;
    }
    // if( this.y <= this.y + 40 && this.hand1Timer.paused === false){
    //   this.boss1_hand1.x = this.x + 20;
    //   this.boss1_hand1.body.setVelocity(0,0);
    // }
    


    this.boss1ShotGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    ); 
  }

  collide(enemy,obj){

      if(obj.type === "bullet"){

        if(this.overlapCount === 0){
          
          enemy.hp = enemy.hp - obj.attackPoint;

          this.overlapCount++;

        }

  
      }
      if(obj.type === "player_line" && this.alive === true){

        this.scene.updateHp(enemy.attackPoint*-1);

        enemy.explode();
  
      }
  
      if(enemy.hp <= 0 ){
        this.alive = false;
        enemy.explode();
        this.scene.updateScore(enemy.experience);
      }
  }  
  explode(){

    this.alive = false;

    this.body.setVelocityY(0);

    this.alpha = 1;

    this.anims.play('explosionAnimeEnemyL', true);

    this.boss1_hand1.destroy();
    this.boss1_hand2.destroy();

    this.scene.gameClear = true;

    this.on('animationcomplete', function() {
      this.destroy();
    });
  }
  damage(){

    var boss = this;
    var tween = this.scene.tweens.add({
      targets: this,
      alpha: 0.1,
      duration: 200,
      loop: 10,
    });
    var stop = function(){
      tween.stop();
      boss.alpha = 1;
      // boss.isDamege = false;
    }
    setTimeout(stop, 1000);
  }
}