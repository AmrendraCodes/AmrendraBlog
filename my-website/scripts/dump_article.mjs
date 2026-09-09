import { execSync } from 'child_process';

const html = execSync('curl.exe -Ls http://localhost:3000/resources/blog/why-react-apps-slow-down-in-2026', {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024
});

const start = html.indexOf('id="article-content"');
const end = html.indexOf('</article>');
console.log('=== ARTICLE HTML START ===');
console.log(html.substring(start, start + 3000));
