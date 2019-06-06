export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.hp = 1;

    this.experience = config.experience ? config.experience : 10;

    this.type = config.type ? config.type : 'none';

    this.alive = true;

    this.attackPoint = 1;

    this.experience = 10;

    this.overlapCount = 0;
        
    this.body.setGravity(0,0);

    this.body.setVelocityY(100);
    
    this.scene.anims.create({
      key: 'explosionAnimeEnemy',
      frames: this.scene.anims.generateFrameNumbers('explosion_s', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: 0
    });
  }

  collide(enemy,obj){
    
      if(obj.type === "bullet"){

        enemy.hp = enemy.hp - obj.attackPoint;
  
      }
      if(obj.type === "player_line" && this.alive === true){

        this.scene.updateHp(enemy.attackPoint*-1);

        enemy.explode();
  
      }
  
      if(enemy.hp <= 0 ){
        enemy.explode();
        this.scene.updateScore(enemy.experience);
      }

  }  
  explode(){

    this.alive = false;

    this.body.setVelocityY(0);

    // this.setAlpha(1);
    // this.alpha = 1;

    this.anims.play('explosionAnimeEnemy', true);

    this.on('animationcomplete', function() {
      // this.alive = false;
      this.destroy();

    });
  }
}