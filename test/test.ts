import { Complex } from '../temp/Complex.ts'
import { sub } from '../temp/operators.ts'

const z1 = new Complex(1, 1);
const z2 = new Complex(2, 1);

const z3 = z1 - z2;
console.log(z3);
