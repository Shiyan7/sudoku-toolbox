import { prepareSudoku } from './prepare-sudoku';
import { Sudoku } from './types/Sudoku';
import { Difficulty } from './types/Difficulty';
import { getSudoku } from 'sudoku-gen';
import { generateAreas } from './generate-areas';

/**
 * Generates a full sudoku grid.
 *
 * @param difficulty Difficulty of the sudoku to generate.
 */

export function generateSudoku(difficulty: Difficulty): Sudoku {
  const sudoku = getSudoku(difficulty);

  const sudokuWithAreas = generateAreas(sudoku as Sudoku);

  const preparedSudoku = prepareSudoku(sudokuWithAreas);

  return preparedSudoku;
}
