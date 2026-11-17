import fs from 'node:fs'
import path from 'node:path'
import { runInThisContext } from 'node:vm';
import { execSync } from 'child_process';

import operator_overload from './util/operator_overload.js'
import ts_compile from './util/ts_compile.js'

const inputFile = process.argv[2];
if( !fs.existsSync(inputFile) ){
    console.log('not found input file');
    process.exit(0);
}

console.log(`Test: ${inputFile} START`);
const tsFile = inputFile.replace('test', '.test');

const { code, map } = operator_overload(fs.readFileSync(inputFile), inputFile)

fs.mkdirSync('.test', { recursive: true });
fs.writeFileSync(tsFile, code, 'utf-8');
fs.writeFileSync(tsFile + '.map', JSON.stringify(map), 'utf-8');
console.log('Pre-compile[Operator Overload] FINISH');
execSync(`node ${tsFile}`, { stdio: 'inherit' });

rmDir('.test');
function rmDir(dir){
    console.log('> remove ', dir);
    for (const file of fs.readdirSync(dir)) {
        fs.rmSync(path.join(dir, file), { recursive: true, force: true });
    }
}
