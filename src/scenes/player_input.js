import Phaser from 'phaser';
import { putScore } from '../leaderboard';

export default class PlayerInputScene extends Phaser.Scene {
  constructor() {
    super('PlayerInput');
  }

  create() {
    const text = this.add.text(10, 10, 'Enter your name:', { color: 'white', fontFamily: 'Arial', fontSize: '24px ' });
    const element = this.add.dom(400, 600).createFromCache('name_form');
    element.setPerspective(800);
    element.addListener('click');
    element.on('click', (event) => {
      if (event.target.name === 'confirmButton') {
        const inputUsername = element.getChildByName('username');
        if (inputUsername.value !== '') {
          const loading = this.add.text(350, 250, 'Loading...', { color: 'white', fontFamily: 'Arial', fontSize: '24px ' });
          putScore(inputUsername.value, localStorage.getItem('score')).then(() => {
            loading.destroy();
            element.scene.scene.start('Title');
          }).catch(() => {

          });
        } else {
          element.scene.tweens.add({
            targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true,
          });
        }
      }
    });
    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3',
    });
  }
}