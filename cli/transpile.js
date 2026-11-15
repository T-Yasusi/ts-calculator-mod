import ts from 'typescript';
import { transformSync } from '@babel/core';
import path from 'node:path';
import fs from 'node:fs';
import glob from 'fast-glob';
import operatorOverloadPlugin from '../plugins/operator-overload.js';

const srcDir = path.resolve('calc');
const outDir = path.resolve('lib');
const files = await glob(srcDir + '/**/*.ts');
console.log(files);

const options = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    strict: true,
    skipLibCheck: true,
    rootDir: srcDir,
    outDir,
    noEmitOnError: true,
    // import Vector from './Vector.ts' を許可し、出力JSでは './Vector.js' に書き換える
    allowImportingTsExtensions: true,
    rewriteRelativeImportExtensions: true,
};

const host = ts.createCompilerHost(options);
const origGetSourceFile = host.getSourceFile.bind(host);

host.getSourceFile = (fileName, languageVersion, onError, shouldCreate) => {
    const isUserTs =
	fileName.endsWith('.ts') &&
	!fileName.endsWith('.d.ts') &&
	!fileName.includes('node_modules') &&
	!path.resolve(fileName).includes('operators');
    if (!isUserTs) return origGetSourceFile(fileName, languageVersion, onError, shouldCreate);

    console.log('Pre-transpile ', fileName);
    const src = fs.readFileSync(fileName, 'utf8');
    const out = transformSync(src, {
	filename: fileName,
	babelrc: false,
	configFile: false,
	parserOpts: { plugins: ['typescript'] }, // 型注釈は残す（preset-typescriptは入れない）
	plugins: [operatorOverloadPlugin],
	retainLines: true,                        // 型エラーの行番号を元ソースに近づける
    });
    return ts.createSourceFile(fileName, out.code, languageVersion, true);
};

const program = ts.createProgram(files, options, host);

const diagnostics = ts.getPreEmitDiagnostics(program);
const result = program.emit();
const all = diagnostics.concat(result.diagnostics);

if (all.length) {
    console.error(
	ts.formatDiagnosticsWithColorAndContext(all, {
	    getCanonicalFileName: (f) => f,
	    getCurrentDirectory: () => process.cwd(),
	    getNewLine: () => '\n',
	})
    );
}
process.exit(result.emitSkipped || all.length ? 1 : 0);
