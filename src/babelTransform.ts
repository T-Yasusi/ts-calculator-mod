// import { transformSync } from '@babel/core';
import * as Babel from '@babel/standalone';
// import syntaxTypeScript from '@babel/plugin-syntax-typescript';
import operatorOverloadPlugin from '../plugins/operator-overload.js';
// import transformStaticImportToDynamic from '/plugins/transform-static-import-to-dynamic.js';

export default function(code: string, fileName = 'file.ts'){
    try{
	return Babel.transform(code, {
            presets: [ 'typescript' ],
            filename: fileName,
            plugins: [
		operatorOverloadPlugin
            ],
            sourceFileName: fileName,
            sourceType: 'module',
            configFile: false,
            babelrc: false,
	}).code;
    } catch(err) {
        console.log('Babel Transpile Error');
    }
}
