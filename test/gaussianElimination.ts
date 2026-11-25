import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../lib/classes.js';
import { add, sub, mul, div, neg } from '../lib/operators.js';
import { gaussianElimination, createUnitMatrix } from '../lib/linearAlgebra.js';
import { abs2 } from '../lib/functions.js'
import { approxMatrix } from '../lib/test.js'

function randomInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }
const N=8;
const min = -10, max = 10;
const threshold=1.0e-8;
const isPrintAll = true;

let A = new Matrix(N, N);
let C = new ComplexMatrix(N, N);
for( let i=0; i<N; i++ ){
    for( let j=0; j<N; j++ ){
        A[i][j] = randomInt(min, max);
        C[i][j] = new Complex(randomInt(min, max), randomInt(min, max));
    }
}

const invA = gaussianElimination(A);
const invC = gaussianElimination(C);

approxMatrix(A*invA, createUnitMatrix(N));
approxMatrix(C*invC, createUnitMatrix(N));

