import type { NumericalNum } from '../../types.ts';
import trapezoid from '../trapezoid.js';
import { add, sub, mul, div, neg } from '../../operators.js';
import { abs } from '../../functions.js';
export default function converge(g: (x: NumericalNum) => NumericalNum, threshold: number, max_range: number): number {
  while (!Number.isFinite(abs(g(neg(max_range)))) || !Number.isFinite(abs(g(max_range)))) {
    max_range = mul(0.9, max_range);
    //	console.log(max_range, g(-max_range), g(max_range));
    if (max_range < 1.0e-3) throw new Error('!!! DE integration not converged function !!!');
  }
  //    console.log('max_range :', max_range);

  let range = mul(0.1, max_range);
  const step = range;
  let val0 = trapezoid(g, neg(range), range);
  range = add(range, step);
  let val1 = trapezoid(g, neg(range), range);
  //    console.log('val0 =', val0, ' val1 =', val1);
  while (abs(sub(val0, val1)) as number > threshold) {
    range = add(range, step);
    if (range > max_range) throw new Error('!!! DE integration not converged !!!');
    val0 = val1;
    val1 = trapezoid(g, neg(range), range);
    //	console.log(range, val0, val1, abs(val0 -val1), threshold);
  }
  return val1 as number;
}