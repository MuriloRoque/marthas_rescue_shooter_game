import Fighter from '../objects/enemies/fighter';
import Bomber from '../objects/enemies/bomber';
import Chaser from '../objects/enemies/chaser';
import AttackHel from '../objects/enemies/attack_hel';
import AttackAir from '../objects/enemies/attack_air';
import Multirole from '../objects/enemies/multirole';
import Boss1 from '../objects/bosses/chapter1_boss';
import Boss2 from '../objects/bosses/chapter2_boss';
import Boss3 from '../objects/bosses/chapter3_boss';
import Boss4 from '../objects/bosses/chapter4_boss';
import Boss5 from '../objects/bosses/chapter5_boss';
import Boss6 from '../objects/bosses/chapter6_boss';

const scenesLogic = (() => {

  const updateBonuses = (key, buttonText) => {
    let bonuses;
      if (key === 'desert') {
        bonuses = { bonus1: 0, bonus2: 0, bonus3: 0 };
      } else {
        bonuses = JSON.parse(localStorage.getItem('bonuses'));
      }
      if (buttonText === 'Missile + (Max 3)') {
        bonuses.bonus1 += 1;
      } else if (buttonText === 'Move Speed') {
        bonuses.bonus2 += 1;
      } else {
        bonuses.bonus3 += 1;
      }
      localStorage.setItem('bonuses', JSON.stringify(bonuses));
  };

  const checkBoss = (boss) => {
    if (boss) {
      return 'Start Fight!';
    } else {
      return 'Next';
    }
  };

  const checkBonuses = () => {
    if (localStorage.getItem('bonuses') !== null) {
      return JSON.parse(localStorage.getItem('bonuses'));
    } else {
      return { bonus1: 0, bonus2: 0, bonus3: 0 };
    }
  };

  const checkScores = () => {
    if (localStorage.getItem('score') !== null) {
      return JSON.parse(localStorage.getItem('score'));
    } else {
      return 0;
    }
  };

  const oasisEnemies = (number, position, scene) => {
    if (number >= 0 && number <= 5) {
      return new Fighter(
        scene,
        position,
        0,
      );
    } else if (number > 5) {
      return new Bomber(
        scene,
        position,
        0,
      );
    }
  }

  const swampEnemies = (number, position, scene) => {
    if (number >= 0 && number <= 3) {
      return new Fighter(
        scene,
        position,
        0,
      );
    } else if (number > 3 && number <= 6) {
      return new Bomber(
        scene,
        position,
        0,
      );
    } else if (number > 6) {
      return new Chaser(
        scene,
        position,
        0,
      );
    }
  }

  const forestEnemies = (number, position, scene) => {
    if (number >= 0 && number <= 2) {
      return new Fighter(
        scene,
        position,
        0,
      );
    } else if (number > 2 && number <= 4) {
      return new Bomber(
        scene,
        position,
        0,
      );
    } else if (number > 4 && number <= 7) {
      return new Chaser(
        scene,
        position,
        0,
      );
    } else if (number > 7) {
      return new AttackHel(
        scene,
        position,
        0,
      );
    }
  }

  const riverEnemies = (number, position, scene) => {
    if (number >= 0 && number <= 2) {
      return new Fighter(
        scene,
        position,
        0,
      );
    } else if (number > 2 && number <= 4) {
      return new Bomber(
        scene,
        position,
        0,
      );
    } else if (number > 4 && number <= 6) {
      return new Chaser(
        scene,
        position,
        0,
      );
    } else if (number > 6 && number <= 8) {
      return new AttackHel(
        scene,
        position,
        0,
      );
    } else if (number > 8 && number <= 10) {
      return new AttackAir(
        scene,
        position,
        0,
      );
    }
  }

  const warzoneEnemies = (number, position, scene) => {
    if (number >= 0 && number <= 1) {
      return new Fighter(
        scene,
        position,
        0,
      );
    } else if (number > 1 && number <= 2) {
      return new Bomber(
        scene,
        position,
        0,
      );
    } else if (number > 2 && number <= 4) {
      return new Chaser(
        scene,
        position,
        0,
      );
    } else if (number > 4 && number <= 6) {
      return new AttackHel(
        scene,
        position,
        0,
      );
    } else if (number > 6 && number <= 8) {
      return new AttackAir(
        scene,
        position,
        0,
      );
    } else if (number > 8 && number <= 10) {
      return new Multirole(
        scene,
        position,
        0,
      );
    }
  }

  const desertEnemies = (position, scene) => {
    return new Fighter(
      scene,
      position,
      0,
    );
  }

  const checkEnemies = (number, position, scene, key) => {
    switch (key) {
      case 'oasis':
        return oasisEnemies(number, position, scene);
      case 'swamp':
        return swampEnemies(number, position, scene);
      case 'forest':
        return forestEnemies(number, position, scene);
      case 'river':
        return riverEnemies(number, position, scene);
      case 'warzone':
        return warzoneEnemies(number, position, scene);
      default:
        return desertEnemies(position, scene);
    }
  }

  const stageBoss = (key, scene) => {
    switch (key) {
      case 'oasis':
        return new Boss2(scene);
      case 'swamp':
        return new Boss3(scene);
      case 'forest':
        return new Boss4(scene);
      case 'river':
        return new Boss5(scene);
      case 'warzone':
        return new Boss6(scene);
      default:
        return new Boss1(scene);
    }
  }

  return { updateBonuses, checkBoss, checkBonuses, checkScores, checkEnemies, stageBoss };
})();

export default scenesLogic;