import { getTask } from "./lib.js";

const task = await getTask(2);

const commands = task.split("\n").map((line) => {
  const values = line.split(" ");
  return {
    command: values[0],
    length: Number(values[1]),
  };
});

const position = commands.reduce(
  (pre, { command, length }) => {
    if (command === "forward") {
      pre.horizontal += length;
    } else if (command === "down") {
      pre.depth += length;
    } else if (command === "up") {
      pre.depth -= length;
    }
    return pre;
  },
  {
    horizontal: 0,
    depth: 0,
  }
);

console.log(
  `--- Part One ---\nWhat do you get if you multiply your final horizontal position by your final depth?\n${
    position.depth * position.horizontal
  }`
);

const positionWithAim = commands.reduce(
  (pre, { command, length }) => {
    if (command === "forward") {
      pre.horizontal += length;
      pre.depth += pre.aim * length;
    } else if (command === "down") {
      pre.aim += length;
    } else if (command === "up") {
      pre.aim -= length;
    }
    return pre;
  },
  {
    horizontal: 0,
    depth: 0,
    aim: 0,
  }
);

console.log(
  `--- Part Two ---\nWhat do you get if you multiply your final horizontal position by your final depth?\n${
    positionWithAim.depth * positionWithAim.horizontal
  }`
);
