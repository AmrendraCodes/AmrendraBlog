import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const viewports = [
  { width: 375, height: 812, name: 'after_375' },
  { width: 768, height: 1024, name: 'after_768' },
  { width: 1280, height: 900, name: 'after_1280' },
  { width: 1536, height: 960, name: 'after_1536' },
  { width: 375, height: 7500, name: 'after_full_375' },
  { width: 768, height: 6500, name: 'after_full_768' },
  { width: 1280, height: 5500, name: 'after_full_1280' },
  { width: 1536, height: 5200, name: 'after_full_1536' }
];

const outDir = path.resolve('public/audit-screenshots');

for (const vp of viewports) {
  const outFile = path.join(outDir, `${vp.name}.png`);
  console.log(`Capturing ${vp.name} (${vp.width}x${vp.height}) -> ${outFile}`);
  spawnSync(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-dark-mode',
    `--window-size=${vp.width},${vp.height}`,
    `--screenshot=${outFile}`,
    'http://localhost:3000/tools/ai-agent-cost-calculator'
  ], { timeout: 45000 });
}
console.log('Finished capturing all after screenshots');
