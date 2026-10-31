// Escaping and toast patterns retained and improved from CafeDesk/shared.js.
export const $=s=>document.querySelector(s);
export const e=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const R=n=>'Rs '+(Number(n||0)/100).toLocaleString('en-PK',{maximumFractionDigits:2});
export const date=d=>d?new Date(d).toLocaleString('en-PK',{timeZone:'Asia/Karachi',dateStyle:'medium',timeStyle:'short'}):'—';
export async function api(path,method='GET',data,headers={}){const r=await fetch('/api/'+path,{method,headers:{'content-type':'application/json',...headers},body:data===undefined?undefined:JSON.stringify(data)});const b=await r.json();if(!r.ok)throw Object.assign(new Error(b.error||'Request failed'),{status:r.status});return b;}
let timer;export function toast(message){let t=$('#toast');t.textContent=message;t.hidden=false;clearTimeout(timer);timer=setTimeout(()=>t.hidden=true,5000);}
export async function run(fn){try{await fn()}catch(err){toast(err.message);const loading=$('.loading');if(loading){loading.className='empty';loading.textContent='Unable to load this screen. Please refresh to try again.';}}}
export function field(label,name,value='',type='text',extra=''){return `<label>${e(label)}<input name="${e(name)}" type="${type}" value="${e(value)}" ${extra}></label>`;}
export const check=(label,name,on=false)=>`<label class="check"><input type="checkbox" name="${name}" ${on?'checked':''}>${e(label)}</label>`;
export function dialog(html){const d=$('#dialog');d.innerHTML=`<button class="close secondary" aria-label="Close dialog" id="close-dialog">×</button>${html}`;d.showModal();$('#close-dialog').onclick=()=>d.close();return d;}
export const formData=f=>Object.fromEntries(new FormData(f));
export const friendly=s=>s.toLowerCase().replace(/(^|\s)\S/g,c=>c.toUpperCase());
export const random=()=>Array.from(crypto.getRandomValues(new Uint8Array(32)),x=>x.toString(16).padStart(2,'0')).join('');
export function badge(text){return `<span class="badge">${e(text.replaceAll('_',' '))}</span>`;}
