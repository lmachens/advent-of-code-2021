import { getTask } from "./lib.js";

const task = await getTask(13);
// const task = `6,10
// 0,14
// 9,10
// 0,3
// 10,4
// 4,11
// 6,0
// 6,12
// 4,1
// 0,13
// 10,12
// 3,4
// 3,0
// 8,4
// 1,10
// 2,14
// 8,10
// 9,0

// fold along y=7
// fold along x=5`;

const input = task.split("\n");
const separator = input.indexOf("");
const coordinates = input
  .slice(0, separator)
  .filter((line) => line !== "")
  .map((line) => line.split(",").map(Number));
const foldAlongs = input
  .slice(separator + 1)
  .filter((line) => line !== "")
  .map((line) => {
    const matched = line.match(/([xy])=(\d+)/);
    return [matched[1], Number(matched[2])];
  });

const paper = [];

coordinates.forEach(([x, y]) => {
  if (!paper[y]) {
    paper[y] = [];
  }
  paper[y][x] = "#";
});

foldAlongs.forEach(([axe, number], foldIndex) => {
  if (axe === "y") {
    for (let y = 1; y <= number; y++) {
      if (paper[number + y]) {
        paper[number + y].forEach((value, index) => {
          if (!paper[number - y]) {
            paper[number - y] = [];
          }
          if (value === "#") {
            paper[number - y][index] = value;
          }
        });
      }
      if (!paper[number - y]) {
        paper[number - y] = [];
      }
    }
    paper.length = number;
  } else {
    for (let x = 1; x <= number; x++) {
      paper.forEach((_, y) => {
        if (paper[y][number + x] === "#") {
          paper[y][number - x] = paper[y][number + x];
        }
        if (!paper[y][number - x]) {
          paper[y][number - x] = ".";
        }
        delete paper[y][number + x];
      });
    }
    paper.forEach((line) => {
      line.length = number;
    });
  }

  const dots = paper.reduce(
    (prev, line) => prev + line.filter((value) => value === "#").length,
    0
  );

  if (foldIndex === 0) {
    console.log(
      `--- Part One ---\nHow many dots are visible after completing just the first fold instruction on your transparent paper?\n${dots}`
    );
  }
});

const formattedCode = paper.map((line) => line.join("")).join("\n");
console.log(
  `--- Part Two ---\nWhat code do you use to activate the infrared thermal imaging camera system?`
);
console.log(formattedCode);
