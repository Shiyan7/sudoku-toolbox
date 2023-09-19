import { generateAreas } from './generation/areas';
import { generateFullSudokuGridWithoutAreas } from './generation/generate';
import { preparePuzzle } from './prepare/preparePuzzle';
import { KillerSudoku } from '../types/KillerSudoku';
import { Difficulty } from '../types/Difficulty';

/**
 * Generates a full killer sudoku grid.
 *
 * @param difficulty Difficulty of the sudoku to generate. Defaults to "expert".
 */

export function generateKillerSudoku(difficulty: Difficulty): KillerSudoku {
  const sudoku = generateFullSudokuGridWithoutAreas(difficulty || 'expert');
  generateAreas(sudoku);
  sudoku.puzzle = preparePuzzle(sudoku.solution, sudoku.difficulty, sudoku.areas);
  return sudoku;
}
