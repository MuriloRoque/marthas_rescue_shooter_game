import scenesLogic from '../scenes/scenes_logic';

describe('The bonuses should be updated from the local storage', () => {
  test('Should return an object with empty values if the stage is desert', () => {
    localStorage.clear();
    scenesLogic.updateBonuses('desert', 'Missile + (Max 3)');
    expect(JSON.parse(localStorage.getItem('bonuses'))).toMatchObject({ bonus1: 0, bonus2: 0, bonus3: 0 });
  });
  test('Should return an object with the bonus values updated if the stage is not desert', () => {
    scenesLogic.updateBonuses('oasis', 'Missile + (Max 3)');
    expect(JSON.parse(localStorage.getItem('bonuses'))).toMatchObject({ bonus1: 1, bonus2: 0, bonus3: 0 });
  });
});