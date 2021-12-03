import { getTask } from "./lib.js";

const task = await getTask(3);

const diagnosticReport = task.split("\n");

const lines = diagnosticReport.map((line) => line.split("").map(Number));

const lineWidth = lines[0].length;

const calcBitCount = (lines) => {
  const bitsCount = lines.reduce((prev, line) => {
    line.forEach((value, index) => (prev[index] += value));
    return prev;
  }, Array(lineWidth).fill(0));
  return bitsCount;
};

const calcMostCommonBits = (bitsCount, halfLinesLength) => {
  return bitsCount.map((line) => (line >= halfLinesLength ? 1 : 0));
};

const calcLessCommonBits = (bitsCount, halfLinesLength) => {
  return bitsCount.map((line) => (line >= halfLinesLength ? 0 : 1));
};

const calcPowerConsumption = () => {
  const bitCount = calcBitCount(lines);
  const halfLinesLength = lines.length / 2;
  const mostCommonBits = calcMostCommonBits(bitCount, halfLinesLength);
  const lessCommonBits = calcLessCommonBits(bitCount, halfLinesLength);
  const gammaRate = mostCommonBits.join("");
  const gammaRateDecimal = parseInt(gammaRate, 2);
  const epsilonRate = lessCommonBits.join("");
  const epsilonRateDecimal = parseInt(epsilonRate, 2);

  return gammaRateDecimal * epsilonRateDecimal;
};
const powerConsumption = calcPowerConsumption();
console.log(
  `--- Part One ---\nWhat is the power consumption of the submarine?\n${powerConsumption}`
);

const calcRating = (lines, bitCriteria) => {
  const linesClone = [...lines];
  for (let i = 0; i < lineWidth; i++) {
    const bitCount = calcBitCount(linesClone);
    const commonBits = bitCriteria(bitCount, linesClone.length / 2);

    if (linesClone.length > 1) {
      for (let j = 0; j < linesClone.length; j++) {
        if (linesClone[j][i] !== commonBits[i]) {
          linesClone.splice(j, 1);
          if (linesClone.length === 1) {
            break;
          }
          j--;
        }
      }
    }
  }
  const rating = linesClone[0].join("");
  const ratingDecimal = parseInt(rating, 2);
  return ratingDecimal;
};

const calcLifeSupportRating = () => {
  const oxygenRating = calcRating(lines, calcMostCommonBits);
  const co2Rating = calcRating(lines, calcLessCommonBits);
  return oxygenRating * co2Rating;
};

const lifeSupportRating = calcLifeSupportRating();
console.log(
  `-- Part Two --\nWhat is the life support rating of the submarine?\n${lifeSupportRating}`
);
