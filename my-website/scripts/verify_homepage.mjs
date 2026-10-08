import fs from 'node:fs';

const html = fs.readFileSync('scratch_home.html', 'utf8');

console.log('=== HOMEPAGE VERIFICATION ===');

// 1. Check Title & Meta Description
const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');

const descMatch = html.match(/<meta name="description" content="([^"]*)"/i);
console.log('Description:', descMatch ? descMatch[1] : 'NOT FOUND');

// 2. Check H1
const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
console.log('\nH1 count:', h1Matches.length);
h1Matches.forEach((h, i) => console.log(`H1 [${i+1}]:`, h.replace(/<[^>]+>/g, '').trim()));

// 3. Check H2s
const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
console.log('\nH2 count:', h2Matches.length);
h2Matches.forEach((h, i) => console.log(`H2 [${i+1}]:`, h.replace(/<[^>]+>/g, '').trim()));

// 4. Check JSON-LD
const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
if (jsonLdMatch) {
  try {
    const data = JSON.parse(jsonLdMatch[1]);
    console.log('\nJSON-LD: Valid JSON');
    console.log('JSON-LD @graph types:', data['@graph']?.map(x => x['@type']));
    const org = data['@graph']?.find(x => Array.isArray(x['@type']) ? x['@type'].includes('Organization') : x['@type'] === 'Organization');
    console.log('Organization name:', org?.name);
    console.log('Organization url:', org?.url);
    console.log('Organization logo:', org?.logo);
    console.log('Organization sameAs:', org?.sameAs);
    const faq = data['@graph']?.find(x => x['@type'] === 'FAQPage');
    console.log('FAQPage questions count:', faq?.mainEntity?.length);
    faq?.mainEntity?.forEach((q, i) => {
      console.log(`  FAQ ${i+1}: ${q.name}`);
    });
  } catch (e) {
    console.error('JSON-LD parse error:', e.message);
  }
} else {
  console.log('No JSON-LD script tag found');
}

// 5. Check Testimonials conditionality
console.log('\nTestimonials "What Clients Say" present (should be false when empty):', html.includes('What Clients Say'));

// 6. Check CTAs & Navigation
console.log('Contains "Book a Free Call" (Header):', html.includes('Book a Free Call'));
console.log('Contains "AI Agents" nav link:', html.includes('href="/services/ai-automation"'));
console.log('Contains "SEO Technical Writing" nav link:', html.includes('href="/services/seo-content-strategy"'));
console.log('Contains "web-development" link:', html.includes('href="/services/web-development"'));
console.log('Contains process anchor id:', html.includes('id="process"'));
console.log('Contains WhatsApp link:', html.includes('https://wa.me/916205482614'));

// 7. Check Footer Tagline & Order
console.log('Contains Footer Tagline:', html.includes('AI agents and SEO technical writing for businesses that want measurable growth.'));
