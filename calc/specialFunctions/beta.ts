import type { NumericalNum } from '../types.ts'
import { add, sub, mul, div, neg } from '../operators.js'
import integral from '../integral.js'
import { pow, exp } from '../functions.js'

export default function beta(x: NumericalNum, y: NumericalNum): NumericalNum{
    return integral.simpson((t: NumericalNum) => pow(t, y-1) * pow(1-t, x-1), 0, 1);
}
