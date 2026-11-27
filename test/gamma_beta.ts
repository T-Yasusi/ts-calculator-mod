import { Complex } from '../lib/classes.js'
import { add, sub, mul, div, neg } from '../lib/operators.js'
import { gamma, beta } from '../lib/specialFunctions.js'
import { approx } from '../lib/test.js'

const xs = [ 4.5 ];
const ys = [ 10.5 ];

for( const x of xs ){
    for( const y of ys ){
	approx(beta(x, y), gamma(x)*gamma(y)/gamma(x+y));
    }
}
