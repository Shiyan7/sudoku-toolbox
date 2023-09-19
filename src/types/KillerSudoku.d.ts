import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";
import {Area} from "./Area";

export type KillerSudoku = {
    puzzle: string;
    solution: string;
    difficulty: Difficulty;
    areas: Area[];
}