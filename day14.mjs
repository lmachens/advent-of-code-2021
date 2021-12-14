import { getTask } from "./lib.js";

const task = await getTask(14);

const input = task.split("\n").filter((line) => line !== "");
const [polymerTemplate, ...pairInsertions] = input;

const rules = pairInsertions.map((pair) => {
  const matched = pair.match(/(\w+) -> (\w+)/);
  return [matched[1], matched[2]];
});

const elements = {};
for (let element of polymerTemplate) {
  elements[element] = (elements[element] || 0) + 1;
}

const pairs = {};
for (let index = 0; index < polymerTemplate.length - 1; index++) {
  const pair = polymerTemplate.substring(index, index + 2);
  pairs[pair] = (pairs[pair] || 0) + 1;
}

const getCommonElementsDiff = (steps) => {
  const newElements = { ...elements };

  const doStep = (pairs) => {
    const newPairs = {};
    for (const [pair, count] of Object.entries(pairs)) {
      const rule = rules.find((rule) => rule[0] === pair);
      const element = rule[1];
      newElements[element] = (newElements[element] || 0) + count;

      const chars = pair.split("");
      const newPairA = chars[0] + element;
      const newPairB = element + chars[1];
      newPairs[newPairA] = (newPairs[newPairA] || 0) + count;
      newPairs[newPairB] = (newPairs[newPairB] || 0) + count;
    }
    return newPairs;
  };

  let newPairs = { ...pairs };
  for (let i = 0; i < steps; i++) {
    newPairs = doStep(newPairs);
  }

  const mostCommonElement = Math.max(...Object.values(newElements));
  const leastCommonElement = Math.min(...Object.values(newElements));
  const result = mostCommonElement - leastCommonElement;
  return result;
};

const resultAfter10 = getCommonElementsDiff(10);

console.log(
  `--- Part One ---\nWhat do you get if you take the quantity of the most common element and subtract the quantity of the least common element?\n${resultAfter10}`
);

const resultAfter40 = getCommonElementsDiff(40);

console.log(
  `--- Part Two ---\nWhat do you get if you take the quantity of the most common element and subtract the quantity of the least common element?\n${resultAfter40}`
);
