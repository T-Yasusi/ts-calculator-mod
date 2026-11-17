import * as Babel from '@babel/standalone';
import operatorOverloadPlugin from '../plugins/operator-overload.js';
import transformStaticImportToDynamic from './plugins/transform-static-import-to-dynamic.js';

export default function(code: string, fileName = 'file.ts'){
    try{
	const result = Babel.transform(code, {
            presets: [ 'typescript' ],
            filename: fileName,
            plugins: [
		operatorOverloadPlugin,
		transformStaticImportToDynamic,
            ],
            sourceFileName: fileName,
            sourceType: 'module',
            configFile: false,
            babelrc: false,
	});

	return result?.code;
    } catch(err) {
        console.log('Babel Transpile Error');
    }
}
