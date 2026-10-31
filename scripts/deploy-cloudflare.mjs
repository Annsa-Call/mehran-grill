import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const config=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8')),db=config.d1_databases?.find(d=>d.binding==='DB');
if(!db||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(db.database_id||'')){console.error('DEPLOYMENT STOPPED: configure the real Cloudflare D1 database_id first. Run: npm run configure:cloudflare -- YOUR_REAL_D1_DATABASE_ID. Do not use Supabase or your Cloudflare account ID.');process.exit(1);}
if(!/^[a-z][a-z0-9-]{0,62}$/.test(config.name||'')){console.error('Configure a valid Worker name matching the new Cloudflare project.');process.exit(1);}
const run=(command,args)=>{const x=spawnSync(command,args,{stdio:'inherit',shell:process.platform==='win32',env:{...process.env,CI:'true'}});if(x.status!==0)process.exit(x.status||1)};
run('node',['scripts/build.mjs']);run('node',['scripts/seed.mjs']);
run('npx',['wrangler','d1','migrations','apply',db.database_name,'--remote']);
run('npx',['wrangler','d1','execute',db.database_name,'--remote','--file=data/menu-seed.sql']);
run('npx',['wrangler','deploy']);
console.log('Deployment command finished. Verify /api/health and create your owner account with npm run owner:remote.');
