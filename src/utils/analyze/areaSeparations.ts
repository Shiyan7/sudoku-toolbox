import {Coords} from "../model/Coords";
import {Area} from "../../types/Area";
import {Coord} from "../../types/Coord";

/**
 * Takes an areas list and returns a matrix representing the separations between the areas.
 *
 * @param areas Areas list to get separations from.
 */

type GetSeparationsFromAreas = {
    verticalSeparations: Coord[];
    horizontalSeparations: Coord[];
}

export function getSeparationsFromAreas(areas: Area[]): GetSeparationsFromAreas {
    const areasGrid = areasToGridOfID(areas);
    const verticalSeparations: Coord[] = [];
    const horizontalSeparations: Coord[] = [];
    for (let j = 0; j < 9; j++) {
        for (let i = 0; i < 8; i++) {
            if (areasGrid[j + i * 9] !== areasGrid[j + (i + 1) * 9]) {
                verticalSeparations.push(Coords(j, i) as never);
            }
        }
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 8; j++) {
            if (areasGrid[j + i * 9] !== areasGrid[j + 1 + i * 9]) {
                horizontalSeparations.push(Coords(i, j) as never);
            }
        }
    }
    return { verticalSeparations, horizontalSeparations };
}
function areasToGridOfID(areas: Area[]) {
    let areasGrid = "-".repeat(81).split("");
    areas.forEach((area, i) => {
        area.cells.forEach(([x, y]) => {
            areasGrid[x + y * 9] = `${i}`;
        });
    });
    return areasGrid;
}
