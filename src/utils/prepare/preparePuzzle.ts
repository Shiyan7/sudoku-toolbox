import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";
import {Area} from "../../types/Area";
import { backtrackSolve } from "../solver/backtrackSolve";

/**
 * Override the number of cells to remove from the puzzle for a given difficulty.
 *
 * @param difficulty Difficulty to override the number of cells to remove from
 * @param number The new number of cells to remove for this difficulty
 */

let numberOfCellsToRemove = {
    easy: 30,
    medium: 40,
    hard: 50,
    expert: 60,
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

export function preparePuzzle(solution: string, difficulty: Difficulty, areas: Area[]): string {
    let puzzle = solution.slice(0).split("");
    let emptyCells = 0;
    while (emptyCells < numberOfCellsToRemove[difficulty]) {
        const notEmptyCellIndexes = puzzle
            .map((cell, index) => (cell === "-" ? -1 : index))
            .filter((index) => index !== -1);
        const index = notEmptyCellIndexes[Math.floor(Math.random() * notEmptyCellIndexes.length)];
        if (puzzle[index] !== "-") {
            const temp = puzzle[index];
            puzzle[index] = "-";
            if (!backtrackSolve(puzzle, areas).solvable) {
                puzzle[index] = temp;
            }
            else {
                emptyCells++;
            }
        }
    }
    return puzzle.join("");
}