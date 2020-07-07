import Phaser from 'phaser';
import createLabel from '../create_label';

export default class Chapter5EndDialogueScene1 extends Phaser.Scene {
  constructor() {
    super('Chapter5EndDialogue1');
  }

  create() {
    this.add.image(400, 300, 'river').setDisplaySize(800, 600);
    const dialog = this.rexUI.add.dialog({
      x: 400,
      y: 300,
      width: 500,

      background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x466D1D),

      title: createLabel(this, 'Chapter 5 End').setDraggable(),

      content: createLabel(this, 'Mission Complete!'),

      description: createLabel(this, "Martha: 'I have destroyed the last outpost\nand found nothing.' Martha: 'Wait a minute,\nthe clues must mean something.'\nNigel: 'That's right, Martha, put\nthem together!' Martha: 'The sleepless\nmountain, it must be the Owl Mountains!'"),

      actions: [
        createLabel(this, 'Next'),
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
        this.scene.start('Chapter5EndDialogue2');
      }, this)
      .on('button.over', (button) => {
        button.getElement('background').setStrokeStyle(1, 0xffffff);
      })
      .on('button.out', (button) => {
        button.getElement('background').setStrokeStyle();
      });
  }
}
