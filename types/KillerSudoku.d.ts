import { Area } from './Area';
import { Difficulty } from './Difficulty';

export type KillerSudoku = {
  puzzle: string;
  solution: string;
  difficulty: Difficulty;
  areas: Area[];
};
