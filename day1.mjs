import { getTask } from "./lib.js";

const task = await getTask(1);

const measurements = task.split("\n").map(Number);
let increases = 0;
for (let i = 1; i < measurements.length; i++) {
  if (measurements[i] > measurements[i - 1]) {
    increases++;
  }
}
console.log(
  `--- Part One ---\nHow many measurements are larger than the previous measurement?\n${increases}`
);

let slidingWindowIncreases = 0;
for (let i = 3; i < measurements.length; i++) {
  if (measurements[i] > measurements[i - 3]) {
    slidingWindowIncreases++;
  }
}

console.log(
  `--- Part Two ---\nHow many sums are larger than the previous sum?\n${slidingWindowIncreases}`
);
