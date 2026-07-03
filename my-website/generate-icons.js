const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const input = path.join(__dirname, 'public', 'logo-square.png');
  const appDir = path.join(__dirname, 'src', 'app');
  const publicDir = path.join(__dirname, 'public');

  // Generate 48x48 for favicon.ico (We can just make it a PNG and rename it to .ico, but real ICO is better. 
  // However, modern browsers accept PNG as .ico if forced, but Google prefers valid ICO.
  // We can just use the SVG we have, but Google specifically requests favicon.ico.
  // Actually, sharp doesn't output .ico directly. We can just use 48x48 png and save as favicon.ico, 
  // or we can use metadata.icons for the other sizes.
  // Let's generate the PNGs first.
  
  await sharp(input).resize(16, 16).toFile(path.join(publicDir, 'icon-16x16.png'));
  await sharp(input).resize(32, 32).toFile(path.join(publicDir, 'icon-32x32.png'));
  await sharp(input).resize(48, 48).toFile(path.join(publicDir, 'icon-48x48.png'));
  await sharp(input).resize(180, 180).toFile(path.join(appDir, 'apple-icon.png'));
  await sharp(input).resize(192, 192).toFile(path.join(publicDir, 'icon-192x192.png'));
  await sharp(input).resize(512, 512).toFile(path.join(publicDir, 'icon-512x512.png'));

  console.log('Icons generated successfully.');
}

generateIcons().catch(console.error);
