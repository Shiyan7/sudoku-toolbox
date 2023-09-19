import { Coords } from '../model/Coords';
import { Area } from '../../types/Area';
import { Coord } from '../../types/Coord';

type BacktrackSolveResult = {
  puzzle: string;
  solvable: boolean;
};

export function backtrackSolve(puzzle: string[], areas: Area[]): BacktrackSolveResult {
  const puzzleCopy = puzzle.slice(0);
  const solvable = backtrackSolveAux(puzzleCopy, areas);
  return { puzzle: puzzleCopy.join(''), solvable };
}

function backtrackSolveAux(puzzleCopy: string[], areas: Area[]) {
  const emptyCells = getEmptyCells(puzzleCopy);
  if (emptyCells.length === 0) {
    return true;
  }
  const cell = emptyCells[0] as Coord;
  const [i, j] = cell;
  const row = getRow(puzzleCopy, i);
  const col = getCol(puzzleCopy, j);
  const box = getBox(puzzleCopy, i, j);
  const { area, currentSum, sum } = getArea(puzzleCopy, areas, i, j);
  for (let n = 1; n <= 9; n++) {
    if (
      !row.includes(`${n}`) &&
      !col.includes(`${n}`) &&
      !box.includes(`${n}`) &&
      !area.includes(`${n}`) &&
      currentSum + n <= sum
    ) {
      puzzleCopy[i * 9 + j] = `${n}`;
      if (backtrackSolveAux(puzzleCopy, areas)) {
        return true;
      }
      puzzleCopy[i * 9 + j] = '-';
    }
  }
  return false;
}
function getEmptyCells(puzzle: string[]) {
  return puzzle
    .map((char, index) => {
      if (char === '-') {
        const i = Math.floor(index / 9);
        const j = index % 9;
        return Coords(i, j);
      }
      return undefined;
    })
    .filter((coord) => coord !== undefined);
}
function getRow(puzzle: string[], i: number) {
  return puzzle.join('').slice(i * 9, i * 9 + 9);
}
function getCol(puzzle: string[], j: number) {
  return puzzle.filter((_, index) => index % 9 === j).join('');
}
function getBox(puzzle: string[], i: number, j: number) {
  const boxI = Math.floor(i / 3);
  const boxJ = Math.floor(j / 3);
  return puzzle
    .filter((_, index) => {
      const i = Math.floor(index / 9);
      const j = index % 9;
      return Math.floor(i / 3) === boxI && Math.floor(j / 3) === boxJ;
    })
    .join('');
}
function getArea(puzzle: string[], areas: Area[], i: number, j: number) {
  const area = areas.find((area) => area.cells.some((cell) => cell[0] === i && cell[1] === j)) as Area;
  const currentSum = area.cells.reduce((sum, cell) => sum + (parseInt(puzzle[cell[0] * 9 + cell[1]]) || 0), 0);
  const areaString = area.cells.map((cell) => puzzle[cell[0] * 9 + cell[1]]).join('');
  return { area: areaString, currentSum, sum: area.sum };
}
