import { toFormattedPrecision } from "./util/toFormattedPrecision.js";
import { add, sub, mul, div, neg } from "./operators.js";
export class Complex {
    re;
    im;
    constructor(re, im = 0) {
        this.re = re;
        this.im = im;
    }
    copy() { return new Complex(this.re, this.im); }
    add(other) {
        if (typeof other === 'number') {
            return new Complex(add(this.re, other), this.im);
        }
        return new Complex(add(this.re, other.re), add(this.im, other.im));
    }
    sub(other) {
        if (typeof other === 'number') {
            return new Complex(sub(this.re, other), this.im);
        }
        return new Complex(sub(this.re, other.re), sub(this.im, other.im));
    }
    mul(other) {
        if (typeof other === 'number') {
            return new Complex(mul(this.re, other), mul(this.im, other));
        }
        const re = sub(mul(this.re, other.re), mul(this.im, other.im));
        const im = add(mul(this.re, other.im), mul(this.im, other.re));
        return new Complex(re, im);
    }
    div(other) {
        if (typeof other === 'number') {
            if (other === 0)
                throw new Error('Division by zero');
            return new Complex(div(this.re, other), div(this.im, other));
        }
        const denom = add(other.re ** 2, other.im ** 2);
        if (denom === 0)
            throw new Error('Division by zero');
        const re = div(add(mul(this.re, other.re), mul(this.im, other.im)), denom);
        const im = div(sub(mul(this.im, other.re), mul(this.re, other.im)), denom);
        return new Complex(re, im);
    }
    neg() {
        return new Complex(neg(this.re), neg(this.im));
    }
    conj() {
        return new Complex(this.re, neg(this.im));
    }
    abs2() {
        return add(mul(this.re, this.re), mul(this.im, this.im));
    }
    abs() {
        return Math.hypot(this.re, this.im);
    }
    arg() {
        return Math.atan2(this.im, this.re);
    }
    equals(other) {
        return this.re === other.re && this.im === other.im;
    }
    toPrecision(precision = 3) {
        const reString = toFormattedPrecision(this.re, precision);
        const imString = toFormattedPrecision(this.im, precision);
        if ((reString.includes('e-') || reString === '0') && (imString.includes('e-') || imString === '0'))
            return '0';
        else if (imString.includes('e-') || imString === '0')
            return reString;
        else if (reString.includes('e-') || imString === '0')
            return add(imString, 'i');
        return this.im > 0 ? add(add(add(reString, ' + '), imString), 'i') : add(add(reString, imString.replace('-', ' - ')), 'i');
    }
}
