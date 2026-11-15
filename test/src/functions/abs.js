import { Complex } from '../Complex.js';
import { add } from "../operators.js";
export default function abs(x) {
    if (typeof x === 'number') {
        return Math.abs(x);
    }
    if (x instanceof Complex) {
        return x.abs();
    }
    throw new Error(add('!!! abs invalid type !!! ', typeof x));
}
