const fs = require('fs');
const input = fs.readFileSync('./day8_input.txt', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .map(line => line.trim().split(/\s+/))

function part1() {
  const myInput = input.slice(0);
  const record = {};
  let max = -Infinity;
  for (const line of myInput) {
    record[line[0]] = record[line[0]] || 0;
    record[line[4]] = record[line[4]] || 0;
    if (run(record[line[4]], line[5], line[6])) {
      if (line[1] == 'inc') {
        record[line[0]] += Number(line[2]);
      } else if (line[1] == 'dec') {
        record[line[0]] -= Number(line[2]);
      }
      if (record[line[0]] > max) {
        max = record[line[0]];
      }
    }
  }
  process.nextTick(() => {
    console.log('Part 2: %d', max);
  })
  return Math.max.apply(null, Object.values(record));

  function run(a, op, b) {
    return eval(`${a} ${op} ${b}`);
  }
}

console.log('Part 1: %d', part1());
