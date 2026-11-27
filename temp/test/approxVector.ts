import { abs } from '../functions.ts';
import { sub } from '../operators.ts';
import { Vector, ComplexVector } from '../classes.ts';
export default function approxVector(a: Vector | ComplexVector, b: Vector | ComplexVector, tot: number = 1.0e-8): boolean {
  let flag = true;
  if (a.length !== b.length) throw new Error('Test failed');
  for (let i = 0; i < a.length; i++) {
    if (abs(sub(a[i], b[i])) > tot) flag = false;
  }
  if (!flag) throw new Error('Test failed');
  return flag;
}