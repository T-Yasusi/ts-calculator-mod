import fs from 'node:fs';
import path from 'node:path';

function rmDir(dir){
    console.log('> remove ', dir);
    for (const file of fs.readdirSync(dir)) {
	fs.rmSync(path.join(dir, file), { recursive: true, force: true });
    }
}

console.log('Clean up Start');
rmDir('./temp');
rmDir('./lib');
console.log('Clean up Finish');
