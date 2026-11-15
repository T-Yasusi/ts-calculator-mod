import { add, neg } from '../operators.js';
import { Complex } from '../Complex.js';
import pow from './pow.js';
export default function sqrt(x) {
    if (typeof x === 'number') {
        if (x < 0)
            return new Complex(0, Math.sqrt(neg(x)));
        return Math.sqrt(x);
    }
    if (x instanceof Complex) {
        return pow(x, 0.5);
    }
    throw new Error(add('!!! sqrt invalid type !!! ', typeof x));
}
//# sourceMappingURL=sqrt.js.map