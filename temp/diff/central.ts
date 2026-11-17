import type { NumericalNum } from '../types.ts';
import { Complex } from '../Complex.ts';
import { add, sub, mul, div } from '../operators.js';
export default function forward(f: (x: NumericalNum) => NumericalNum, x0: NumericalNum, dx?: NumericalNum): NumericalNum {
  if (typeof x0 === 'number') {
    const delta = typeof dx === 'number' ? dx : 1.0e-8;
    return div(sub((f as (x: number) => number)(add(x0, delta)), (f as (x: number) => number)(sub(x0, delta))), mul(2, delta));
  }
  if (x0 instanceof Complex) {
    const delta = dx instanceof Complex ? dx : new Complex(1.0e-8, 0);
    return div(sub((f as (x: Complex) => Complex)(add(x0, delta)), (f as (x: Complex) => Complex)(sub(x0, delta))), mul(2, delta));
  }
  throw new Error('Invalid input');
}
;