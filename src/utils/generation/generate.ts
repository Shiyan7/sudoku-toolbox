import { Difficulty } from '../../types/Difficulty';
import { KillerSudoku } from '../../types/KillerSudoku';
import { getSudoku } from 'sudoku-gen';

export function generateFullSudokuGridWithoutAreas(difficulty: Difficulty): KillerSudoku {
  const { solution } = getSudoku(difficulty);

  return { puzzle: solution, solution, difficulty, areas: [] };
}
