import { Complex } from '../lib/Complex.js'
import integral from '../lib/integral.js'
import { sin, exp, sqrt, factorial, pow } from '../lib/functions.js'
import { add, mul, sub, neg, div } from '../lib/operators.js'
import { approx } from '../lib/test.js'

const a = 5;
approx(integral.DE.zeroToInf(x => exp(-a*x)), 1/a);

for( let s = 0;  s<=5; s++ ){
    approx(integral.DE.zeroToInf(x => pow(x, s)*exp(-x)),factorial(s));
}

approx(integral.DE.minusInfToInf(x => exp(-x*x)), sqrt(Math.PI));



