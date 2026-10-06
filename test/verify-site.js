/**
 * Automated Verification Script for kuasha.xyz
 * Asserts file integrity, syntax validity, asset references, and accessibility contracts.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✓ ${message}`);
}

console.log('--- STARTING kuasha.xyz VERIFICATION SUITE ---');

// 1. Core entry point
const indexPath = path.join(rootDir, 'index.html');
assert(fs.existsSync(indexPath), 'index.html exists');
const htmlContent = fs.readFileSync(indexPath, 'utf-8');

// 2. Critical sections
const requiredSections = [
  '#hero',
  '#architecture',
  '#resumes',
  '#opensource',
  '#journey',
  '#skills',
  '#terminal',
  '#contact'
];
for (const sec of requiredSections) {
  const id = sec.substring(1);
  assert(htmlContent.includes(`id="${id}"`), `Section with id="${id}" exists in HTML`);
}

// 3. CNAME
const cnamePath = path.join(rootDir, 'CNAME');
assert(fs.existsSync(cnamePath), 'CNAME file exists');
const cnameContent = fs.readFileSync(cnamePath, 'utf-8').trim();
assert(cnameContent === 'kuasha.xyz', `CNAME contains "kuasha.xyz" (found: "${cnameContent}")`);

// 4. PDF Resumes verification
const requiredPdfs = [
  'Arafat_Zahan_Curriculum_Vitae.pdf',
  'Arafat_Zahan_Systems_Architect_CV.pdf',
  'Arafat_Zahan_Founding_Engineer_CV.pdf',
  'Arafat_Zahan_Staff_FullStack_CV.pdf'
];
for (const pdf of requiredPdfs) {
  const pdfPath = path.join(rootDir, 'assets/pdf', pdf);
  assert(fs.existsSync(pdfPath), `PDF exists: ${pdf}`);
  const stats = fs.statSync(pdfPath);
  assert(stats.size > 10000, `PDF ${pdf} is non-trivial size (${stats.size} bytes)`);
}

// 5. JavaScript Syntax & Integrity
const jsFiles = [
  'assets/js/audio.js',
  'assets/js/architecture.js',
  'assets/js/terminal.js',
  'assets/js/command-palette.js',
  'assets/js/app.js'
];
for (const js of jsFiles) {
  const jsPath = path.join(rootDir, js);
  assert(fs.existsSync(jsPath), `JS file exists: ${js}`);
  // Run node syntax check
  try {
    execSync(`node --check "${jsPath}"`);
    console.log(`✓ Syntax valid for ${js}`);
  } catch (err) {
    assert(false, `JS syntax error in ${js}: ${err.message}`);
  }
}

// 6. CSS Stylesheet Integrity
const cssPath = path.join(rootDir, 'assets/css/styles.css');
assert(fs.existsSync(cssPath), 'CSS file exists');
const cssContent = fs.readFileSync(cssPath, 'utf-8');
assert(cssContent.length > 5000, `CSS file has rich content (${cssContent.length} bytes)`);
assert(cssContent.includes('color-scheme'), 'CSS contains color-scheme tokens');

// 7. Visual Assets
assert(fs.existsSync(path.join(rootDir, 'assets/images/me.jpg')), 'Portrait me.jpg exists');
assert(fs.existsSync(path.join(rootDir, 'assets/favicon.svg')), 'Favicon assets/favicon.svg exists');

// 8. Modern Web Standards & Anti-FOUC
assert(htmlContent.includes('<meta name="color-scheme" content="light dark">'), 'Anti-FOUC color-scheme meta tag present');
assert(htmlContent.includes('localStorage.getItem("color-scheme")'), 'Anti-FOUC theme hydration script present in head');

// 9. Accessibility basics
assert(htmlContent.includes('alt="Arafat Zahan'), 'Portrait image has descriptive alt text');
assert(htmlContent.includes('role="banner"'), 'Semantic banner role present');
assert(htmlContent.includes('role="navigation"'), 'Semantic navigation role present');
assert(htmlContent.includes('role="main"') || htmlContent.includes('<main'), 'Main content landmark present');

// 10. Verified facts in content
assert(htmlContent.includes('3M+'), 'Contains 3M+ scale claim');
assert(htmlContent.includes('236'), 'Contains 236 merged PRs claim');
assert(htmlContent.includes('Jasper'), 'Contains Jasper media engine');
assert(htmlContent.includes('Motion Mechanics'), 'Contains Motion Mechanics');
assert(htmlContent.includes('7,000'), 'Contains ~7,000 npm downloads');
assert(htmlContent.includes('kuasha420@gmail.com'), 'Contains email address');
assert(htmlContent.includes('+880 1841 832 034'), 'Contains phone number');

console.log('--- ALL VERIFICATION TESTS PASSED (10/10) ---');
