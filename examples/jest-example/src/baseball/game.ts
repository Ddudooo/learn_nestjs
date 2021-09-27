import { GameOver } from './gameover.exception';
import { RequestBalls } from './request';
import { Result } from './result';

export class Game {
  private readonly balls: number[];
  private turn: number;

  constructor(balls: number[]) {
    this.balls = balls;
    this.turn = 0;
  }

  public matching(req: RequestBalls): Result {
    if (this.turn > 10) throw new GameOver(`Game Over!`);
    const matchResult: Result = new Result();
    for (const [index, ball] of req.reqBalls.entries()) {
      if (this.balls.includes(ball)) {
        if (this.balls.indexOf(ball) == index) matchResult.addStrike;
        else matchResult.addBall;
      }
    }
    this.turn++;
    return matchResult;
  }
}
