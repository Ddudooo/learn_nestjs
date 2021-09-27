export class GameOver extends Error {
  constructor(message, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GameOver);
    }
    this.message = message;
  }
}
