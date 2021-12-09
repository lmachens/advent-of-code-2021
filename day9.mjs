import { getTask } from "./lib.js";

const task = await getTask(9);

const input = task
  .split("\n")
  .filter((line) => line !== "")
  .map((line) => line.split("").map(Number));

const lowPoints = [];

for (let y = 0; y < input.length; y++) {
  const row = input[y];
  for (let x = 0; x < row.length; x++) {
    const value = row[x];
    const valueLeft = row[x - 1];
    if (typeof valueLeft !== "undefined" && valueLeft <= value) {
      continue;
    }
    const valueRight = row[x + 1];
    if (typeof valueRight !== "undefined" && valueRight <= value) {
      continue;
    }
    const valueTop = input[y - 1]?.[x];
    if (typeof valueTop !== "undefined" && valueTop <= value) {
      continue;
    }
    const valueBottom = input[y + 1]?.[x];
    if (typeof valueBottom !== "undefined" && valueBottom <= value) {
      continue;
    }
    lowPoints.push({ x, y, value });
  }
}

const sumOfAllLowPoints = lowPoints.reduce(
  (prev, point) => prev + point.value + 1,
  0
);
console.log(
  `--- Part One ---\nWhat is the sum of the risk levels of all low points on your heightmap?\n${sumOfAllLowPoints}`
);

const basins = [];
for (let i = 0; i < lowPoints.length; i++) {
  const basin = [lowPoints[i]];

  const fillBasin = ({ x, y }) => {
    const neighborPoints = [
      {
        x: x - 1,
        y,
      },
      {
        x: x + 1,
        y,
      },
      {
        x,
        y: y - 1,
      },
      {
        x,
        y: y + 1,
      },
    ];
    neighborPoints.forEach((neighborPoint) => {
      neighborPoint.value = input[neighborPoint.y]?.[neighborPoint.x];
      if (
        typeof neighborPoint.value !== "undefined" &&
        neighborPoint.value !== 9 &&
        !basin.some(
          (point) => point.x === neighborPoint.x && neighborPoint.y === point.y
        )
      ) {
        basin.push(neighborPoint);
        fillBasin(neighborPoint);
      }
    });
  };

  fillBasin(lowPoints[i]);
  basins.push(basin);
}

const threeLargestBasins = basins
  .sort((a, b) => b.length - a.length)
  .slice(0, 3);
const totalSize = threeLargestBasins.reduce(
  (prev, basin) => prev * basin.length,
  1
);

console.log(
  `--- Part Two ---\nWhat do you get if you multiply together the sizes of the three largest basins?\n${totalSize}`
);
