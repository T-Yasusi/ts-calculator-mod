import type { NumericalNum } from '../../types.ts'
import { Complex } from '../../Complex.js';
import { add, sub, mul, div, neg } from '../../operators.js';
import { exp, sinh, cosh, tanh } from '../../functions.js';
import converge from './converge.ts'

const MAX_RANGE = 20;

export default function minusInfToInf(f: (x: NumericalNum) => NumericalNum, threshold: number = 1.0e-8){
    const isReal = typeof f === 'function' && f.length === 1 && typeof f(0 as any) === 'number';
    const phi = (t: NumericalNum ): NumericalNum => exp( (Math.PI/2)*sinh(t) );
    const phiPrime = (t: NumericalNum ): NumericalNum => (Math.PI/2)*cosh(t)*phi(t) ;
    const g = (t: NumericalNum ): NumericalNum => f(phi(t))*phiPrime(t);

    return converge(g, threshold, MAX_RANGE);
}

