import { transformSync } from '@babel/core';
import syntaxTypeScript from '@babel/plugin-syntax-typescript';
import operatorOverloadPlugin from '../../plugins/operator-overload.js';

export default function operator_overload(inputCode, filename='temp.ts'){
    return transformSync(inputCode, {
        filename: filename,
        plugins: [
            syntaxTypeScript,
            operatorOverloadPlugin,
        ],
        sourceMap: true,
        sourceFileName: filename,
        sourceType: 'module',
        configFile: false,
        babelrc: false,
    });
}
