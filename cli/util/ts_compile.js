import path from 'node:path'
import { execSync } from 'child_process'
import fs from 'node:fs'

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
    const outputFile = options.rootDir ? path.join(outputDir, path.relative(options.rootDir, inputFile)).replace('.ts', '.js') : '';
    
    let str = '';
    for( const [ k, v] of Object.entries(options) ){	
	if( v == null ) continue;
	else if( v === true  ) str += `--${k} `;
//	else if( v === false ) str += `--no${k[0].toUpperCase()}${k.slice(1)} `;
	else str += `--${k} ${v} `;
    }
    
    if( !isNewer(inputFile, outputFile) ){
	if( dumpLevel > 0 ) console.log(`✓ TS-compole ...skip: ${inputFile} → ${outputFile} source is not updated`);
	return;
    }
    
    try {
        execSync(`npx tsc ${inputFile} `+str, { stdio: 'inherit' });
        if( dumpLevel > 0 ) console.log(`✓ TS-cranspile success: ${inputFile} → ${outputFile}`);
    } catch (e) {
        console.log(e);
        console.error('TS compilation failed');
        process.exit(1);
    }
//    process.exit(0);
}

function isNewer(src, dest) {
    if (!fs.existsSync(dest)) return true;
    
    const srcTime = fs.statSync(src).mtimeMs;
    const destTime = fs.statSync(dest).mtimeMs;
    return srcTime > destTime;
}
