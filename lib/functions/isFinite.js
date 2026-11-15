import { add } from '../operators.js';
import { Complex } from '../Complex.js';
export default function isFinite(x) {
    if (typeof x === 'number') {
        return Number.isFinite(x);
    }
    if (x instanceof Complex) {
        return Number.isFinite(x.re) || Number.isFinite(x.im);
    }
    throw new Error(add('!!! isFinite invalid type !!! ', typeof x));
}
//# sourceMappingURL=isFinite.js.map