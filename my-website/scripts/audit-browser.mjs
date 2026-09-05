import fs from 'node:fs';

const base = process.env.AUDIT_URL || 'http://localhost:3100';
const label = process.argv[2] || 'baseline';
const target = await fetch('http://127.0.0.1:9222/json/new?about:blank', { method: 'PUT' }).then(r => r.json());
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
let seq = 0;
const pending = new Map();
ws.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  const callback = pending.get(message.id);
  if (callback) { pending.delete(message.id); message.error ? callback.reject(message.error) : callback.resolve(message.result); }
});
export function send(method, params = {}) {
  return new Promise((resolve, reject) => { const id = ++seq; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
}
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const evaluate = async expression => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
await send('Page.enable');
await send('Network.enable');
await send('Page.addScriptToEvaluateOnNewDocument', { source: `window.auditVitals={cls:0,lcp:0,lcpElement:''};new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.auditVitals.cls+=e.value}).observe({type:'layout-shift',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries()){window.auditVitals.lcp=e.startTime;window.auditVitals.lcpElement=e.element?.tagName+':'+(e.element?.textContent||e.url||'').slice(0,100)}}).observe({type:'largest-contentful-paint',buffered:true});` });
const routes = ['/', '/about', '/services', '/services/web-development', '/services/ai-automation', '/categories', '/category/react', '/resources/blog', '/resources/blog/javascript-enlightenment-master-core-concepts', '/resources/blog/ai-agents-replacing-saas-seats', '/resources', '/resources/case-studies', '/resources/case-studies/fintrack-finance-app', '/contact', '/terms', '/privacy'];
const results = [];
fs.mkdirSync('audit-artifacts', { recursive: true });
for (const route of routes) {
  for (const width of [320, 375, 768, 1024, 1280, 1440]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
    await send('Page.navigate', { url: base + route });
    for (let i=0;i<50;i++) { await sleep(100); if (await evaluate(`document.readyState === 'complete' && location.pathname === ${JSON.stringify(route)}`)) break; }
    await sleep(600);
    const metrics = await evaluate(`(()=>{const n=performance.getEntriesByType('navigation')[0];const a=document.querySelector('#article-content');return {title:document.title,h1:document.querySelector('h1')?.textContent,documentWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,height:document.body.scrollHeight,articleWidth:a?.getBoundingClientRect().width,footerMargin:getComputedStyle(document.querySelector('footer')).marginTop,ttfb:n?.responseStart,fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,...window.auditVitals,jsBytes:performance.getEntriesByType('resource').filter(r=>r.initiatorType==='script').reduce((s,r)=>s+r.encodedBodySize,0),brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')),canonical:document.querySelector('link[rel=canonical]')?.href,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent)['@type']),cookie:!!document.querySelector('[aria-label="Cookie notice"]')}})()`);
    results.push({ route, width, ...metrics });
    if ((route==='/' || route.includes('javascript-enlightenment') || route==='/services/web-development') && [375,1440].includes(width)) {
      const shot = await send('Page.captureScreenshot', { format:'png', captureBeyondViewport:false });
      fs.writeFileSync(`audit-artifacts/${label}-${route.replaceAll('/','_')||'home'}-${width}.png`,Buffer.from(shot.data,'base64'));
    }
  }
  console.log(label,route,'tested at six widths');
  fs.writeFileSync(`audit-artifacts/${label}.json`,JSON.stringify(results,null,2));
}
await send('Page.close');
ws.close();
