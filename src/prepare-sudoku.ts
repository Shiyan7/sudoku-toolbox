import { backtrackSolve } from './backtrack-solve';
import { Sudoku } from './types';
import { Difficulty } from './types/Difficulty';

/**
 * Override the number of cells to remove from the puzzle for a given difficulty.
 *
 * @param difficulty Difficulty to override the number of cells to remove from
 * @param number The new number of cells to remove for this difficulty
 */

const numberOfCellsToRemove = {
  easy: 20,
  medium: 30,
  hard: 40,
  expert: 50,
};

/**
 * Override the number of cells to remove from the puzzle for a given difficulty.
 *
 * @param difficulty Difficulty to override the number of cells to remove from
 * @param number The new number of cells to remove for this difficulty
 */

export function overrideNumberOfCellsToRemove(difficulty: Difficulty, number: number): void {
  numberOfCellsToRemove[difficulty] = number;
}

function getRandomIndex(arr: number[]) {
  return Math.floor(Math.random() * arr.length);
}

export function prepareSudoku(sudoku: Sudoku): Sudoku {
  const { solution, difficulty, areas } = sudoku;

  let puzzle = solution.slice(0).split('');
  let emptyCells = 0;

  while (emptyCells < numberOfCellsToRemove[difficulty]) {
    const notEmptyCellIndexes = puzzle
      .map((cell, index) => (cell === '-' ? -1 : index))
      .filter((index) => index !== -1);
    const index = notEmptyCellIndexes[Math.floor(Math.random() * notEmptyCellIndexes.length)];

    if (puzzle[index] !== '-') {
      const temp = puzzle[index];
      puzzle[index] = '-';
      if (!backtrackSolve(puzzle, areas).solvable) {
        puzzle[index] = temp;
      } else {
        emptyCells++;
      }
    }
  }

  return {
    ...sudoku,
    puzzle: puzzle.join('').replaceAll('-', '0'),
  };
}
