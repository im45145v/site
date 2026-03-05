#!/usr/bin/env node
/**
 * Build script: inlines data.json into index.html as window.SITE_DATA
 * so GitHub Pages serves a fully self-contained static file.
 *
 * Usage: node build.js
 */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const dataPath  = path.join(root, 'data.json');
const inputPath = path.join(root, 'index.html');

// Read and validate data.json
let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (e) {
  console.error('❌ Failed to parse data.json:', e.message);
  process.exit(1);
}

// Read index.html
let html = fs.readFileSync(inputPath, 'utf8');

// Remove any previously injected SITE_DATA block
html = html.replace(/\n?<!-- SITE_DATA:START -->[\s\S]*?<!-- SITE_DATA:END -->\n?/g, '');

// Build the inline script block
const inlineScript = `<!-- SITE_DATA:START -->
<script>window.SITE_DATA = ${JSON.stringify(data, null, 2)};</script>
<!-- SITE_DATA:END -->`;

// Inject just before <script src="script.js">
if (!html.includes('<script src="script.js">')) {
  console.error('❌ Could not find <script src="script.js"> in index.html');
  process.exit(1);
}

html = html.replace('<script src="script.js">', `${inlineScript}\n  <script src="script.js">`);

// Write back to index.html
fs.writeFileSync(inputPath, html, 'utf8');

console.log('✅ Build complete — data.json inlined into index.html');
