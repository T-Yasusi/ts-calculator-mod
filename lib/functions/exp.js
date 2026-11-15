import { Complex } from '../Complex.js';
import { add, mul } from '../operators.js';
export default function exp(x) {
    if (typeof x === 'number') {
        return Math.exp(x);
    }
    if (x instanceof Complex) {
        const r = Math.exp(x.re);
        const theta = x.im;
        return new Complex(mul(r, Math.cos(theta)), mul(r, Math.sin(theta)));
    }
    throw new Error(add('!!! exp invalid type !!! ', typeof x));
}
//# sourceMappingURL=exp.js.map