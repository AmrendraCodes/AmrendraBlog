import assert from 'node:assert/strict';
import { getFAQSchema, extractFaqsFromContent, cleanMarkdownText } from '../src/lib/schema.js';
import { normalizePostFaqs, getPostBySlug } from '../src/lib/posts.js';

const tests = [
  ['multiple valid FAQs produce FAQPage questions', () => {
    const schema = getFAQSchema([
      { question: ' What is Next.js? ', answer: 'A **React** framework.' },
      { question: 'Can it scale?', answer: 'Yes, with the right architecture.' },
    ]);
    assert.equal(schema?.['@type'], 'FAQPage');
    assert.equal(schema.mainEntity.length, 2);
    assert.equal(schema.mainEntity[0].name, 'What is Next.js?');
    assert.equal(schema.mainEntity[0].acceptedAnswer.text, 'A React framework.');
  }],
  ['one valid FAQ produces one question', () => {
    const schema = getFAQSchema([{ question: 'One?', answer: 'One answer.' }]);
    assert.equal(schema.mainEntity.length, 1);
  }],
  ['no valid FAQs produce no FAQPage', () => {
    assert.equal(getFAQSchema([]), null);
    assert.equal(getFAQSchema([{ question: ' ', answer: 'Answer' }, { question: 'Question?', answer: ' ' }]), null);
  }],
  ['non-string FAQ values never become object text', () => {
    assert.equal(getFAQSchema([{ question: 'Question?', answer: { text: 'not accepted as CMS answer' } }]), null);
  }],
  ['Markdown FAQ fallback parses older posts', () => {
    const faqs = extractFaqsFromContent('## Frequently Asked Questions\n\n### What is it?\n\nIt is useful.');
    assert.deepEqual(faqs, [{ question: 'What is it?', answer: 'It is useful.' }]);
  }],
  ['FAQ data normalizes database JSON strings and aliases', () => {
    assert.deepEqual(normalizePostFaqs(JSON.stringify([{ name: 'Alias?', text: 'Answer' }])), [
      { question: 'Alias?', answer: 'Answer' },
    ]);
  }],
  ['existing filesystem posts without CMS FAQs remain readable', () => {
    const post = getPostBySlug('how-much-does-a-nextjs-website-cost-in-2026');
    assert.ok(post);
    assert.ok(!post.faqs || Array.isArray(post.faqs));
    assert.doesNotThrow(() => extractFaqsFromContent(post.content));
  }],
  ['JSON-LD serialization cannot close the script tag', () => {
    const schema = getFAQSchema([{ question: 'Safe?', answer: '</script><script>alert(1)</script>' }]);
    const serialized = JSON.stringify(schema).replace(/</g, '\\u003c');
    assert.equal(serialized.includes('</script>'), false);
    assert.equal(cleanMarkdownText('**Readable** [answer](https://example.com)'), 'Readable answer');
  }],
];

let failed = 0;
for (const [name, test] of tests) {
  try {
    test();
    console.log(`PASS: ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL: ${name}`);
    console.error(error);
  }
}

console.log(`FAQ verification: ${tests.length - failed}/${tests.length} passed`);
if (failed) process.exitCode = 1;
