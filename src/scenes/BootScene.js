import makeAnimations from '../helpers/animations';

class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }
    preload() {
        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            makeAnimations(this);
            progress.destroy();
            this.scene.start('GameScene');
        });

        this.load.image('title', 'assets/images/title.png');
        this.load.image('title_start', 'assets/images/title_start.png');
        this.load.image('btn_stop', 'assets/images/btn_stop.png');
        this.load.image('player', 'assets/images/player.png');
        this.load.image('player_line', 'assets/images/player_line.png');
        this.load.image('bullet_s', 'assets/images/bullet_s.png');

        // this.load.image('tiles', 'assets/images/tileset.png');
        // this.load.tilemapTiledJSON('map', 'assets/tilemaps/tilemap.json');
        //spritesheetは画像のサイズを合わせないとframe errorになる...
        this.load.spritesheet('ball', 'assets/images/ball.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('bullet', 'assets/images/bullet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('explosion_m', 'assets/images/explosion_m.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('explosion_s', 'assets/images/explosion_s.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('explosion_l', 'assets/images/explosion_l.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ring', 'assets/images/ring.png', { frameWidth: 16, frameHeight: 16 });

    
    }
}

export default BootScene;
