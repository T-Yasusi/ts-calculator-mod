import { Complex } from '../lib/Complex.js'
import { sub, neg } from '../lib/operators.js'
import { approx } from '../lib/test.js'

const z1 = new Complex(1, 1);
const z2 = new Complex(2, 1);

const z3 = z1 - z2;
approx(z3, -1);

