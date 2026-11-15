import { Complex } from '../Complex.js';
import exp from './exp.js';
import { add, neg } from '../operators.js';
export default function cos(x) {
    if (typeof x === 'number') {
        return Math.cos(x);
    }
    if (x instanceof Complex) {
        const i = new Complex(0, 1);
        const minusI = new Complex(0, neg(1));
        const expIp = exp(x.mul(i));
        const expIn = exp(x.mul(minusI));
        return expIp.add(expIn).div(2);
    }
    throw new Error(add('!!! cos invalid type !!! ', typeof x));
}
//# sourceMappingURL=cos.js.map