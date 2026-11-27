import type { NumericalNum } from '../../types.ts'
import { Complex } from '../../Complex.js';
import { add, sub, mul, div, neg } from '../../operators.js';
import { sinh, cosh, tanh, abs, pow } from '../../functions.js';
import converge from './converge.ts'

const MAX_RANGE = 50;

export default function minusOneToOne(f: ((x: NumericalNum) => NumericalNum),  threshold: number = 1.0e-3){
    const phi = (t: NumericalNum ): NumericalNum => tanh( (Math.PI/2)*sinh(t));
    const phiPrime = (t: NumericalNum ): NumericalNum => (Math.PI/2)*cosh(t)*pow(1/cosh((Math.PI/2)*sinh(t)), 2);
    const g = (t: NumericalNum ): NumericalNum => f(phi(t))*phiPrime(t);

    return converge(g, threshold, MAX_RANGE);
}

