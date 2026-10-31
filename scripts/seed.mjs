import fs from 'node:fs';
const m=JSON.parse(fs.readFileSync('data/menu.json','utf8'));const q=v=>v==null?'NULL':typeof v==='number'?v:"'"+String(v).replaceAll("'","''")+"'";const sql=[];
m.categories.forEach((name,i)=>sql.push(`INSERT INTO categories(id,name,position) VALUES(${q('cat-'+i)},${q(name)},${i}) ON CONFLICT(id) DO NOTHING;`));
for(const r of m.items){sql.push(`INSERT INTO menu_items(id,category_id,name,description,image,available,earns_stamp,source_page,source_note,preorder) VALUES(${[r.id,'cat-'+m.categories.indexOf(r.category),r.name,r.description,r.image,r.available,r.earns_stamp,r.source_page,r.source_note,r.preorder].map(q).join(',')}) ON CONFLICT(id) DO NOTHING;`);for(const v of r.variants)sql.push(`INSERT INTO variants VALUES(${[v.id,r.id,v.name,v.price].map(q).join(',')}) ON CONFLICT(id) DO NOTHING;`);}
for(let i=1;i<=12;i++)sql.push(`INSERT INTO dining_tables VALUES('T${String(i).padStart(2,'0')}','Table ${i}',1) ON CONFLICT(id) DO NOTHING;`);
for(const parent of m.items.filter(r=>['KATAKAT','BRAIN MASALA','CHICKEN FRIED RICE','VEGETABLE FRIED RICE'].includes(r.name)))for(const addon of m.items.filter(r=>r.category==='Add-ons'&&(r.name==='EXTRA BUTTER'?parent.category==='Chinese':['KATAKAT','BRAIN MASALA'].includes(parent.name))))sql.push(`INSERT OR IGNORE INTO addon_links VALUES(${q(parent.id)},${q(addon.id)});`);
fs.writeFileSync('data/menu-seed.sql',sql.join('\n')+'\n');
console.log(`Generated ${m.items.length} entries, ${m.items.reduce((s,i)=>s+i.variants.length,0)} variants.`);
