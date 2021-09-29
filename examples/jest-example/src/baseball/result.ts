export class Result {
  private readonly _ball: number;
  private readonly _strike: number;

  constructor(ball?: number, strike?: number) {
    this._ball = ball || 0;
    this._strike = strike || 0;
  }

  get ball(): number {
    return this._ball;
  }

  get strike(): number {
    return this._strike;
  }

  public isHomeRun(): boolean {
    return this._strike === 3;
  }

  public isOut(): boolean {
    return this._ball === 0 && this._strike === 0;
  }
}
