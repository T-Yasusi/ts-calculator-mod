import { Complex } from '../lib/Complex.js'
import { sub } from '../lib/operators.js'

const z1 = new Complex(1, 1);
const z2 = new Complex(2, 1);

const z3 = z1 - z2;
console.log(z3);
