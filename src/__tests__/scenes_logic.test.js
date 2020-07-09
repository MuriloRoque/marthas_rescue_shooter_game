import scenesLogic from '../scenes/scenes_logic';

describe('The bonuses should be updated from the local storage', () => {
  test('Should return an object with the bonus values updated (bonus 1)', () => {
    scenesLogic.updateBonuses('desert', 'Missile + (Max 3)');
    expect(JSON.parse(localStorage.getItem('bonuses'))).toMatchObject({ bonus1: 1, bonus2: 0, bonus3: 0 });
  });
  test('Should return an object with the bonus values updated (bonus 2)', () => {
    scenesLogic.updateBonuses('oasis', 'Move Speed');
    expect(JSON.parse(localStorage.getItem('bonuses'))).toMatchObject({ bonus1: 1, bonus2: 1, bonus3: 0 });
  });
  test('Should return an object with the bonus values updated (bonus 3)', () => {
    scenesLogic.updateBonuses('oasis', 'Attack Speed');
    expect(JSON.parse(localStorage.getItem('bonuses'))).toMatchObject({ bonus1: 1, bonus2: 1, bonus3: 1 });
  });
});

describe('checkBoss should return the correct string if its a boss', () => {
  test('Should return "Start fight!" if its a boss', () => {
    expect(scenesLogic.checkBoss(true)).toBe('Start Fight!');
  });
  test('Should return "Next" if its not a boss', () => {
    expect(scenesLogic.checkBoss(false)).toBe('Next');
  });
});

describe('It should get the bonus from the local storage if its created', () => {
  test('Should return the bonuses object from the local storage if its there', () => {
    expect(scenesLogic.checkBonuses()).toMatchObject({ bonus1: 1, bonus2: 1, bonus3: 1 });
  });
  test('Should create and return a new bonuses object if theres none in the local storage', () => {
    localStorage.clear();
    expect(scenesLogic.checkBonuses()).toMatchObject({ bonus1: 0, bonus2: 0, bonus3: 0 });
  });
});

describe('It should get the score from the local storage if its created', () => {
  test('Should return the score from the local storage if its there', () => {
    localStorage.setItem('score', JSON.stringify(500));
    expect(scenesLogic.checkScores()).toBe(500);
  });
  test('Should create and return a new zeroed score if theres none in the local storage', () => {
    localStorage.clear();
    expect(scenesLogic.checkScores()).toBe(0);
  });
});

describe('It should return the enemies class name based on a random number and the stage', () => {
  test('Should return fighters if stage is desert', () => {
    expect(scenesLogic.checkEnemies(5, 'desert')).toBe('Fighter');
  });
  test('Should return fighters if stage is oasis', () => {
    expect(scenesLogic.checkEnemies(5, 'oasis')).toBe('Fighter');
  });
  test('Should return fighters if stage is swamp', () => {
    expect(scenesLogic.checkEnemies(3, 'swamp')).toBe('Fighter');
  });
  test('Should return fighters if stage is forest', () => {
    expect(scenesLogic.checkEnemies(2, 'forest')).toBe('Fighter');
  });
  test('Should return fighters if stage is river', () => {
    expect(scenesLogic.checkEnemies(2, 'river')).toBe('Fighter');
  });
  test('Should return fighters if stage is warzone', () => {
    expect(scenesLogic.checkEnemies(1, 'warzone')).toBe('Fighter');
  });
  test('Should return bombers if stage is oasis', () => {
    expect(scenesLogic.checkEnemies(6, 'oasis')).toBe('Bomber');
  });
  test('Should return bombers if stage is swamp', () => {
    expect(scenesLogic.checkEnemies(6, 'swamp')).toBe('Bomber');
  });
  test('Should return bombers if stage is forest', () => {
    expect(scenesLogic.checkEnemies(4, 'forest')).toBe('Bomber');
  });
  test('Should return bombers if stage is river', () => {
    expect(scenesLogic.checkEnemies(4, 'river')).toBe('Bomber');
  });
  test('Should return bombers if stage is warzone', () => {
    expect(scenesLogic.checkEnemies(2, 'warzone')).toBe('Bomber');
  });
  test('Should return chasers if stage is swamp', () => {
    expect(scenesLogic.checkEnemies(7, 'swamp')).toBe('Chaser');
  });
  test('Should return chasers if stage is forest', () => {
    expect(scenesLogic.checkEnemies(7, 'forest')).toBe('Chaser');
  });
  test('Should return chasers if stage is river', () => {
    expect(scenesLogic.checkEnemies(6, 'river')).toBe('Chaser');
  });
  test('Should return chasers if stage is warzone', () => {
    expect(scenesLogic.checkEnemies(4, 'warzone')).toBe('Chaser');
  });
  test('Should return attack helicopters if stage is forest', () => {
    expect(scenesLogic.checkEnemies(8, 'forest')).toBe('AttackHel');
  });
  test('Should return attack helicopters if stage is river', () => {
    expect(scenesLogic.checkEnemies(8, 'river')).toBe('AttackHel');
  });
  test('Should return attack helicopters if stage is warzone', () => {
    expect(scenesLogic.checkEnemies(6, 'warzone')).toBe('AttackHel');
  });
  test('Should return attack airplanes if stage is river', () => {
    expect(scenesLogic.checkEnemies(9, 'river')).toBe('AttackAir');
  });
  test('Should return attack airplanes if stage is warzone', () => {
    expect(scenesLogic.checkEnemies(8, 'warzone')).toBe('AttackAir');
  });
  test('Should return multiroles if stage is warzone', () => {
    expect(scenesLogic.checkEnemies(9, 'warzone')).toBe('Multirole');
  });
});

describe('It should return the boss class name based on the stage', () => {
  test('Should return Boss 1 if stage is desert', () => {
    expect(scenesLogic.stageBoss('desert')).toBe('Boss1');
  });
  test('Should return Boss 2 if stage is oasis', () => {
    expect(scenesLogic.stageBoss('oasis')).toBe('Boss2');
  });
  test('Should return Boss 3 if stage is swamp', () => {
    expect(scenesLogic.stageBoss('swamp')).toBe('Boss3');
  });
  test('Should return Boss 4 if stage is forest', () => {
    expect(scenesLogic.stageBoss('forest')).toBe('Boss4');
  });
  test('Should return Boss 5 if stage is river', () => {
    expect(scenesLogic.stageBoss('river')).toBe('Boss5');
  });
  test('Should return Boss 6 if stage is warzone', () => {
    expect(scenesLogic.stageBoss('warzone')).toBe('Boss6');
  });
});