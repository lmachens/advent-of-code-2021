import { getTask } from "./lib.js";

const task = await getTask(5);

const lines = task.split("\n");

const ventLines = lines
  .filter((line) => line !== "")
  .map((line) => line.match(/[0-9]+/g).map(Number));

const maxX =
  Math.max(...ventLines.map(([x1, _y1, x2, _y2]) => Math.max(x1, x2))) + 1;
const maxY =
  Math.max(...ventLines.map(([_x1, y1, _x2, y2]) => Math.max(y1, y2))) + 1;

const getDiagram = (skipDiagonal) => {
  const diagram = new Array(maxY).fill().map(() => new Array(maxX).fill(0));

  ventLines.forEach(([x1, y1, x2, y2]) => {
    const isDiagonal = x1 !== x2 && y1 !== y2;
    if (isDiagonal && skipDiagonal) {
      return;
    }

    const xModifier = x2 === x1 ? 0 : x2 - x1 > 0 ? 1 : -1;
    const yModifier = y2 === y1 ? 0 : y2 - y1 > 0 ? 1 : -1;
    let x = x1;
    let y = y1;

    while (x !== x2 || y !== y2) {
      diagram[y][x]++;
      x += xModifier;
      y += yModifier;
    }
    diagram[y][x]++;
  });
  return diagram;
};

const getOverlappingPoints = (diagram) => {
  return diagram.flat().filter((point) => point > 1);
};

const simpleDiagram = getDiagram(true);
const simpleOverlappingPoints = getOverlappingPoints(simpleDiagram);

console.log(
  `--- Part One ---\nAt how many points do at least two lines overlap?\n${simpleOverlappingPoints.length}`
);

const complexDiagram = getDiagram(false);
const complexOverlappingPoints = getOverlappingPoints(complexDiagram);

console.log(
  `--- Part Two ---\nAt how many points do at least two lines overlap?\n${complexOverlappingPoints.length}`
);
