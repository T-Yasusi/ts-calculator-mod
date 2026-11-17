#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import glob from 'fast-glob';
import { performance } from 'node:perf_hooks';

import { inputDir, tempDir, outputDir, isPreCompile, dumpLevel } from './config.js'
import ts_compile from './util/ts_compile.js'
import comb_source_map from './util/comb_source_map.js'
import operator_overload from './util/operator_overload.js'

const files = await glob(`${inputDir}/**/*.ts`);
let start = performance.now();

for (const inputFile of files) {
    const outputFile = path.join(tempDir, path.relative(inputDir, inputFile));
    
    if( !isNewer(inputFile, outputFile) ){
	if( dumpLevel > 0 ) console.log(`✓ Pre-compole ...skip: ${inputFile} → ${outputFile} source is not updated`);	
	continue;
    }
    
    const inputCode = fs.readFileSync(inputFile, 'utf-8');
    const { code, map } = isPreCompile(inputFile) ? operator_overload(inputCode, inputFile) : { code: inputCode, map: null };

    // 出力先ディレクトリを作成
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, code, 'utf-8');
    if( map ) fs.writeFileSync(outputFile + '.map', JSON.stringify(map), 'utf-8');

    if( dumpLevel > 0 ) console.log(`✓ Pre-compile success: ${inputFile} → ${outputFile}`);
}
console.log(`✅  All Pre-cranspile take ${((performance.now() - start)/1000).toFixed(3)}[s]`);
start = performance.now();

for (const file of files) {
    const inputFile = path.join(tempDir, path.relative(inputDir, file));
    ts_compile(inputFile);
    comb_source_map(path.relative(tempDir, inputFile));
    
}
console.log(`✅  All TS-cranspile take ${((performance.now() - start)/1000).toFixed(3)}[s]`);

function isNewer(src, dest) {
    if (!fs.existsSync(dest)) return true;

    const srcTime = fs.statSync(src).mtimeMs;
    const destTime = fs.statSync(dest).mtimeMs;
    return srcTime > destTime;
}
