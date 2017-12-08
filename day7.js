const fs = require('fs');
const input = fs.readFileSync('./day7_input.txt', { encoding: 'utf8' })
  .trim()
  .split('\n')

  
function part1() {
  function parse(line) {
    const parts = line.split(/\s+->\s+/);
    parts[0] = parts[0].split(/\s+/)[0];
    if (parts[1]) {
      parts[1] = parts[1].split(/,\s+/);
    }
    return parts;
  }  
 
  const myInput = input.slice(0);
  const hasParent = new Set();
  const hasNoParent = new Set();

  for (const line of myInput) {
    const parts = parse(line);
    if (parts[1]) {
      for (const part of parts[1]) {
        hasParent.add(part);
        hasNoParent.delete(part);
      }
    }
    if (!hasParent.has(parts[0])) {
      hasNoParent.add(parts[0]);
    }
  }
  return hasNoParent.values().next().value;
}

function part2() {
  function parse(line) {
    const parts = line.split(/\s+->\s+/);
    parts[0] = parts[0].split(/\s+/);
    const name = parts[0][0];
    const weight = parts[0][1].match(/\d+/)[0];
    if (parts[1]) {
      parts[1] = parts[1].split(/,\s+/);
    }
    return [
      name, weight, parts[1]
    ];
  }

  function Node(name) {
    this.name = name;
  }
  const myInput = input.slice(0);
  const nodes = {};

  function handleNode(name, weight, children, parent) {
    if (!nodes[name]) {
      nodes[name] = new Node(name);
    }
    if (weight) nodes[name].weight = Number(weight);
    if (parent) nodes[name].parent = parent;
    if (children) {
      nodes[name].children = [];
      for (const child of children) {
        handleNode(child, null, null, nodes[name]);
        nodes[name].children.push(nodes[child]);
      }
    }
  }

  let currentName;
  for (const line of myInput) {
    const parts = parse(line);
    handleNode(parts[0], parts[1], parts[2]);
    currentName = parts[0];
  }

  let currentNode = nodes[currentName];
  while (currentNode.parent) {
    currentNode = currentNode.parent;
  }
  let root = currentNode;
  findWeight(root);

  function findWeight(node) {
    let childWeight = 0;
    if (node.children) {
      const childWeights = node.children.map(function(child) {
        return findWeight(child);
      });
      childWeight = childWeights.reduce(function(sum, w, i) {
        if (w != childWeights[0]) {
          unevenChildren(node.children, childWeights);
          process.exit();
        }
        return sum + w;
      }, 0);
    }
    return node.weight + childWeight;
  }

  function unevenChildren(nodes, weights) {
    let badIndex = 0, goodIndex = 0;
    const memory = new Map();
    for (let i = 0; i < weights.length; i++) {
      if (memory.has(weights[i])) {
        goodIndex = i;
        memory.forEach((val, key) => {
          if (key != weights[i]) badIndex = val;
        });
        break;
      } else {
        memory.set(weights[i], i);
      }
    }

    const num = nodes[badIndex].weight - (weights[badIndex] - weights[goodIndex]);
    console.log('Part 2: %d', num);
    process.exit();
  }
}

console.log('Part 1: %s', part1());
part2();
