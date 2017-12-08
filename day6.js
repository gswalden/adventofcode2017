const fs = require('fs');
const input = fs.readFileSync('./day6_input.txt', { encoding: 'utf8' })
  .trim()
  .split(/\s+/)
  .map(Number);
  
function findMax(myInput) {
  let index = 0;
  let max = myInput[index];
  for (let i = 1; i < myInput.length; i++) {
    if (myInput[i] > max) {
      index = i;
      max = myInput[i];
    }
  }    
  return index;
}

function getSet(myInput) {
  return myInput.join('-');
}

function dist(myInput, i) {
  let k = myInput[i];
  myInput[i] = 0;
  let index = i;
  while (k--) {
    if (++index >= myInput.length) index = 0;
    myInput[index]++;
  }
}

function part1() {
  const myInput = input.slice(0);
  const seen = new Set();
  let nowSet = getSet(myInput), i = 0;
  
  while (!seen.has(nowSet)) {
    seen.add(nowSet);
    dist(myInput, findMax(myInput));
    nowSet = getSet(myInput);
    i++;
  }
  return i;
}

function part2() {
  const myInput = input.slice(0);
  const seen = {};
  let nowSet = getSet(myInput), i = 0, hasCleared, hasSeen;
  
  while (!seen[nowSet]) {
    seen[nowSet] = i;
    dist(myInput, findMax(myInput));
    nowSet = getSet(myInput);
    i++;
  }
  return i - seen[nowSet];
}

console.log('Part 1: %d', part1());
console.log('Part 2: %d', part2());
