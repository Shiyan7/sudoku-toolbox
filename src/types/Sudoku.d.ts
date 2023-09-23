import { Area } from './Area';
import { Difficulty } from './Difficulty';

export type Sudoku = {
  puzzle: string;
  solution: string;
  difficulty: Difficulty;
  areas: Area[];
};
