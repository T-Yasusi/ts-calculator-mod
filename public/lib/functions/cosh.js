import { Complex } from '../Complex.js';
import exp from './exp.js';
import { add } from '../operators.js';
export default function cosh(x) {
    if (typeof x === 'number') {
        return Math.cosh(x);
    }
    if (x instanceof Complex) {
        return exp(x).add(exp(x.neg())).div(2);
    }
    throw new Error(add('!!! cosh invalid type !!! ', typeof x));
}
//# sourceMappingURL=cosh.js.map