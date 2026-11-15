import { Complex } from '../Complex.js';
import { add, mul } from '../operators.ts'

type InputType = number | Complex;

export default function abs(x: InputType): number {
    if (typeof x === 'number') {
        return x*x;
    }

    if (x instanceof Complex) {
        return x.abs2();
    }

    throw new Error('!!! abs invalid type !!! ' + typeof x);
}
