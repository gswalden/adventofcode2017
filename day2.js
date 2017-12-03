const fs = require('fs');
const rows = fs.readFileSync('./day2_data.txt', { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .map(row => {
    return row.split(/\s+/).filter(Boolean).map(Number).sort((a, b) => b - a);
  });

function part1() {
  let sum = 0;
  for (const row of rows) {
    let min = row[0], max = min;
    const length = row.length;
    let i = 1;
    while (i < length) {
      if (row[i] < min) min = row[i];
      if (row[i] > max) max = row[i];
      i++;
    }
    sum += max - min;
  }
  return sum;
}

function part2() {
  let sum = 0;
  for (const row of rows) {
    let i = 0;
    loop1:
    while (i < row.length - 1) {
      let k = i + 1;
      loop2:
      while (k < row.length) {
        const result = row[i] / row[k];
        if (Number.isInteger(result)) {
          sum += result;
          break loop1;
        }
        k++;
      }
      i++;
    }
  }
  return sum;
}

console.log('Part 1: %d', part1());
console.log('Part 2: %d', part2());
