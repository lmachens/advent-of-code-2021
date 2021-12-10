import { getTask } from "./lib.js";

const task = await getTask(10);

const input = task
  .split("\n")
  .filter((line) => line !== "")
  .map((line) => line.trim().split(""));

const tags = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const syntaxErrorRating = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const middleScoreRating = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

let totalSyntaxErrorScore = 0;
const incompleteScores = [];
for (let y = 0; y < input.length; y++) {
  const expectedClosingTags = [];
  const row = input[y];
  let isCurrupted = false;
  for (let x = 0; x < row.length; x++) {
    const value = row[x];
    const closingTag = tags[value];
    if (closingTag) {
      expectedClosingTags.push(closingTag);
    } else {
      const expectedClosingTag = expectedClosingTags.pop();
      if (value !== expectedClosingTag) {
        totalSyntaxErrorScore += syntaxErrorRating[value];
        isCurrupted = true;
        break;
      }
    }
  }
  if (!isCurrupted) {
    const incompleteScore = expectedClosingTags
      .reverse()
      .reduce((prev, tag) => prev * 5 + middleScoreRating[tag], 0);
    console.log(incompleteScore);
    incompleteScores.push(incompleteScore);
  }
}

const middleIncompleteScore = incompleteScores.sort((a, b) => a - b)[
  Math.floor(incompleteScores.length / 2)
];

console.log(
  `--- Part One ---\nWhat is the total syntax error score for those errors?\n${totalSyntaxErrorScore}`
);

console.log(
  `--- Part Two ---\nWhat is the middle score?\n${middleIncompleteScore}`
);
