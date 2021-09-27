export class GameGenerator {
  start(): number[] {
    let balls: Set<number>;
    while (balls.size < 3) {
      balls.add(Math.floor(Math.random() * 100 + 1));
    }
    return Array.from(balls);
  }
}
