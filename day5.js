const fs = require('fs');
const input = fs.readFileSync('./day5_data.txt', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .map(Number);

function part1() {
  const myInput = input.slice(0);
  let index = 0, i = 0;
  while (index >= 0 && index < myInput.length) {
    i++;
    const nextIndex = index + myInput[index];
    myInput[index]++;
    index = nextIndex;
  }
  return i;
}

function part2() {
  const myInput = input.slice(0);
  let index = 0, i = 0;
  while (index >= 0 && index < myInput.length) {
    i++;
    const nextIndex = index + myInput[index];
    myInput[index] += (myInput[index] >= 3 ? -1 : 1);
    index = nextIndex;
  }
  return i;
}

console.log('Part 1: %d', part1());
console.log('Part 2: %d', part2());
