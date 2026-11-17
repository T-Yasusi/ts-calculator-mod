import { toFormattedPrecision } from './util/toFormattedPrecision.ts';
import { add, sub, mul, div, neg } from './operators.ts';
export class Complex {
  public readonly re: number;
  public readonly im: number;
  constructor(re: number, im: number = 0) {
    this.re = re;
    this.im = im;
  }
  copy(): Complex {
    return new Complex(this.re, this.im);
  }
  add(other: Complex | number): Complex {
    if (typeof other === 'number') {
      return new Complex(add(this.re, other), this.im);
    }
    return new Complex(add(this.re, other.re), add(this.im, other.im));
  }
  sub(other: Complex | number): Complex {
    if (typeof other === 'number') {
      return new Complex(sub(this.re, other), this.im);
    }
    return new Complex(sub(this.re, other.re), sub(this.im, other.im));
  }
  mul(other: Complex | number): Complex {
    if (typeof other === 'number') {
      return new Complex(mul(this.re, other), mul(this.im, other));
    }
    const re = sub(mul(this.re, other.re), mul(this.im, other.im));
    const im = add(mul(this.re, other.im), mul(this.im, other.re));
    return new Complex(re, im);
  }
  div(other: Complex | number): Complex {
    if (typeof other === 'number') {
      if (other === 0) throw new Error('Division by zero');
      return new Complex(div(this.re, other), div(this.im, other));
    }
    const denom = add(other.re ** 2, other.im ** 2);
    if (denom === 0) throw new Error('Division by zero');
    const re = div(add(mul(this.re, other.re), mul(this.im, other.im)), denom);
    const im = div(sub(mul(this.im, other.re), mul(this.re, other.im)), denom);
    return new Complex(re, im);
  }
  neg(): Complex {
    return new Complex(neg(this.re), neg(this.im));
  }
  conj(): Complex {
    return new Complex(this.re, neg(this.im));
  }
  abs2(): number {
    return add(mul(this.re, this.re), mul(this.im, this.im));
  }
  abs(): number {
    return Math.hypot(this.re, this.im);
  }
  arg(): number {
    return Math.atan2(this.im, this.re);
  }
  equals(other: Complex): boolean {
    return this.re === other.re && this.im === other.im;
  }
  toPrecision(precision: number = 3): string {
    const reString = toFormattedPrecision(this.re, precision);
    const imString = toFormattedPrecision(this.im, precision);
    if ((reString.includes('e-') || reString === '0') && (imString.includes('e-') || imString === '0')) return '0';else if (imString.includes('e-') || imString === '0') return reString;else if (reString.includes('e-') || imString === '0') return add(imString, 'i');
    return this.im > 0 ? add(add(add(reString, ' + '), imString), 'i') : add(add(reString, imString.replace('-', ' - ')), 'i');
  }
}