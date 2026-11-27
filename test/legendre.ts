import { legendre } from '../lib/specialFunctions.js'
import { approx } from '../lib/test.js'
import integral from '../lib/integral.js'
import { add, mul, sub, neg, div } from '../lib/operators.js'
import { exp, factorial, pow, sqrt } from '../lib/functions.js'

const N = 10;

for( let i = 0; i<N; i++ ){
    for( let j = 0; j<N; j++ ){
	approx( integral.DE.minusOneToOne(x => legendre(i, x) * legendre(j, x)),
		i === j ? 2/(2*i+1) : 0 );
    }
}
