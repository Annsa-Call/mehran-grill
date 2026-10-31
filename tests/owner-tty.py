import os,pty,subprocess,select,time,tempfile,shutil,secrets
state=tempfile.mkdtemp(prefix='mehran-setup-')
try:
 r=subprocess.run(['npx','wrangler','d1','migrations','apply','mehran-grill','--local','--persist-to',state],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 assert r.returncode==0
 master,slave=pty.openpty();env=os.environ.copy();env['MG_PERSIST_TO']=state;env.pop('MG_OWNER_EMAIL',None);env.pop('MG_OWNER_PASSWORD',None)
 p=subprocess.Popen(['node','scripts/create-owner.mjs','--local'],stdin=slave,stdout=slave,stderr=slave,env=env);os.close(slave)
 password=secrets.token_hex(24);buf=b'';sent_email=False;sent_pass=False;deadline=time.time()+50
 while time.time()<deadline:
  if select.select([master],[],[],0.2)[0]:
   try: chunk=os.read(master,65536)
   except OSError: break
   if not chunk:break
   buf+=chunk
   if not sent_email and b'Owner email:' in buf: os.write(master,b'tty-owner@example.invalid\n');sent_email=True
   if not sent_pass and b'(12+ characters, hidden):' in buf: os.write(master,password.encode()+b'\n');sent_pass=True
  if p.poll() is not None:break
 p.wait(timeout=8);os.close(master)
 assert sent_email and sent_pass and p.returncode==0, 'Interactive setup failed'
 assert password.encode() not in buf,'Password was echoed; trace: '+repr(buf.replace(password.encode(),b'[REDACTED]'))
 print('PASS: actual terminal owner setup accepted input without echoing password.')
finally:shutil.rmtree(state,ignore_errors=True)
