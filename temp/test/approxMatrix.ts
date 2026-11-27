import { abs } from '../functions.ts';
import { sub } from '../operators.ts';
import { Matrix, ComplexMatrix } from '../classes.ts';
export default function approxMatrix(a: Matrix | ComplexMatrix, b: Matrix | ComplexMatrix, tot: number = 1.0e-8): boolean {
  let flag = true;
  if (a.cols !== b.cols) throw new Error('Test failed');
  if (a.rows !== b.rows) throw new Error('Test failed');
  for (let i = 0; i < a.cols; i++) {
    for (let j = 0; j < a.rows; j++) {
      if (abs(sub(a[i][j], b[i][j])) > tot) flag = false;
    }
  }
  if (!flag) throw new Error('Test failed');
  return flag;
}