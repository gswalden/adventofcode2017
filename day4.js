const fs = require('fs');
const input = fs.readFileSync('./day4_data.txt', { encoding: 'utf8' })
  .trim()
  .split('\n');

function part1() {
  let numValid = 0;
  for (const line of input) {
    const set = new Set();
    const words = line.trim().split(/\s+/);
    for (const word of words) {
      set.add(word);
    }
    numValid += Number(set.size == words.length);
  }
  return numValid;
}

function part2() {
  let numValid = 0;
  for (const line of input) {
    const set = new Set();
    const words = line.trim().split(/\s+/);
    for (const word of words) {
      set.add(word.split('').sort().join(''));
    }
    numValid += Number(set.size == words.length);
  }
  return numValid;
}

console.log('Part 1: %d', part1());
console.log('Part 2: %d', part2());
