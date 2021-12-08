import { getTask } from "./lib.js";

const task = await getTask(8);

const input = task
  .split("\n")
  .filter((line) => line !== "")
  .map((line) => line.split(" | ").map((part) => part.split(" ")));

const simpleDigits = {
  2: 1,
  3: 7,
  4: 4,
  7: 8,
};
const simpleNumbersInput = input.map((line) =>
  line.map((part) =>
    part.filter((value) =>
      Object.keys(simpleDigits).includes(value.length.toString())
    )
  )
);

const getSimpleDigitsCount = () => {
  const outputValues = simpleNumbersInput.map((line) => line[1]);
  const count = outputValues.flat().length;
  return count;
};

const simpleDigitsCount = getSimpleDigitsCount();
console.log(
  `--- Part One ---\nIn the output values, how many times do digits 1, 4, 7, or 8 appear?\n${simpleDigitsCount}`
);

const sortWord = (word) => word.split("").sort().join("");

const getOutputValuesSum = () => {
  const outputValues = input.map((line) => {
    const flatLine = line.flat();

    const one = flatLine.find((segment) => segment.length === 2);
    const seven = flatLine.find((segment) => segment.length === 3);
    const four = flatLine.find((segment) => segment.length === 4);
    const eight = flatLine.find((segment) => segment.length === 7);

    const acf = seven.split("");
    const bcdf = four.split("");
    const cf = one.split("");
    const abcdefg = eight.split("");
    const a = acf.find((char) => !cf.includes(char));
    const bd = bcdf.filter((char) => !cf.includes(char));

    const nine = flatLine.find((segment) => {
      if (segment.length !== 6) {
        return;
      }
      const chars = segment.split("");
      const hasBDCF = [a, ...bd, ...cf].every((char) => chars.includes(char));
      return hasBDCF;
    });

    const abcdfg = nine.split("");

    const six = flatLine.find(
      (segment) =>
        segment.length === 6 &&
        cf.some((char) => !segment.split("").includes(char))
    );

    const e = abcdefg.find((char) => !abcdfg.includes(char));
    const two = flatLine.find(
      (segment) => segment.length === 5 && segment.includes(e)
    );

    const three = flatLine.find(
      (segment) =>
        segment.length === 5 &&
        cf.every((char) => segment.split("").includes(char))
    );

    const five = flatLine.find(
      (segment) => segment.length === 5 && segment !== two && segment !== three
    );
    const zero = flatLine.find(
      (segment) => segment.length === 6 && segment !== nine && segment !== six
    );

    const pattern = {
      [sortWord(zero)]: 0,
      [sortWord(one)]: 1,
      [sortWord(two)]: 2,
      [sortWord(three)]: 3,
      [sortWord(four)]: 4,
      [sortWord(five)]: 5,
      [sortWord(six)]: 6,
      [sortWord(seven)]: 7,
      [sortWord(eight)]: 8,
      [sortWord(nine)]: 9,
    };

    const outputValue = line[1].map((segment) => pattern[sortWord(segment)]);
    return Number(outputValue.join(""));
  });
  const sum = outputValues.reduce((prev, value) => prev + value, 0);
  return sum;
};

const outputValuesSum = getOutputValuesSum();
console.log(
  `--- Part Two ---\nWhat do you get if you add up all of the output values?\n${outputValuesSum}`
);
