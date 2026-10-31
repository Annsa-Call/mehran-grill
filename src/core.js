export const id=()=>crypto.randomUUID();
export const now=()=>new Date().toISOString();
export const future=(days)=>new Date(Date.now()+days*86400000).toISOString();
export const token=()=>Array.from(crypto.getRandomValues(new Uint8Array(32)),x=>x.toString(16).padStart(2,'0')).join('');
export async function hash(s){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s))),x=>x.toString(16).padStart(2,'0')).join('');}
export function phone(s){s=String(s||'').replace(/[\s()-]/g,'');if(/^03\d{9}$/.test(s))s='+92'+s.slice(1);if(/^923\d{9}$/.test(s))s='+'+s;if(!/^\+923\d{9}$/.test(s))throw new Error('Enter a valid Pakistani mobile number (03XXXXXXXXX).');return s;}
export function text(v,max=100){if(typeof v!=='string'||v.trim().length>max)throw new Error('Invalid text.');return v.trim();}
export function integer(v,min,max){if(!Number.isInteger(v)||v<min||v>max)throw new Error('Invalid number.');return v;}
export function birthday(month,day){if(month==null&&day==null)return [null,null];integer(month,1,12);integer(day,1,new Date(Date.UTC(2024,month,0)).getUTCDate());return [month,day];}
export function money(subtotal,bps,discount=0){const tax=Math.round(subtotal*bps/10000);return {subtotal,tax,discount,total:subtotal+tax-discount};}
export function localDate(d=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Karachi',year:'numeric',month:'2-digit',day:'2-digit'}).format(d);}
export async function passwordHash(password,salt=token().slice(0,32)){const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);const out=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:new TextEncoder().encode(salt),iterations:100000},k,256);return `pbkdf2:100000:${salt}:${Array.from(new Uint8Array(out),x=>x.toString(16).padStart(2,'0')).join('')}`;}
export function safeEqual(a,b){if(a.length!==b.length)return false;let n=0;for(let i=0;i<a.length;i++)n|=a.charCodeAt(i)^b.charCodeAt(i);return n===0;}
export async function verifyPassword(p,stored){return safeEqual(await passwordHash(p,stored.split(':')[2]),stored);}
export function safeUrl(v){if(!v)return '';const u=new URL(v);if(u.protocol!=='https:')throw new Error('An HTTPS URL is required.');return u.href;}
