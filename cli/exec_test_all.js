import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'child_process'
import { performance } from 'node:perf_hooks'
import glob from 'fast-glob'

import operator_overload from './util/operator_overload.js'
import ts_compile from './util/ts_compile.js'

const all_start = performance.now();

for( const inputFile of await glob('test/**/*.ts') ){
    console.log(`Test: ${inputFile} START`);
    const tsFile = inputFile.replace('test', '.test');
    
    const { code, map } = operator_overload(fs.readFileSync(inputFile), inputFile)
    
    fs.mkdirSync('.test', { recursive: true });
    fs.writeFileSync(tsFile, code, 'utf-8');
    fs.writeFileSync(tsFile + '.map', JSON.stringify(map), 'utf-8');
    console.log('Pre-compile[Operator Overload] FINISH');
    
    console.log('========== Exec Test START  ==================================================');
    const start = performance.now();
    execSync(`node ${tsFile}`, { stdio: 'inherit' });
    console.log('========== Exec Test FINISH ==================================================');
    console.log(`> Exec time : ${performance.now() - start} [ms]`);
}

console.log(`> All test Finish. Take time: ${performance.now() - all_start} [ms]`);

rmDir('.test');

function rmDir(dir){
    console.log('> remove ', dir);
    for (const file of fs.readdirSync(dir)) {
        fs.rmSync(path.join(dir, file), { recursive: true, force: true });
    }
}
