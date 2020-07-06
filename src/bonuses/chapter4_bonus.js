export default class Chapter4BonusScene extends Phaser.Scene {
  constructor () {
    super('Chapter4Bonus');
  }

  preload () {
  }

  create () {
    this.add.image(400, 300, 'swamp').setDisplaySize(800, 600);
    var dialog = this.rexUI.add.dialog({
      x: 400,
      y: 300,
      width: 500,

      background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x466D1D),

      title: createLabel(this, 'BONUS').setDraggable(),

      content: createLabel(this, "Nigel: 'Martha, congratulations on\ndestroying this outpost, the agency\n sent you a gift, please choose one:"),

      actions: [
          createLabel(this, 'Missile + (Max 3)'),
          createLabel(this, 'Move Speed'),
          createLabel(this, 'Attack Speed')
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
      .on('button.click', function (button) {
        let bonuses = {bonus1: 0, bonus2: 0, bonus3: 0, bonus4: 0}
        switch(button.text){
          case "Missile + (Max 3)":
            bonuses.bonus1 += 1;
            break;
          case "Move Speed":
            bonuses.bonus2 += 1;
            break;
          case "Attack Speed":
            bonuses.bonus3 += 1;
            break;
        }
        localStorage.setItem("bonuses", JSON.stringify(bonuses));
        this.scene.start('Chapter5Dialogue');
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