import { getTask } from "./lib.js";

const task = await getTask(12);

const input = task
  .split("\n")
  .filter((line) => line !== "")
  .map((line) => line.trim().split("-"))
  .reduce((prev, connection) => {
    prev[connection[0]] = [...(prev[connection[0]] || []), connection[1]];
    prev[connection[1]] = [...(prev[connection[1]] || []), connection[0]];
    return prev;
  }, {});

const getPaths = (visitSmallCaseOnlyOnce) => {
  const paths = [];

  const go = (to, previousPath, visitedSmallCave) => {
    if (to === "start") {
      return;
    }
    if (to === to.toLowerCase() && previousPath.includes(to)) {
      if (visitedSmallCave || visitSmallCaseOnlyOnce) {
        return;
      }
      visitedSmallCave = true;
    }

    previousPath.push(to);
    if (to === "end") {
      paths.push(previousPath);
      return;
    }
    const connections = input[to] || [];
    connections.forEach((connection) => {
      go(connection, [...previousPath], visitedSmallCave);
    });
  };

  const startConnections = input["start"];
  startConnections.forEach((connection) => {
    go(connection, ["start"], false);
  });
  return paths;
};

const pathsPartOne = getPaths(true);
console.log(
  `--- Part One ---\nHow many paths through this cave system are there that visit small caves at most once?\n${pathsPartOne.length}`
);

const pathsPartTwo = getPaths(false);

console.log(
  `--- Part Two ---\nHow many paths through this cave system are there?\n${pathsPartTwo.length}`
);
