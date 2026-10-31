import {build} from 'esbuild';
await build({entryPoints:['frontend/customer.js','frontend/owner.js'],bundle:true,outdir:'public',format:'esm',minify:true,sourcemap:false});
console.log('Browser bundles built.');
