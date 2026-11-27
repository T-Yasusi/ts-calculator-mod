import { sub, mul, neg } from '../operators.js';
import zeroToInf from '../integral/DE/zeroToInf.js';
import { pow, exp } from '../functions.js';
export default function gamma(x) {
    return zeroToInf((t) => mul(pow(t, sub(x, 1)), exp(neg(t))));
}
//# sourceMappingURL=gamma.js.map