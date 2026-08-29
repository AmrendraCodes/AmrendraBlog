import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

// Read .env manually for standalone script
const envContent = fs.readFileSync(path.resolve(process.cwd(), '.env'), 'utf-8');
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const val = match[2].trim().replace(/^["']|["']$/g, '');
    process.env[key] = val;
  }
}

async function runTest() {
  console.log('Testing Vercel Blob upload with configured token...');
  console.log('Token prefix:', process.env.BLOB_READ_WRITE_TOKEN ? process.env.BLOB_READ_WRITE_TOKEN.substring(0, 20) + '...' : 'NONE');

  try {
    const sampleBuffer = Buffer.from('Test image upload content for AmrendraBlog verification');
    const blob = await put('test/hello-blob.txt', sampleBuffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log('✅ SUCCESS! File successfully uploaded to Vercel Blob:');
    console.log('🔗 URL:', blob.url);
    console.log('📁 Pathname:', blob.pathname);
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
  }
}

runTest();
