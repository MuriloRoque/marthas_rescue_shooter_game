import { putScore, getScores } from '../leaderboard';

describe('The scores and usernames should be written and read from the API', () => {
  test('Should save the score to the API', () => {
    putScore('Murilo', 1000).then(data => {
      expect(data.result).toBe('Leaderboard score created correctly.');
    });
  });
  test('Should receive an object from the API', () => {
    getScores().then(data => {
      expect(typeof data).toBe('object');
    });
  });
  test('The object should contain the created user', () => {
    getScores().then(data => {
      expect(data).toEqual(          // 1
        expect.arrayContaining([      // 2
          expect.objectContaining({   // 3
            user: 'Murilo'               // 4
          })
        ])
      )
    });
  });
  test('The object should contain the created score', () => {
    getScores().then(data => {
      test('The object should contain an user', () => {
        getScores().then(data => {
          expect(data).toEqual(          // 1
            expect.arrayContaining([      // 2
              expect.objectContaining({   // 3
                score: '1000'               // 4
              })
            ])
          )
        });
      });
    });
  });
});