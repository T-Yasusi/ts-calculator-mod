import type { NumericalNum } from '../../types.ts';
import { Complex } from '../../Complex.js';
import { add, sub, mul, div, neg } from '../../operators.js';
import { sinh, cosh, tanh, abs } from '../../functions.js';
import converge from './converge.ts';
const MAX_RANGE = 1;
export default function minusOneToOne(f: (x: NumericalNum) => NumericalNum, threshold: number = 1.0e-3) {
  const isReal = typeof f === 'function' && f.length === 1 && typeof f(0 as any) === 'number';
  const phi = (t: NumericalNum): NumericalNum => tanh(mul(div(Math.PI, 2), sinh(t)));
  const phiPrime = (t: NumericalNum): NumericalNum => mul(mul(div(Math.PI, 2), cosh(t)), div(1, cosh(mul(div(Math.PI, 2), sinh(t)))) ** 2);
  const g = (t: NumericalNum): NumericalNum => mul((f as (x: NumericalNum) => NumericalNum)(phi(t)), phiPrime(t));
  return converge(g, threshold, MAX_RANGE);
}