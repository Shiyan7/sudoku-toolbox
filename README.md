# Sudoku toolbox

## Install

```
yarn add sudoku-toolbox
```

## Usage

```js
import { generateKillerSudoku } from "sudoku-toolbox";

const sudoku = generateKillerSudoku();

const { puzzle, solution, areas, difficulty } = sudoku;

const { verticalSeparations, horizontalSeparations } = getSeparationsFromAreas(areas);
```

## Details

The function `generateKillerSudoku` takes an optional parameter `difficulty` which must be between `easy`, `hard`, `medium` and `expert`.

You can customize the number of cells each difficulty removes from the full solution with the `overrideNumberOfCellsToRemove` function like this:
```js
import { 
    generateKillerSudoku, 
    overrideNumberOfCellsToRemove
} from "sudoku-toolbox";

overrideNumberOfCellsToRemove("easy", 15)

const sudoku = generateKillerSudoku("easy");
```

By default, the numbers of cells to remove for each difficulty are:
```js
{
    "easy": 30,
    "medium": 40,
    "hard": 50,
    "expert": 60,
}
```

From experience, above 67 or 68 numbers to remove, the program begins to struggle and is a bit slow and it is possible that it can hang forever above 70.

In an upcoming version, it will just raise an error after a timeout.