import Item from '../sprites/Item';

export default class Heart extends Item {
  constructor(config) {
    super(config);
    this.recoveryPoint = 10;
    this.anims.play('waitIkaAnime', true);

  }
  hasEffect(player,item){
    player.hp = player.hp + item.recoveryPoint;
    this.scene.updateHp(player.hp);
    item.destroy();
    
  }
}