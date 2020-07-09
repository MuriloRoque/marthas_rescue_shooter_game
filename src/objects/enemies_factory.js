import Fighter from './enemies/fighter';
import Bomber from './enemies/bomber';
import Chaser from './enemies/chaser';
import AttackHel from './enemies/attack_hel';
import AttackAir from './enemies/attack_air';
import Multirole from './enemies/multirole';
import Boss1 from './bosses/chapter1_boss';
import Boss2 from './bosses/chapter2_boss';
import Boss3 from './bosses/chapter3_boss';
import Boss4 from './bosses/chapter4_boss';
import Boss5 from './bosses/chapter5_boss';
import Boss6 from './bosses/chapter6_boss';

const classes = {
  Fighter,
  Bomber,
  Chaser,
  AttackHel,
  AttackAir,
  Multirole,
  Boss1,
  Boss2,
  Boss3,
  Boss4,
  Boss5,
  Boss6,
};

const enemiesFactory = (name) => classes[name];

export default enemiesFactory;