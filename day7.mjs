import { getTask } from "./lib.js";

const task = await getTask(7);
const horizontalPositions = task
  .split(",")
  .map(Number)
  .sort((a, b) => a - b);

const min = Math.min(...horizontalPositions);
const max = Math.max(...horizontalPositions);

const calculateMinimumFuel = (engine) => {
  let minimumFuel = Infinity;
  for (let i = min; i < max; i++) {
    const fuel = horizontalPositions.reduce(
      (prev, position) => prev + engine(position, i),
      0
    );
    if (fuel < minimumFuel) {
      minimumFuel = fuel;
    }
  }
  return minimumFuel;
};

const fuelPartOne = calculateMinimumFuel((position, i) =>
  Math.abs(position - i)
);
console.log(
  `--- Part One ---\nHow much fuel must they spend to align to that position?\n${fuelPartOne}`
);

const sum = (n) => (n === 0 ? 0 : n + sum(n - 1));

const fuelPartTwo = calculateMinimumFuel((position, i) =>
  sum(Math.abs(position - i))
);
console.log(
  `--- Part Two ---\nHow much fuel must they spend to align to that position?\n${fuelPartTwo}`
);
