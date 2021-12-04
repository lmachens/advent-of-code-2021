import { getTask } from "./lib.js";

const task = await getTask(4);

const lines = task.split("\n");
const drawnNumbers = lines[0].split(",").map(Number);
const boardLines = lines.slice(2);
const boards = [];
for (let i = 0; i < boardLines.length; i += 6) {
  const board = boardLines.slice(i, i + 5).map((line) =>
    line
      .split(" ")
      .filter((value) => value !== "")
      .map((value) => ({
        number: Number(value),
        marked: false,
      }))
  );

  boards.push(board);
}

const getWinningBoard = () => {
  for (let i = 0; i < drawnNumbers.length; i++) {
    const drawnNumber = drawnNumbers[i];
    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];
      for (let k = 0; k < board.length; k++) {
        const line = board[k];
        const cellWithSameNumberIndex = line.findIndex(
          (cell) => cell.number === drawnNumber
        );
        if (cellWithSameNumberIndex !== -1) {
          line[cellWithSameNumberIndex].marked = true;
          const rowIsComplete = line.every((cell) => cell.marked);
          const columnIsComplete = board.every(
            (line) => line[cellWithSameNumberIndex].marked
          );
          if (rowIsComplete | columnIsComplete) {
            return {
              board,
              lastNumber: drawnNumber,
            };
          }
        }
      }
    }
  }
};

const calculateFinalScore = (result) => {
  const sumOfUnmarkedMarkers = result.board.reduce((prev, line) => {
    const unmarkedCells = line.filter((cell) => !cell.marked);
    const sum = unmarkedCells.reduce((prev, cell) => prev + cell.number, 0);
    return prev + sum;
  }, 0);

  return sumOfUnmarkedMarkers * result.lastNumber;
};

const winningBoardResult = getWinningBoard();
const finalScore = calculateFinalScore(winningBoardResult);
console.log(
  `--- Part One ---\nWhat will your final score be if you choose that board?\n${finalScore}`
);

const getLoosingBoard = () => {
  const loosingBoards = [...boards];
  for (let i = 0; i < drawnNumbers.length; i++) {
    const drawnNumber = drawnNumbers[i];
    for (let j = 0; j < loosingBoards.length; j++) {
      const board = loosingBoards[j];
      for (let k = 0; k < board.length; k++) {
        const line = board[k];
        const cellWithSameNumberIndex = line.findIndex(
          (cell) => cell.number === drawnNumber
        );
        if (cellWithSameNumberIndex !== -1) {
          line[cellWithSameNumberIndex].marked = true;
          const rowIsComplete = line.every((cell) => cell.marked);
          const columnIsComplete = board.every(
            (line) => line[cellWithSameNumberIndex].marked
          );
          if (rowIsComplete || columnIsComplete) {
            if (loosingBoards.length === 1) {
              return {
                board: loosingBoards[0],
                lastNumber: drawnNumber,
              };
            }
            loosingBoards.splice(j, 1);
            j--;
          }
        }
      }
    }
  }
};

const loosingBoardResult = getLoosingBoard();
const loosingBoardFinalScore = calculateFinalScore(loosingBoardResult);
console.log(
  `--- Part Two ---\nOnce it wins, what would its final score be?\n${loosingBoardFinalScore}`
);
