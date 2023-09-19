import { Area } from '../../types/Area';
import { Coord } from '../../types/Coord';
import { KillerSudoku } from '../../types/KillerSudoku';

function isComplete(areas: Area[]) {
  return areas.map((area) => area.cells.length).reduce((a, b) => a + b, 0) === 81;
}

function findAvailableCell(areas: Area[]): Coord {
  const usedCells = areas.flatMap((area) => area.cells);
  const availableCells: Coord[] = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!usedCells.some((cell) => cell[0] === i && cell[1] === j)) {
        availableCells.push([i, j] as never);
      }
    }
  }
  return availableCells[Math.floor(Math.random() * availableCells.length)];
}

function addCellToArea(area: Area, cell: Coord, sudoku: KillerSudoku) {
  area.cells.push(cell);
  area.sum += parseInt(sudoku.solution[cell[0] * 9 + cell[1]]);
}

function getAvailableAdjacentCells(currentArea: Area, currentCell: Coord, areas: Area[], solution: string) {
  const adjacentCells = [
    [currentCell[0] - 1, currentCell[1]],
    [currentCell[0] + 1, currentCell[1]],
    [currentCell[0], currentCell[1] - 1],
    [currentCell[0], currentCell[1] + 1],
  ].filter((cell) => cell[0] >= 0 && cell[0] <= 8 && cell[1] >= 0 && cell[1] <= 8);
  const usedCells = areas.flatMap((area) => area.cells).concat(currentArea.cells);
  const currentAreaNumbers = currentArea.cells.map((cell) => solution[cell[0] * 9 + cell[1]]);
  return adjacentCells
    .filter((cell) => !usedCells.some((usedCell) => usedCell[0] === cell[0] && usedCell[1] === cell[1]))
    .filter(([i, j]) => !currentAreaNumbers.includes(solution[i * 9 + j]));
}

export function generateAreas(sudoku: KillerSudoku): KillerSudoku {
  const areas: Area[] = [];
  while (!isComplete(areas)) {
    const area = { cells: [], sum: 0 };
    const startingCell = findAvailableCell(areas);
    addCellToArea(area, startingCell, sudoku);
    const maxAreaLength = Math.floor(Math.random() * 6) + 2; // 2-7
    let lastCell = startingCell;
    while (area.cells.length < maxAreaLength) {
      const availableAdjacentCells = getAvailableAdjacentCells(area, lastCell, areas, sudoku.solution);
      if (availableAdjacentCells.length === 0) {
        break;
      }
      const nextCell = availableAdjacentCells[Math.floor(Math.random() * availableAdjacentCells.length)] as Coord;
      addCellToArea(area, nextCell, sudoku);
      lastCell = nextCell;
    }
    areas.push(area as never);
  }

  return {
    ...sudoku,
    areas,
  };
}
