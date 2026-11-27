import { Complex } from '../lib/Complex.js'
import integral from '../lib/integral.js'
import { sin, exp, sqrt, factorial, pow } from '../lib/functions.js'
import { add, mul, sub, neg, div } from '../lib/operators.js'

const a = 5;
console.log(integral.DE.zeroToInf(x => exp(-a*x)), 'expected: ', 1/a);

for( let s = 0;  s<=5; s++ ){
    console.log(integral.DE.zeroToInf(x => pow(x, s)*exp(-x)), 'expected: ', factorial(s));
}

console.log(integral.DE.minusInfToInf(x => exp(-x*x)), 'expected: ', sqrt(Math.PI));


