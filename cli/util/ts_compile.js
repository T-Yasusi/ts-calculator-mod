import path from 'node:path';
import { execSync } from 'child_process';

import comb_source_map from './comb_source_map.js'
import { tempDir, outputDir, dumpLevel } from '../config.js'

const defaultOptions = {
    ignoreConfig: true,
    outDir: outputDir,
    rootDir: tempDir,
    module: 'NodeNext',
    moduleResolution: 'NodeNext',
    target: 'ES2020',
    esModuleInterop: true,
    allowJS: false,
    noEmitOnError: true,
    sourceMap: true,
    inlineSources: true,
    allowImportingTsExtensions: true,
    rewriteRelativeImportExtensions: true,    
};

export default function ts_compile(inputFile, arg_options = {}){
    const options = { ...defaultOptions, ...arg_options };
    let str = '';
    for( const [ k, v] of Object.entries(options) ){
	if( v == null ) continue;
	else if( v === true  ) str += `--${k} `;
//	else if( v === false ) str += `--no${k[0].toUpperCase()}${k.slice(1)} `;
	else str += `--${k} ${v} `;
    }
    console.log(str);
    
    try {
        execSync(`npx tsc ${inputFile} `+str, { stdio: 'inherit' });
        if( dumpLevel > 0 ) console.log(`✓ Transpile success: ${inputFile} → ${path.join(outputDir, path.basename(inputFile))}`);

        comb_source_map(path.relative(tempDir, inputFile));
    } catch (e) {
        console.log(e);
        console.error('TS compilation failed');
        process.exit(1);
    }
}
