import Phaser from 'phaser';
import createLabel from '../create_label';

export default class Chapter6BossDialogueScene extends Phaser.Scene {
  constructor() {
    super('Chapter6BossDialogue');
  }

  create() {
    this.add.image(400, 300, 'warzone').setDisplaySize(800, 600);
    const dialog = this.rexUI.add.dialog({
      x: 400,
      y: 300,
      width: 500,

      background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x466D1D),

      title: createLabel(this, 'Chapter 6 - Boss').setDraggable(),

      content: createLabel(this, 'The boss appeared!'),

      description: createLabel(this, "Adolf (Boss): 'I can't believe you defeated\nmy commanders!' Martha: 'Release my father\nand give up right now if you want\nto live.' Adolf (Boss): 'Unfortunately\nfor you, this fight won't be as easy\nas the previous ones!'"),

      actions: [
        createLabel(this, 'Start fight!'),
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
      .on('button.click', function buttonClick() {
        this.scene.stop();
        this.scene.resume('Game6');
      }, this)
      .on('button.over', (button) => {
        button.getElement('background').setStrokeStyle(1, 0xffffff);
      })
      .on('button.out', (button) => {
        button.getElement('background').setStrokeStyle();
      });
  }
}
