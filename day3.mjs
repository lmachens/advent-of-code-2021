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

const calcLifeSupportRating = () => {
  const oxygenGeneratorRatingLines = [...lines];
  const co2ScrubberRatingLines = [...lines];
  for (let i = 0; i < lineWidth; i++) {
    {
      const bitCount = calcBitCount(oxygenGeneratorRatingLines);
      const mostCommonBits = calcMostCommonBits(
        bitCount,
        oxygenGeneratorRatingLines.length / 2
      );

      if (oxygenGeneratorRatingLines.length > 1) {
        for (let j = 0; j < oxygenGeneratorRatingLines.length; j++) {
          if (oxygenGeneratorRatingLines[j][i] !== mostCommonBits[i]) {
            oxygenGeneratorRatingLines.splice(j, 1);
            if (oxygenGeneratorRatingLines.length === 1) {
              break;
            }
            j--;
          }
        }
      }
    }
    {
      const bitCount = calcBitCount(co2ScrubberRatingLines);
      const lessCommonBits = calcLessCommonBits(
        bitCount,
        co2ScrubberRatingLines.length / 2
      );
      if (co2ScrubberRatingLines.length > 1) {
        for (let j = 0; j < co2ScrubberRatingLines.length; j++) {
          if (co2ScrubberRatingLines[j][i] !== lessCommonBits[i]) {
            co2ScrubberRatingLines.splice(j, 1);
            if (co2ScrubberRatingLines.length === 1) {
              break;
            }
            j--;
          }
        }
      }
    }
  }

  const oxygenGeneratorRating = oxygenGeneratorRatingLines[0].join("");
  const oxygenGeneratorRatingDecimal = parseInt(oxygenGeneratorRating, 2);
  const co2ScrubberRating = co2ScrubberRatingLines[0].join("");
  const co2ScrubberRatingDecimal = parseInt(co2ScrubberRating, 2);
  return oxygenGeneratorRatingDecimal * co2ScrubberRatingDecimal;
};

const lifeSupportRating = calcLifeSupportRating();
console.log(
  `-- Part Two --\nWhat is the life support rating of the submarine?\n${lifeSupportRating}`
);
