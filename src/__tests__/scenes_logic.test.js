import scenesLogic from '../scenes/scenes_logic';

describe('The bonuses should be updated from the local storage', () => {
  test('Should return an object with empty values if the stage is desert', () => {
    localStorage.clear();
    scenesLogic.updateBonuses('desert', 'Missile + (Max 3)');
    expect(JSON.parse(localStorage.getItem('bonuses'))).toMatchObject({ bonus1: 0, bonus2: 0, bonus3: 0 });
  });
  test('Should return an object with the bonus values updated (bonus 1) if the stage is not desert', () => {
    scenesLogic.updateBonuses('oasis', 'Missile + (Max 3)');
    expect(JSON.parse(localStorage.getItem('bonuses'))).toMatchObject({ bonus1: 1, bonus2: 0, bonus3: 0 });
  });
  test('Should return an object with the bonus values updated (bonus 2) if the stage is not desert', () => {
    scenesLogic.updateBonuses('oasis', 'Move Speed');
    expect(JSON.parse(localStorage.getItem('bonuses'))).toMatchObject({ bonus1: 1, bonus2: 1, bonus3: 0 });
  });
  test('Should return an object with the bonus values updated (bonus 3) if the stage is not desert', () => {
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