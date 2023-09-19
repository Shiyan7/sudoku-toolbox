import { generateAreas } from './generation/areas';
import { generateFullSudokuGridWithoutAreas } from './generation/generate';
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import { preparePuzzle } from './prepare/preparePuzzle';
import { KillerSudoku } from '../types/KillerSudoku';

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
