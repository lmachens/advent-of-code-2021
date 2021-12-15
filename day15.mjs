import { getTask } from "./lib.js";

const task = await getTask(15);

const input = task
  .split("\n")
  .filter((line) => line !== "")
  .map((line) => line.split("").map(Number));

const calcBathPathRisk = (map) => {
  const weights = Array(map.length)
    .fill(null)
    .map(() => new Array(map[0].length).fill(Infinity));

  const go = ([x, y], risk) => {
    const newRisk = risk + map[y][x];
    if (
      newRisk >= weights[y][x] ||
      newRisk >= weights[weights.length - 1][weights[0].length - 1]
    ) {
      return;
    }
    weights[y][x] = newRisk;

    const next = [
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
      [x, y - 1],
    ]
      .filter((pos) => map[pos[0]]?.[pos[1]])
      .sort((pos) => map[pos[0]][pos[1]]);
    next.forEach((pos) => go(pos, newRisk));
  };

  go([0, 0], -map[0][0]);

  return weights[weights.length - 1][weights[0].length - 1];
};

const bestPathRiskInput = calcBathPathRisk(input);

console.log(
  `--- Part One ---\nWhat is the lowest total risk of any path from the top left to the bottom right?\n${bestPathRiskInput}`
);

const fullMap = [...input];

for (let y = 0; y < input.length * 5; y++) {
  for (let x = 0; x < input.length * 5; x++) {
    if (fullMap[y]?.[x]) {
      continue;
    }
    const prevValue =
      fullMap[y - input.length]?.[x] || fullMap[y]?.[x - input.length];
    if (!fullMap[y]) {
      fullMap[y] = [];
    }
    fullMap[y][x] = prevValue + 1;
    if (fullMap[y][x] > 9) {
      fullMap[y][x] = 1;
    }
  }
}

const bestPathRiskFull = calcBathPathRisk(fullMap);

console.log(
  `--- Part Two ---\nUsing the full map, what is the lowest total risk of any path from the top left to the bottom right?\n${bestPathRiskFull}`
);
