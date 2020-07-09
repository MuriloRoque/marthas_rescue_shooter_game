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
    }
    return 'Next';
  };

  const checkBonuses = (key) => {
    if (key === 'desert') {
      localStorage.clear();
    }
    if (localStorage.getItem('bonuses') !== null) {
      return JSON.parse(localStorage.getItem('bonuses'));
    }
    return { bonus1: 0, bonus2: 0, bonus3: 0 };
  };

  const checkScores = () => {
    if (localStorage.getItem('score') !== null) {
      return JSON.parse(localStorage.getItem('score'));
    }
    return 0;
  };

  const oasisEnemies = (number) => {
    if (number >= 0 && number <= 5) {
      return 'Fighter';
    }
    return 'Bomber';
  };

  const swampEnemies = (number) => {
    if (number >= 0 && number <= 3) {
      return 'Fighter';
    } if (number > 3 && number <= 6) {
      return 'Bomber';
    }
    return 'Chaser';
  };

  const forestEnemies = (number) => {
    if (number >= 0 && number <= 2) {
      return 'Fighter';
    } if (number > 2 && number <= 4) {
      return 'Bomber';
    } if (number > 4 && number <= 7) {
      return 'Chaser';
    }
    return 'AttackHel';
  };

  const riverEnemies = (number) => {
    if (number >= 0 && number <= 2) {
      return 'Fighter';
    } if (number > 2 && number <= 4) {
      return 'Bomber';
    } if (number > 4 && number <= 6) {
      return 'Chaser';
    } if (number > 6 && number <= 8) {
      return 'AttackHel';
    }
    return 'AttackAir';
  };

  const warzoneEnemies = (number) => {
    if (number >= 0 && number <= 1) {
      return 'Fighter';
    } if (number > 1 && number <= 2) {
      return 'Bomber';
    } if (number > 2 && number <= 4) {
      return 'Chaser';
    } if (number > 4 && number <= 6) {
      return 'AttackHel';
    } if (number > 6 && number <= 8) {
      return 'AttackAir';
    }
    return 'Multirole';
  };

  const desertEnemies = () => 'Fighter';

  const checkEnemies = (number, key) => {
    switch (key) {
      case 'oasis':
        return oasisEnemies(number);
      case 'swamp':
        return swampEnemies(number);
      case 'forest':
        return forestEnemies(number);
      case 'river':
        return riverEnemies(number);
      case 'warzone':
        return warzoneEnemies(number);
      default:
        return desertEnemies();
    }
  };

  const stageBoss = (key) => {
    switch (key) {
      case 'oasis':
        return 'Boss2';
      case 'swamp':
        return 'Boss3';
      case 'forest':
        return 'Boss4';
      case 'river':
        return 'Boss5';
      case 'warzone':
        return 'Boss6';
      default:
        return 'Boss1';
    }
  };

  return {
    updateBonuses, checkBoss, checkBonuses, checkScores, checkEnemies, stageBoss,
  };
})();

export default scenesLogic;