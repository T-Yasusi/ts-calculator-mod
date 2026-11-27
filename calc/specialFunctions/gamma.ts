import type { NumericalNum } from '../types.ts'
import { add, sub, mul, div, neg } from '../operators.js'
import zeroToInf from '../integral/DE/zeroToInf.js'
import { pow, exp } from '../functions.js'

export default function gamma(x: NumericalNum): NumericalNum{
    return zeroToInf((t: NumericalNum) => pow(t, x-1) * exp(-t));
}
