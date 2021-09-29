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
    let tempResult: number[] = [0, 0];
    for (const [index, ball] of req.reqBalls.entries()) {
      if (this.balls.includes(ball)) {
        this.isBall(ball, index) ? tempResult[1]++ : tempResult[0]++;
      }
    }
    this.turn++;
    return new Result(...tempResult);
  }

  private isBall(ball: number, index: number) {
    return this.balls.indexOf(ball) == index;
  }
}
