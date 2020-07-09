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

  return { updateBonuses, checkBoss };
})();

export default scenesLogic;