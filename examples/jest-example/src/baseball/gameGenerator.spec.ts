import { Game } from './game';
import { GameGenerator } from './gameGenerator';

describe('숫자 야구 생성', () => {
  let generator: GameGenerator;
  beforeEach(() => {
    generator = new GameGenerator();
  });

  it('시작요청이 들어오면 게임이 생성되어야 한다.', async () => {
    expect(generator.start()).toBeInstanceOf(Game);
  });
});
