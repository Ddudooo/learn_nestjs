export class Result {
  private ball: number;
  private strike: number;

  constructor() {
    this.ball = 0;
    this.strike = 0;
  }

  public addBall = () => this.ball++;
  public addStrike = () => this.strike++;

  public isHomeRun(): boolean {
    return this.strike === 3;
  }

  public isOut(): boolean {
    return this.ball === 0 && this.strike === 0;
  }
}
