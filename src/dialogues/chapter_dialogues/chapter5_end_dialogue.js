export default class Chapter5EndDialogueScene extends Phaser.Scene {
  constructor () {
    super('Chapter5EndDialogue');
  }

  preload () {
  }

  create () {
    this.add.image(400, 300, 'river').setDisplaySize(800, 600);
    var dialog = this.rexUI.add.dialog({
      x: 400,
      y: 300,
      width: 500,

      background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x466D1D),

      title: createLabel(this, 'Chapter 5 End').setDraggable(),

      content: createLabel(this, 'Mission Complete!'),

      description: createLabel(this, "Martha: 'I have destroyed the last outpost and found nothing.'\nMartha: 'Wait a minute, the clues must mean something.'\nNigel: 'That's right, Martha, put them together!'\nMartha: 'The sleepless mountain, it must be the Owl Mountains!'\nMartha: 'The toy castle, could it be Książ Castle?'\nNigel: 'Yes, and I heard the Germans are building\nseven massive underground bases in that location!'\nMartha: 'Wait a minute, the 'Giant'! It must be Project Riese,\nthat's where my father is! We must not waste time, let's go!'"),

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
         this.scene.start('Chapter5Bonus');
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