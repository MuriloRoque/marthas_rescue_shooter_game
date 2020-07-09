const dialogues = () => {
  const terrains = ['desert', 'oasis', 'swamp', 'forest', 'river', 'warzone'];
  const initialDialogues = [`'This is it, the beginning of my mission,\n
I will never give up, I need to save him!'`,
  '\'Let\'s keep on moving, hang in there, dad!',
  '\'It\'s only the beginning, let\'s move!\'',
  '\'Almost there, I must not fail!\'',
  `'This is the last command post,\n
this must contain the final piece of the puzzle!'`,
  '\'Dad, I\'m coming, hang in there!\''];
  const bossDialogues = [`Philip (Boss): 'How dare you invade my outpost?\n
Who are you?'\n
Martha: 'Where's him?'\n
Philip (Boss): 'Who are you talking about?\n
Get her!'`,
  `Karl (boss): 'Welcome, this will be the end,\n
prepare yourself!'\n
Martha: 'I'm ready to rumble!'`,
  `Robert (boss): 'Give up already,\n
you won't get past me!'\n
Martha: 'Don't flatter yourself, come on!'`,
  `Hermann (boss): 'This is the end of the road\n
for you!' Martha: 'It is the end of the road,\n
but not for me!'`,
  `Heinrich (boss): 'You have finally arrived,\n
let me give you a very warm welcome!'\n
Martha: 'This is for my father, be gone!'`,
  `Adolf (boss): 'I can't believe you defeated\n
my commanders!' Martha: 'Release my father\n
and give up right now if you want\n
to live.' Adolf (Boss): 'Unfortunately\n
for you, this fight won't be as easy\n
as the previous ones!'`];
  const endDialogues = [`'I guess he didn't know where\n
my father is, but I found a\n
note here!' Note: 'Find the\n
giant' Martha: 'What does that mean?'`,
  '\'Tell me where he is now!\'\nKarl (Boss): \'You won\'t get away with this,\nthe seven must live!\'\nMartha: \'What do you mean?\'\nMartha: \'He\'s gone...\'',
  '\'This is the third one and\nI still got nothing.Huh, what\'s\nthat written on the wall?\'\nWall: \'Your destiny is in the sleepless mountain\'\nMartha: \'Hmmm\'',
  '\'What is that? A chest?\'\n** opens the chest **\nMartha: \'There\'s a toy castle inside,\nvery curious.\'',
  '\'I have destroyed the last outpost\nand found nothing.\' Martha: \'Wait a minute,\nthe clues must mean something.\'\nNigel: \'That\'s right, Martha, put\nthem together!\' Martha: \'The sleepless\nmountain, it must be the Owl Mountains!\'',
  '\'The toy castle, could it be\nKsiąż Castle?\'Nigel: \'Yes, and I\nheard the Germans are building\nseven massive underground bases\nin that location!\'Martha: \'Wait\na minute, the \'Giant\'! It must\nbe Project Riese, that\'s where my\nfather is! We must not waste time,\nlet\'s go!\'',
  '\'He\'s unconscious, I must find\nmy father and leave as fast as possible.\'\nFather: \'Martha, in here!\'\nMartha: \'I have finally found you,\ncome on, we don\'t have much time!\'\n** huge explosion **',
  '\'I am so happy I found you,\nyou must go back to England,\nyou will be safe there.\'\nFather: \'Martha, this war is far\nfrom over, I won\'t stop fighting\'\nMartha: \'How did you end up being\ncaptured?\' Father: \'It\'s a long story,\nbut a very good one,\nit all began when I...\''];
  return [terrains, initialDialogues, bossDialogues, endDialogues];
};

export default dialogues;