import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.add.image(400, 200, 'murilo');
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#FF0000',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#000000',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('background', 'src/assets/images/background.jpg');
    this.load.image('start_button', 'src/assets/images/button_start.png');
    this.load.image('start_button_click', 'src/assets/images/button_start_click.png');
    this.load.image('options_button', 'src/assets/images/button_options.png');
    this.load.image('options_button_click', 'src/assets/images/button_options_click.png');
    this.load.image('credits_button', 'src/assets/images/button_credits.png');
    this.load.image('credits_button_click', 'src/assets/images/button_credits_click.png');
    this.load.image('menu_button', 'src/assets/images/button_menu.png');
    this.load.image('menu_button_click', 'src/assets/images/button_menu_click.png');
    this.load.image('restart_button', 'src/assets/images/button_restart.png');
    this.load.image('restart_button_click', 'src/assets/images/button_restart_click.png');
    this.load.image('leaderboard_button', 'src/assets/images/button_leaderboard.png');
    this.load.image('leaderboard_button_click', 'src/assets/images/button_leaderboard_click.png');
    this.load.image('logo', 'src/assets/images/logo.png');
    this.load.image('checkedBox', 'src/assets/images/checked_box.png');
    this.load.image('box', 'src/assets/images/unchecked_box.png');
    this.load.image('microverse', 'src/assets/images/microverse.png');
    this.load.image('openart', 'src/assets/images/openart.webp');
    this.load.image('desert', 'src/assets/images/desert.png');
    this.load.image('oasis', 'src/assets/images/oasis.png');
    this.load.image('swamp', 'src/assets/images/swamp.png');
    this.load.image('forest', 'src/assets/images/forest.png');
    this.load.image('river', 'src/assets/images/river.png');
    this.load.image('warzone', 'src/assets/images/warzone.png');
    this.load.image('playerPlane', 'src/assets/images/player_plane.png');
    this.load.image('boss', 'src/assets/images/boss.png');
    this.load.image('fighter', 'src/assets/images/fighter.png');
    this.load.image('bomber', 'src/assets/images/bomber.png');
    this.load.image('chaser', 'src/assets/images/chaser.png');
    this.load.image('attack_hel', 'src/assets/images/attack_hel.png');
    this.load.image('attack_air', 'src/assets/images/attack_air.png');
    this.load.image('multirole', 'src/assets/images/multirole.png');
    this.load.image('missile', 'src/assets/images/missile.png');
    this.load.image('bomb', 'src/assets/images/bomb.png');
    this.load.spritesheet('explosion', 'src/assets/images/explosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio('explosionSound', 'src/assets/audio/explosion.mp3');
    this.load.audio('shootSound', 'src/assets/audio/missile.ogg');
    this.load.audio('main_menu_music', ['src/assets/audio/main_menu.mp3']);
    this.load.audio('desertMusic', ['src/assets/audio/desert.ogg']);
    this.load.audio('oasisMusic', ['src/assets/audio/oasis.ogg']);
    this.load.audio('swampMusic', ['src/assets/audio/swamp.mp3']);
    this.load.audio('forestMusic', ['src/assets/audio/forest.wav']);
    this.load.audio('riverMusic', ['src/assets/audio/river.mp3']);
    this.load.audio('warzoneMusic', ['src/assets/audio/warzone.mp3']);
    this.load.bitmapFont('arcade', 'src/assets/images/arcade.png', 'src/assets/text/arcade.xml');
    this.load.html('name_form', 'src/assets/text/name_form.html');
  }

  ready() {
    this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}