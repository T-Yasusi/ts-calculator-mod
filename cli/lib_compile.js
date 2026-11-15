#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import glob from 'fast-glob';
import { performance } from 'node:perf_hooks';

import { inputDir, tempDir, outputDir, isPreCompile, dumpLevel } from './config.js'
import ts_compile from './util/ts_compile.js'
import operator_overload from './util/operator_overload.js'

const files = await glob(`${inputDir}/**/*.ts`);
let start = performance.now();

for (const inputFile of files) {
    const relativePath = path.relative(inputDir, inputFile);
    const outputFile = path.join(tempDir, relativePath);
            
    const inputCode = fs.readFileSync(inputFile, 'utf-8');
    const { code, map } = isPreCompile(inputFile) ? operator_overload(inputCode, inputFile) : { code: inputCode, map: null };

    // 出力先ディレクトリを作成
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, code, 'utf-8');
    if( map ) fs.writeFileSync(outputFile + '.map', JSON.stringify(map), 'utf-8');

    if( dumpLevel > 0 ) console.log(`✓ ${inputFile} → ${outputFile}`);
}
console.log(`✅  All Pre Cranspile take ${((performance.now() - start)/1000).toFixed(3)}[s]`);
start = performance.now();

for (const file of files) {
    const relativePath = path.relative(inputDir, file);
    const inputFile = path.join(tempDir, relativePath);

    ts_compile(inputFile);    
}
console.log(`✅  All TS Cranspile take ${((performance.now() - start)/1000).toFixed(3)}[s]`);
