import Phaser from 'phaser';
import createLabel from '../create_label';
import scenesLogic from './scenes_logic';

export default class Dialogue extends Phaser.Scene {
  constructor(scene, key, title, content, description, nextScene, boss = false) {
    super(scene);
    this.key = key;
    this.title = title;
    this.content = content;
    this.description = description;
    this.nextScene = nextScene;
    this.boss = boss;
    this.label = scenesLogic.checkBoss(this.boss);
  }

  create() {
    this.add.image(400, 300, this.key).setDisplaySize(800, 600);
    const dialog = this.rexUI.add.dialog({
      x: 400,
      y: 300,
      width: 500,
      background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x466D1D),
      title: createLabel(this, this.title).setDraggable(),
      content: createLabel(this, this.content),
      description: createLabel(this, this.description),
      actions: [
        createLabel(this, this.label),
      ],
      space: {
        left: 20,
        right: 20,
        top: -20,
        bottom: -20,
        title: 25,
        content: 25,
        description: 25,
        choices: 25,
        leftToolbarItem: 5,
        toolbarItem: 5,
        choice: 15,
        action: 15,
      },

      expand: {
        title: false,
      },

      align: {
        title: 'center',
        actions: 'right',
      },

      click: {
        mode: 'release',
      },
    })
      .setDraggable('background')
      .layout()
      .popUp(1000);

    this.print = this.add.text(0, 0, '');
    dialog
      .on('button.click', () => {
        if (this.boss) {
          this.scene.stop();
          this.scene.resume(this.nextScene);
        } else {
          this.scene.start(this.nextScene);
        }
      }, this)
      .on('button.over', (button) => {
        button.getElement('background').setStrokeStyle(1, 0xffffff);
      })
      .on('button.out', (button) => {
        button.getElement('background').setStrokeStyle();
      });
  }
}
