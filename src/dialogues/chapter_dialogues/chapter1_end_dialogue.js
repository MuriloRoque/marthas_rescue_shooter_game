export default class Chapter1EndDialogueScene extends Phaser.Scene {
  constructor () {
    super('Chapter1EndDialogue');
  }

  preload () {
  }

  create () {
    this.add.image(400, 300, 'desert').setDisplaySize(800, 600);
    var dialog = this.rexUI.add.dialog({
      x: 400,
      y: 300,
      width: 500,

      background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x466D1D),

      title: createLabel(this, 'Chapter 1 End').setDraggable(),

      content: createLabel(this, 'Mission Complete!'),

      description: createLabel(this, "Martha: 'I guess he didn't know where my father is,\nbut I found a note here!'\nNote: 'Find the giant'\nMartha: 'What does that mean?'"),

      actions: [
          createLabel(this, 'Next')
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
          mode: 'release'
      }
  })
      .setDraggable('background')
      .layout()
      .popUp(1000)

  this.print = this.add.text(0, 0, '');
  dialog
      .on('button.click', function () {
         this.scene.start('Chapter1Bonus');
      }, this)
      .on('button.over', function (button) {
          button.getElement('background').setStrokeStyle(1, 0xffffff);
      })
      .on('button.out', function (button) {
          button.getElement('background').setStrokeStyle();
      });
  }
  
}

var createLabel = function (scene, text) {
  return scene.rexUI.add.label({
      width: 40,
      height: 40,

      background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x607D3B),

      text: scene.add.text(0, 0, text, {
          fontSize: '24px'
      }),

      space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
      }
  });
}