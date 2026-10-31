import fs from 'node:fs';import {spawnSync} from 'node:child_process';
for(const dir of ['src','frontend','scripts','tests'])for(const f of fs.readdirSync(dir).filter(x=>/\.(m?js)$/.test(x))){const r=spawnSync(process.execPath,['--check',dir+'/'+f],{encoding:'utf8'});if(r.status){console.error(r.stderr);process.exit(1)}}console.log('JavaScript syntax/module checks passed.');
