import path from 'node:path';
import { execSync } from 'child_process';

import comb_source_map from './comb_source_map.js'
import { tempDir, outputDir } from '../config.js'

export default function ts_compile(inputFile, outputDir){
    try {
        execSync(`npx tsc ${inputFile} --outDir ${outputDir} --ignoreConfig --rootDir ${tempDir} `+
                 `--module NodeNext --moduleResolution NodeNext --target ES2020 --esModuleInterop --allowJs false --noEmitOnError true `+
                 `--sourceMap --inlineSources --allowImportingTsExtensions --rewriteRelativeImportExtensions`,
                 { stdio: 'inherit' });
        console.log(`✅ Transpile success: ${inputFile} → ${path.join(outputDir, path.basename(inputFile))}`);

        comb_source_map(path.relative(tempDir, inputFile));
    } catch (e) {
        console.log(e);
        console.error('TS compilation failed');
        process.exit(1);
    }
}
