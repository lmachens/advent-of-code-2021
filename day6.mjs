import { getTask } from "./lib.js";

const task = await getTask(6);
const initialLanternfishes = task
  .split(",")
  .map(Number)
  .reduce(
    (prev, lanternfish) => ({
      ...prev,
      [lanternfish]: (prev[lanternfish] || 0) + 1,
    }),
    {}
  );

const getLanternfishesCount = (days) => {
  let lanternfishes = { ...initialLanternfishes };

  for (let i = 0; i < days; i++) {
    lanternfishes = Object.entries(lanternfishes).reduce(
      (prev, [age, count]) => {
        if (--age === -1) {
          age = 6;
          prev[8] = count;
        }

        prev[age] = (prev[age] || 0) + count;
        return prev;
      },
      {}
    );
  }

  const count = Object.values(lanternfishes).reduce(
    (prev, count) => prev + count,
    0
  );
  return count;
};

const lanternfishesCountPartOne = getLanternfishesCount(80);
console.log(
  `--- Part One ---\nHow many lanternfish would there be after 80 days?\n${lanternfishesCountPartOne}`
);

const lanternfishesCountPartTwo = getLanternfishesCount(256);
console.log(
  `--- Part Two ---\nHow many lanternfish would there be after 256 days?\n${lanternfishesCountPartTwo}`
);
