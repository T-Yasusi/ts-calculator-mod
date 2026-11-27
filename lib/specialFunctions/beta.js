import { sub, mul } from '../operators.js';
import integral from '../integral.js';
import { pow } from '../functions.js';
export default function beta(x, y) {
    return integral.simpson((t) => mul(pow(t, sub(y, 1)), pow(sub(1, t), sub(x, 1))), 0, 1);
}
//# sourceMappingURL=beta.js.map