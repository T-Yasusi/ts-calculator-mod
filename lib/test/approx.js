import { abs } from '../functions.js';
import { sub } from '../operators.js';
export default function approx(a, b, tot = 1.0e-8) {
    if (abs(sub(a, b)) < tot)
        return true;
    throw new Error('Test failed');
}
//# sourceMappingURL=approx.js.map