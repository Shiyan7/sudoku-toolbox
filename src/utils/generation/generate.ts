import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import { KillerSudoku } from '../../types/KillerSudoku';
import { getSudoku } from 'sudoku-gen';

export function generateFullSudokuGridWithoutAreas(difficulty: Difficulty): KillerSudoku {
  const { solution } = getSudoku(difficulty);
  return { puzzle: solution, solution, difficulty, areas: [] };
}
