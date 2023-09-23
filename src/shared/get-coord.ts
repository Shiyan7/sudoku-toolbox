import { Coord } from '../types/Coord';

const coords = Array.from({ length: 81 }, (_, idx) => [Math.floor(idx / 9), idx % 9]);

export function getCoord(x: number, y: number): Coord {
  return coords[x * 9 + y] as Coord;
}
