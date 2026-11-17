import { Complex } from '../Complex.js';
import { add } from '../operators.js';
export default function conj(x) {
    if (typeof x === 'number') {
        return x;
    }
    if (x instanceof Complex) {
        return x.conj();
    }
    throw new Error(add('!!! abs invalid type !!! ', typeof x));
}
//# sourceMappingURL=conj.js.map