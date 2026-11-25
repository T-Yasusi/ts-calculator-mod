import { mul, div } from '../../operators.js';
import { exp, sinh, cosh } from '../../functions.js';
import converge from './converge.js';
const MAX_RANGE = 20;
export default function minusInfToInf(f, threshold = 1.0e-8) {
    const phi = (t) => exp(mul(div(Math.PI, 2), sinh(t)));
    const phiPrime = (t) => mul(mul(div(Math.PI, 2), cosh(t)), phi(t));
    const g = (t) => mul(f(phi(t)), phiPrime(t));
    return converge(g, threshold, MAX_RANGE);
}
//# sourceMappingURL=zeroToInf.js.map