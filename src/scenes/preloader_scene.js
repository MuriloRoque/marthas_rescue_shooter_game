import Phaser from "phaser";

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }

  preload () {
    this.add.image(400, 200, 'murilo');
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#FF0000'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#000000'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('start_button', 'src/assets/images/button_start.png');
    this.load.image('start_button_click', 'src/assets/images/button_start_click.png');
    this.load.image('options_button', 'src/assets/images/button_options.png');
    this.load.image('options_button_click', 'src/assets/images/button_options_click.png');
    this.load.image('credits_button', 'src/assets/images/button_credits.png');
    this.load.image('credits_button_click', 'src/assets/images/button_credits_click.png');
    this.load.image('menu_button', 'src/assets/images/button_menu.png');
    this.load.image('menu_button_click', 'src/assets/images/button_menu_click.png');
    this.load.image('logo', 'src/assets/images/logo.png');
    this.load.image('checkedBox', 'src/assets/images/checked_box.png');
    this.load.image('box', 'src/assets/images/unchecked_box.png');
    this.load.audio('main_menu_music', ['src/assets/audio/main_menu.mp3']);
  }

  ready () {
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
};