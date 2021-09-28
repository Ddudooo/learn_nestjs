import { Game } from './game';
import { RequestBalls } from './request';

describe('게임 테스트', () => {
  let game: Game;
  beforeEach(() => {
    game = new Game([4, 5, 6]); // 편의상 하드 코딩
  });
  it('요청 매칭 테스트', async () => {
    const req: RequestBalls = { reqBalls: [1, 2, 3] };
    const result = game.matching(req);

    expect(result.isOut()).toBeTruthy();
  });
});
