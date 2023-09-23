import { Coord } from '../types';

export function compare(a: Coord, b: Coord) {
  const [x1, y1] = a;
  const [x2, y2] = b;

  if (x1 !== x2) {
    return x1 < x2 ? -1 : 1;
  }

  return y1 !== y2 ? (y1 < y2 ? -1 : 1) : 0;
}
