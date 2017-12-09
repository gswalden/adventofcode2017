const fs = require('fs');
const input = fs.readFileSync('./day9_input.txt', { encoding: 'utf8' })
  .trim()
  .split('');

function part1and2() {
  const myInput = input.slice(0);
  const openStack = [];
  let i = 0, score = 0, garbageScore = 0;
  while (i < myInput.length) {
    const isGarbage = openStack.slice(-1) == '<';
    const char = myInput[i];
    switch (char) {
      case '{':
        if (isGarbage) {
          garbageScore++;
        } else {
          openStack.push('{');
        }
        break;

      case '}':
        if (isGarbage) {
          garbageScore++;
        } else {
          score += openStack.length;
          openStack.pop();
        }
        break;

      case '<':
        if (isGarbage) {
          garbageScore++;
        } else {
          openStack.push('<')
        }
        break;

      case '>':
        openStack.pop();
        break;

      case '!':
        i++;
        break;

      case ',':
        isGarbage && garbageScore++;
        break;

      default:
        garbageScore++;
        break;
    }
    i++;
  }
  return [score, garbageScore];
}

const answer = part1and2();
console.log('Part 1: %d', answer[0]);
console.log('Part 2: %d', answer[1]);
