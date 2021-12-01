import { getTask } from "./lib.js";

const task = await getTask(1);

const measurements = task.split("\n").map(Number);
let increases = 0;
for (let i = 1; i < measurements.length; i++) {
  if (measurements[i] > measurements[i - 1]) {
    increases++;
  }
}
console.log(increases);

export {};
