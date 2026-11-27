import { hermite } from '../lib/specialFunctions.js'
import { approx } from '../lib/test.js'
import integral from '../lib/integral.js'
import { add, mul, sub, neg, div } from '../lib/operators.js'
import { exp, factorial, pow, sqrt } from '../lib/functions.js'

const N = 5;

for( let i = 0; i<N; i++ ){
    for( let j = 0; j<N; j++ ){
	approx( integral.DE.minusInfToInf(x => hermite(i, x) * hermite(j, x) * exp(-x*x)),
		i===j ? sqrt(Math.PI)*pow(2, i)*factorial(i) : 0 );
    }
}
