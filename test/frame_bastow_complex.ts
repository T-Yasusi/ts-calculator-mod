import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../lib/classes.js';
import { add, sub, mul, div, neg } from '../lib/operators.js';
import { bastow } from '../lib/solver.js'
import { frame, eigenVectorFromValue, gaussianElimination } from '../lib/linearAlgebra.js';
import { approxMatrix, approxVector, approx } from '../lib/test.js'

function randomInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }
const N=6;
const min = -10, max = 10;
const A = new ComplexMatrix(N, N);
for( let i=0; i<N; i++ ) for( let j=0; j<N; j++ ) A[i][j]=new Complex(randomInt(min, max), randomInt(min, max)); // ランダム行列

const coffs = frame(A);
const eigens = bastow(coffs);
let Q = new ComplexMatrix(N, N);
for( let i=0; i<eigens.length; i++ ){
    const eigenVector = eigenVectorFromValue(eigens[i], A);
    approxVector(A*eigenVector, eigens[i]*eigenVector);
    Q[i] = eigenVector;
}
Q = Q.transpose();
const revQ = gaussianElimination(Q);
const T = revQ*A*Q;

for( let i=0; i<N; i++ ){
    for( let j=0; j<N; j++ ){
        if( i !== j ) approx(T[i][j], 0);
        else approx(T[i][j], eigens[i]);
    }
}
