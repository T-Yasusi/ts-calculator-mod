import path from 'node:path';

export const inputDir  = path.resolve('calc');
export const tempDir   = path.resolve('temp');
export const outputDir = path.resolve('lib');

export function isPreCompile(filename){
    return filename.endsWith('.ts') &&
	!filename.endsWith('.d.ts') &&
	!filename.includes('node_modules') &&
        !path.resolve(filename).includes('operators');
};
