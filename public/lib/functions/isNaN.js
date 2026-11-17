import { add } from '../operators.js';
import { Complex } from '../Complex.js';
export default function isNaN(x) {
    if (typeof x === 'number') {
        return Number.isNaN(x);
    }
    if (x instanceof Complex) {
        return Number.isNaN(x.re) || Number.isNaN(x.im);
    }
    throw new Error(add('!!! isNaN invalid type !!! ', typeof x));
}
//# sourceMappingURL=isNaN.js.map