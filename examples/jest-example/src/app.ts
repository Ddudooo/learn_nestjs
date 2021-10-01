import * as chalk from 'chalk';
import { createInterface } from 'readline';
import { Game } from './baseball/game';
import { GameGenerator } from './baseball/gameGenerator';
import { RequestBalls } from './baseball/request';

const log = console.log;
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
const gameGenerator = new GameGenerator();

log(chalk.blue.bgWhite.bold(`숫자 야구 게임을 시작합니다!`));
const game: Game = gameGenerator.start();
log(chalk.blue.bgWhite.bold(`숫자를 입력하세요!`));
const inputNumbers: Set<number> = new Set();

rl.on('line', (line) => {
  const inputs = line
    .split(' ')
    .map((el) => parseInt(el))
    .filter((num) => num >= 0 && num < 10);

  inputs.forEach((num) => inputNumbers.add(num));
  log(chalk.bgYellow.bold(`${[...inputNumbers]}`));
  if (inputNumbers.size >= 3) {
    const req: RequestBalls = { reqBalls: [...inputNumbers] };
    const result = game.matching(req);
    console.log(result);
    inputNumbers.clear();
    if (result.isHomeRun) {
      rl.close();
    }
  }
}).on('close', () => {
  log(chalk.black.bgRed.bold(`INPUT CLOSE`));
});
