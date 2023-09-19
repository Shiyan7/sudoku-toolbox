import { Coord } from '../../types/Coord';

const coords = Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9]);

export function Coords(x: number, y: number): Coord {
  return coords[x * 9 + y] as Coord;
}
