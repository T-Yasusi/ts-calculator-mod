import type { NumericalNum } from '../types.ts';
import { abs } from '../functions.ts';
import { sub } from '../operators.ts';
export default function approx(a: NumericalNum, b: NumericalNum, tot: number = 1.0e-8): boolean {
  if (abs(sub(a, b)) < tot) return true;
  throw new Error('Test failed');
}