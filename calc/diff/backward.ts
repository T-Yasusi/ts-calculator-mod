import type { NumericalNum } from '../types.ts'
import { Complex } from '../Complex.ts'
import { add, sub, mul, div } from '../operators.ts'

export default function forward(
    f: ((x: NumericalNum) => NumericalNum),
    x0: NumericalNum,
    dx?: NumericalNum
): NumericalNum {
    if (typeof x0 === 'number') {
	const delta = typeof dx === 'number' ? dx : 1.0e-8;
	return ((f as (x: number) => number)(x0) - (f as (x: number) => number)(x0 - delta)) / delta;
    }
    
    if (x0 instanceof Complex) {
	const delta = dx instanceof Complex ? dx : new Complex(1.0e-8, 0);
	return ((f as (x: Complex) => Complex)(x0) - (f as (x: Complex) => Complex)(x0 - delta)) / delta;
    }
    
    throw new Error('Invalid input');
};
