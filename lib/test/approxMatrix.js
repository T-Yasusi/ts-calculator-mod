import { abs } from '../functions.js';
import { sub } from '../operators.js';
export default function approxMatrix(a, b, tot = 1.0e-8) {
    let flag = true;
    if (a.cols !== b.cols)
        throw new Error('Test failed');
    if (a.rows !== b.rows)
        throw new Error('Test failed');
    for (let i = 0; i < a.cols; i++) {
        for (let j = 0; j < a.rows; j++) {
            if (abs(sub(a[i][j], b[i][j])) > tot)
                flag = false;
        }
    }
    if (!flag)
        throw new Error('Test failed');
    return flag;
}
//# sourceMappingURL=approxMatrix.js.map