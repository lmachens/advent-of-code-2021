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
    }
    if (command === "down") {
      pre.depth += length;
    }
    if (command === "up") {
      pre.depth -= length;
    }
    return pre;
  },
  {
    horizontal: 0,
    depth: 0,
  }
);

console.log(position, position.depth * position.horizontal);

export {};
