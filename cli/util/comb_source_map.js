import fs from 'node:fs';
import remapping from '@ampproject/remapping';
import path from 'node:path';
import { tempDir, outputDir } from '../config.js'

export default function comb_source_map(sourcePath){
    const intermediateFile = path.resolve(tempDir, sourcePath);

    const babelMapPath = path.join(tempDir, sourcePath + '.map');
    const tsMapPath = path.join(outputDir, sourcePath.replace('.ts', '.js') + '.map');

    if( fs.existsSync(babelMapPath) ){
        const babelMap = JSON.parse(fs.readFileSync(babelMapPath));
        const tsMap = JSON.parse(fs.readFileSync(tsMapPath));
        const finalMap = remapping(
            tsMap,
            (source) => {
                const resolvedSource = path.isAbsolute(source)
                      ? path.normalize(source)
                      : path.resolve(path.dirname(tsMapPath), source);
                if (resolvedSource === intermediateFile) {
                    return babelMap;
                }
                return null;
            }
        );
	fs.writeFileSync(tsMapPath, JSON.stringify(finalMap), 'utf-8');
	//	console.log('   > Combine SouceMap');
    }
    //    else console.log('not found babel map');
}
