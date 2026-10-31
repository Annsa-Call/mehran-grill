import fs from 'node:fs';
const id=process.argv[2],p='wrangler.jsonc',config=JSON.parse(fs.readFileSync(p,'utf8')),name=process.argv[3]||config.name;
if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id||'')){console.error('Usage: npm run configure:cloudflare -- YOUR_REAL_D1_DATABASE_ID [worker-name]\nUse the D1 Database ID, not a Cloudflare account ID or Supabase ID.');process.exit(1);}
if(!/^[a-z][a-z0-9-]{0,62}$/.test(name||'')){console.error('Worker name must be 1-63 lowercase letters/digits/hyphens, starting with a letter.');process.exit(1);}
const db=config.d1_databases?.find(d=>d.binding==='DB');if(!db)throw new Error('Missing DB binding');config.name=name;db.database_id=id;fs.writeFileSync(p,JSON.stringify(config,null,2)+'\n');console.log(`Configured Worker ${name} and DB binding. Commit wrangler.jsonc. No credentials were saved.`);
