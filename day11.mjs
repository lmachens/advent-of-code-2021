import { getTask } from "./lib.js";

const task = await getTask(11);

const generateInput = () => {
  return task
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => line.trim().split("").map(Number));
};
let input = generateInput();

const increaseEnergyLevels = () => {
  const aboutToFlash = [];
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      if (++row[x] > 9) {
        aboutToFlash.push([x, y]);
      }
    }
  }
  return aboutToFlash;
};

const increase = ([x, y]) => {
  if (input[y]?.[x]) {
    if (++input[y][x] > 9) {
      flash([x, y]);
    }
  }
};

const flashed = [];
const flash = ([x, y]) => {
  if (flashed.some((item) => item[0] === x && item[1] === y)) {
    return;
  }
  flashed.push([x, y]);
  increase([x - 1, y - 1]);
  increase([x, y - 1]);
  increase([x + 1, y - 1]);
  increase([x - 1, y]);
  increase([x + 1, y]);
  increase([x - 1, y + 1]);
  increase([x, y + 1]);
  increase([x + 1, y + 1]);
  input[y][x] = 0;
};

const getTotalFlashesAfter = (steps) => {
  let flashes = 0;

  for (let step = 0; step < steps; step++) {
    const aboutToFlash = increaseEnergyLevels();
    aboutToFlash.forEach(flash);
    flashes += flashed.length;
    flashed.length = 0;
  }
  return flashes;
};

const flashes = getTotalFlashesAfter(100);
console.log(
  `--- Part One ---\nHow many total flashes are there after 100 steps?\n${flashes}`
);

const getFirstStepAllFlash = () => {
  const totalItems = input.reduce((prev, row) => prev + row.length, 0);
  let step = 0;
  while (true) {
    step++;
    const aboutToFlash = increaseEnergyLevels();
    aboutToFlash.forEach(flash);
    if (flashed.length === totalItems) {
      return step;
    }
    flashed.length = 0;
  }
};

input = generateInput();
const firstStepAllFlash = getFirstStepAllFlash();
console.log(
  `--- Part Two ---\nWhat is the first step during which all octopuses flash?\n${firstStepAllFlash}`
);
