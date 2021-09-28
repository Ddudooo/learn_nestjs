import { Game } from './game';

export class GameGenerator {
  start(): Game {
    let balls: Set<number> = new Set();
    while (balls.size < 3) {
      balls.add(Math.floor(Math.random() * 100 + 1));
    }
    return new Game(Array.from(balls));
  }
}
