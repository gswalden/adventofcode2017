const fs = require('fs');
const input = Number(fs.readFileSync('./day3_data.txt', { encoding: 'utf8' }).trim());

function part1() {
  let i = 1;
  while (input > i * i) {
    i += 2;
  }

  let j = i - 1, num = i * i, k;
  loop1:
  while (j >= 0) {
    k = i - 1;
    loop2:
    while (k >= 0) {
      if (k == i - 1 || k == 0 || j == 0 || j == i - 1) {
        if (num == input) {
          break loop1;
        }
        num--;
      }
      k--;
    }
    j--;
  }

  const half = Math.ceil(i / 2) - 1;
  return Math.abs(half - j) + Math.abs(half - k);
}

function part2() {
  const grid = Array(1).fill(Array(1).fill(1));
  let step = 1;
  while (true) {
    step += 2;
    for (const row of grid) {
      row.push(0);
      row.unshift(0);
    }
    grid.push(Array(step).fill(0));
    grid.unshift(Array(step).fill(0));

    let x = step - 2;
    let y = step - 1;

    while (x >= 0) {
      grid[x][y] = sumNeighbors(x, y);
      if (grid[x][y] > input) return grid[x][y];
      x--;
    }
    x = 0;
    y--;

    while (y >= 0) {
      grid[x][y] = sumNeighbors(x, y);
      if (grid[x][y] > input) return grid[x][y];
      y--;
    }
    y = 0;
    x = 1;

    while (x < step) {
      grid[x][y] = sumNeighbors(x, y);
      if (grid[x][y] > input) return grid[x][y];
      x++;
    }
    x = step - 1;
    y = 1;

    while (y < step) {
      grid[x][y] = sumNeighbors(x, y);
      if (grid[x][y] > input) return grid[x][y];
      y++;
    }
  }

  function sumNeighbors(m, n) {
    let sum = 0;
    for (let q = m - 1; q <= m + 1; q++) {
      for (let w = n - 1; w <= n + 1; w++) {
        if (grid[q] != undefined && grid[q][w] != undefined) {
          sum += grid[q][w];
        }
      }
    }
    return sum;
  }
}

console.log('Part 1: %d', part1());
console.log('Part 2: %d', part2());
