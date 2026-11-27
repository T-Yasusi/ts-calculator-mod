import { abs } from '../functions.js';
import { sub } from '../operators.js';
export default function approxVector(a, b, tot = 1.0e-8) {
    let flag = true;
    if (a.length !== b.length)
        throw new Error('Test failed');
    for (let i = 0; i < a.length; i++) {
        if (abs(sub(a[i], b[i])) > tot)
            flag = false;
    }
    if (!flag)
        throw new Error('Test failed');
    return flag;
}
//# sourceMappingURL=approxVector.js.map