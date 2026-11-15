import { add, sub } from '../operators.js';
export function toFormattedPrecision(x, precision) {
    if (Math.abs(x) < 10e-10)
        return '0';
    const str = x.toPrecision(precision);
    if (str.includes('e'))
        return str;
    if (str.length > add(precision, 3))
        return x.toExponential(sub(precision, 1));
    return str;
}
//# sourceMappingURL=toFormattedPrecision.js.map