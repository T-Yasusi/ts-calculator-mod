import './style/style.css'

import createMonacoEditor from './createMonacoEditor.js'
import babelTransform from './babelTransform.js'

const editor = createMonacoEditor(document.getElementById('editor') as HTMLElement);

document.getElementById('template')?.addEventListener('change', async (e)=> {
    const value = e.target.value;
    if( value === 'no-code' ) editor.setValue('');
    else{
        const response = await fetch(`${value}`);	
	if( response.headers.get('content-type') !== 'text/javascript' ){
	    console.error('Invalid Responce for TS-code');
	    return;
	}
        const code = (await response.text());
	editor.setValue(code);
    }
});
document.getElementById('template')?.dispatchEvent(new Event('change'));

document.getElementById('run')?.addEventListener('click', async () => {
    const originalCode = editor.getValue();
    const jsCode = babelTransform(originalCode);
    console.log('code : ', jsCode);
    try{
	const blob = new Blob([`(async () => { try{ ${jsCode} } catch(err) { throw err; } })()`], { type: 'application/javascript' });
	const url = URL.createObjectURL(blob);
	const mod = await import(/* @vite-ignore */ url);
	URL.revokeObjectURL(url);
    } catch(e){
	console.error('Runtime Error');
	console.error(e);
    }
});

console.log(editor);
// console.log(babelTransform);
