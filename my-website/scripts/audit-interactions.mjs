import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.env.AUDIT_URL || 'http://localhost:3102';
const target = await fetch('http://127.0.0.1:9222/json/new?about:blank', { method:'PUT' }).then(r=>r.json());
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let seq=0;const pending=new Map();const errors=[];
ws.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text+': '+m.params.exceptionDetails.exception?.description);if(pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}});
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.text);return r.result.value;};
await send('Page.enable');await send('Runtime.enable');await send('Network.enable');
// Mock only outgoing form/telemetry requests: no email, newsletter or analytics writes.
await send('Page.addScriptToEvaluateOnNewDocument',{source:`window.auditRequests=[];const originalFetch=window.fetch;window.fetch=(url,options)=>{if(['/api/contact','/api/newsletter','/api/track'].some(path=>String(url).endsWith(path))){window.auditRequests.push({url:String(url),body:options?.body});return Promise.resolve(new Response(JSON.stringify({success:true}),{status:200,headers:{'Content-Type':'application/json'}}))}return originalFetch(url,options)};`});
await send('Network.setBlockedURLs',{urls:['*googletagmanager.com*','*google-analytics.com*','*facebook.net*','*facebook.com*']});
const navigate=async route=>{await send('Page.navigate',{url:base+route});await wait(1400);};
const click=async selector=>{assert.ok(await evaluate(`!!document.querySelector(${JSON.stringify(selector)})`),selector);await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);await wait(300);};
const setInput=async(selector,value)=>evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});Object.getOwnPropertyDescriptor(e.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set.call(e,${JSON.stringify(value)});e.dispatchEvent(new Event('input',{bubbles:true}));})()`);
const checks=[];
await send('Emulation.setDeviceMetricsOverride',{width:375,height:900,deviceScaleFactor:1,mobile:true});
await navigate('/');await evaluate('localStorage.clear();sessionStorage.clear()');await navigate('/');
assert.ok(await evaluate(`!!document.querySelector('[aria-label="Cookie notice"]')`));
await click('[aria-label="Dismiss cookie notice"]');
assert.equal(await evaluate(`!!document.querySelector('[aria-label="Cookie notice"]')`),false);
await navigate('/');assert.ok(await evaluate(`!!document.querySelector('[aria-label="Cookie notice"]')`));
await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent==='Accept All Cookies').click()`);await wait(1600);
assert.equal(await evaluate(`!!document.querySelector('[aria-label="Cookie notice"]')`),false);
assert.equal(await evaluate(`JSON.parse(localStorage.getItem('cwa_cookie_consent')).preferences.analytics`),true);
await navigate('/');assert.ok(await evaluate(`!!document.querySelector('[aria-label="Cookie notice"]')`));
await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent==='Reject All').click()`);await wait(300);
assert.equal(await evaluate(`JSON.parse(localStorage.getItem('cwa_cookie_consent')).preferences.analytics`),false);
checks.push('Cookie dismissal, accept/reject persistence and redisplay on refresh');
await evaluate(`window.dispatchEvent(new CustomEvent('cwa:open-cookie-settings'))`);await wait(200);
assert.ok(await evaluate(`!!document.querySelector('#cookie-settings-title')`));
await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});await wait(200);
assert.equal(await evaluate(`!!document.querySelector('#cookie-settings-title')`),false);
checks.push('Footer cookie settings and Escape close');
await click('[aria-label="Toggle Dark Mode"]');
assert.ok(await evaluate(`document.documentElement.classList.contains('dark')`));
await click('[aria-label="Toggle Dark Mode"]');checks.push('Theme toggle');
await click('[aria-label="Open menu"]');
assert.ok(await evaluate(`!!document.querySelector('[role="dialog"][aria-modal="true"]:not([inert])')`));
await click('[aria-label="Close menu"]');checks.push('Mobile menu opens and closes');
await evaluate(`window.auditNavigationMarker='retained'`);
await evaluate(`document.querySelector('a[href="/services"]').click()`);await wait(1200);
assert.equal(await evaluate('location.pathname'),'/services');assert.equal(await evaluate('window.auditNavigationMarker'),'retained');checks.push('Next.js internal navigation preserves document');
await navigate('/resources/blog');await click('[aria-label="Dismiss cookie notice"]');
await setInput('input[type="text"]','zzzz-no-matching-post');await wait(500);
assert.ok(await evaluate(`document.body.innerText.includes('No articles found')`));
await setInput('input[type="text"]','');await wait(500);checks.push('Blog search and clear');
await navigate('/resources/blog/javascript-enlightenment-master-core-concepts');await click('[aria-label="Dismiss cookie notice"]');
assert.ok(await evaluate(`document.querySelector('#article-content').innerText.length>1000`));
assert.equal(await evaluate(`document.querySelectorAll('#article-content p figure').length`),0);
const rhythm=await evaluate(`(()=>{const a=document.querySelector('#article-content');const css=q=>{const e=a.querySelector(q);if(!e)return null;const c=getComputedStyle(e);return {top:c.marginTop,bottom:c.marginBottom,lineHeight:c.lineHeight}};return {paragraph:css('p'),h2:css('h2'),h3:css('h3'),codeWrapper:css('.code-block-wrapper'),pre:css('.code-block-wrapper > pre'),table:css('.table-wrapper > table')}})()`);
assert.equal(rhythm.paragraph.bottom,'18px');
// The first article block intentionally has no leading gap.
assert.ok(['0px','40px'].includes(rhythm.h2.top));
if(rhythm.pre)assert.equal(rhythm.pre.top,'0px');
await evaluate(`window.auditCopied='';navigator.clipboard.writeText=async value=>{window.auditCopied=value}`);
if(await evaluate(`!!document.querySelector('[aria-label="Copy code"]')`)){await click('[aria-label="Copy code"]');assert.ok(await evaluate('window.auditCopied.length>0'));}
checks.push('Server article, valid image markup, typography rhythm and highlighted-code copy');
await navigate('/services/web-development');await click('[aria-label="Dismiss cookie notice"]');
await click('#faq-button-1');assert.equal(await evaluate(`document.querySelector('#faq-button-1').getAttribute('aria-expanded')`),'true');checks.push('Service FAQ accordion');
await navigate('/contact');await click('[aria-label="Dismiss cookie notice"]');
const fields=await evaluate(`[...document.querySelectorAll('form input,form textarea')].map(e=>({name:e.name,type:e.type,tag:e.tagName}))`);
for(const field of fields)await setInput(`[name="${field.name}"]`,field.type==='email'?'audit@example.com':field.tag==='TEXTAREA'?'Local mocked UI verification only.':'Audit Test');
await evaluate(`document.querySelector('form').requestSubmit()`);await wait(500);
assert.ok(await evaluate(`window.auditRequests.some(r=>r.url==='/api/contact')`));checks.push('Contact form submits successfully to local mock');
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
await navigate('/');await click('[aria-label="Dismiss cookie notice"]');
const reduced=await evaluate(`getComputedStyle(document.documentElement).scrollBehavior`);assert.equal(reduced,'auto');
const layouts=[];
for(const route of ['/','/about','/services/web-development','/categories','/resources/blog/javascript-enlightenment-master-core-concepts','/resources/case-studies/fintrack-finance-app','/contact','/privacy']){
  for(const width of [320,375,768,1024,1280,1440]){
    await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});await navigate(route);
    await evaluate(`localStorage.setItem('theme','dark');document.documentElement.classList.remove('light');document.documentElement.classList.add('dark');document.querySelector('[aria-label="Dismiss cookie notice"]')?.click()`);
    await evaluate(`(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,30))}window.scrollTo({top:0,behavior:'instant'})})()`);await wait(150);
    const layout=await evaluate(`({width:innerWidth,documentWidth:document.documentElement.scrollWidth,articleWidth:document.querySelector('#article-content')?.getBoundingClientRect().width,images:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src'))})`);
    assert.ok(layout.documentWidth<=width,route+' overflow');layouts.push({route,...layout});
    if(width===375 && (route==='/'||route.includes('javascript-enlightenment'))){const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync('audit-artifacts/dark-'+route.replaceAll('/','_')+'-375.png',Buffer.from(shot.data,'base64'));}
  }
  console.log('Dark/reduced-motion full-scroll checks',route);
}
checks.push('48 dark/reduced-motion full-scroll route/viewport checks');
fs.writeFileSync('audit-artifacts/interactions.json',JSON.stringify({checks,rhythm,layouts,errors},null,2));
assert.equal(errors.length,0,errors.join('\n'));
console.log(checks.join('\n'));
await send('Page.close');ws.close();
