import { add, sub } from './operators.ts';
let a = 1,
  b = 2,
  c = 3;
a = add(a, b);
c = sub(c, b);
console.log("c = ", c);
console.log("b = ", b);