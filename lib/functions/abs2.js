import { Complex } from '../Complex.js';
import { add, mul } from '../operators.js';
export default function abs(x) {
    if (typeof x === 'number') {
        return mul(x, x);
    }
    if (x instanceof Complex) {
        return x.abs2();
    }
    throw new Error(add('!!! abs invalid type !!! ', typeof x));
}
//# sourceMappingURL=abs2.js.map