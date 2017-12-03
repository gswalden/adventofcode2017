const fs = require('fs');
const input = fs.readFileSync('./day1_data.txt', { encoding: 'utf8' }).trim();
const length = input.length;

function part1() {
  let i = 0, sum = 0;
  while (i < length) {
    const nextIndex = (i + 1 == length) ? 0 : i + 1;
    if (input.charAt(nextIndex) == input.charAt(i)) {
      sum += Number(input.charAt(i));
    }
    i++;
  }
  return sum;
}

function part2() {
  if (length % 2 != 0) throw new Error('Odd number of characters');
  const half = length / 2;
  let i = 0, sum = 0;
  while (i < length) {
    let nextIndex = i + half;
    if (nextIndex >= length) {
      nextIndex = nextIndex - length;
    }
    if (input.charAt(nextIndex) == input.charAt(i)) {
      sum += Number(input.charAt(i));
    }
    i++;
  }

  return sum;
}

console.log('Part 1: %d', part1());
console.log('Part 2: %d', part2());
