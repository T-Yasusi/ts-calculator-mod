import diff from '../lib/diff.js'
import { add, sub, mul, div } from '../lib/operators.js'
import { approx } from '../lib/test.js'

const n=2;
const func = (x : number) => x * x - n;

let x0 = 2;
let x1 = x0 - func(x0) / diff.central(func, x0);
let counter=0;

while( Math.abs(x0-x1) > 1.0e-8 ){
    counter++;
    x0 = x1;
    x1 = x0 - func(x0) / diff.central(func, x0);
//    console.log('Counter =', counter, ' x =', x1, ' dx =', Math.abs(x0-x1));
}

approx(x1, Math.sqrt(n));

