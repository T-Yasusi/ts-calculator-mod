import { mul, div } from '../../operators.js';
import { sinh, cosh, tanh } from '../../functions.js';
import converge from './converge.js';
const MAX_RANGE = 1;
export default function minusOneToOne(f, threshold = 1.0e-3) {
    const isReal = typeof f === 'function' && f.length === 1 && typeof f(0) === 'number';
    const phi = (t) => tanh(mul(div(Math.PI, 2), sinh(t)));
    const phiPrime = (t) => mul(mul(div(Math.PI, 2), cosh(t)), div(1, cosh(mul(div(Math.PI, 2), sinh(t)))) ** 2);
    const g = (t) => mul(f(phi(t)), phiPrime(t));
    return converge(g, threshold, MAX_RANGE);
}
//# sourceMappingURL=minusOneToOne.js.map