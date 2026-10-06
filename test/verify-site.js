/**
 * Deep Automated Verification Suite for kuasha.xyz
 * Asserts file integrity, syntax validity, asset references, terminal commands,
 * command palette keywords, social meta absolutes, and accessibility contracts.
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

// 2. Critical sections & landmarks
const requiredSections = [
  '#hero',
  '#architecture',
  '#resumes',
  '#opensource',
  '#journey',
  '#chickentech',
  '#skills',
  '#terminal',
  '#contact'
];
for (const sec of requiredSections) {
  const id = sec.substring(1);
  assert(htmlContent.includes(`id="${id}"`), `Section with id="${id}" exists in HTML`);
}

// 3. Accessibility skip-link
assert(htmlContent.includes('class="skip-link"'), 'Accessibility skip-link exists');
assert(htmlContent.includes('href="#hero"'), 'Skip-link targets main content landmark');

// 4. CNAME verification
const cnamePath = path.join(rootDir, 'CNAME');
assert(fs.existsSync(cnamePath), 'CNAME file exists');
const cnameContent = fs.readFileSync(cnamePath, 'utf-8').trim();
assert(cnameContent === 'kuasha.xyz', `CNAME contains "kuasha.xyz" (found: "${cnameContent}")`);

// 5. PDF Resumes verification
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
  assert(stats.size > 100000, `PDF ${pdf} is full production size (${stats.size} bytes)`);
}

// 6. JavaScript Syntax & Module Verification
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
  try {
    execSync(`node --check "${jsPath}"`);
    console.log(`✓ Syntax valid for ${js}`);
  } catch (err) {
    assert(false, `JS syntax error in ${js}: ${err.message}`);
  }
}

// 7. CSS Stylesheet Integrity & Theme Token Safety
const cssPath = path.join(rootDir, 'assets/css/styles.css');
assert(fs.existsSync(cssPath), 'CSS file exists');
const cssContent = fs.readFileSync(cssPath, 'utf-8');
assert(cssContent.length > 5000, `CSS file has rich content (${cssContent.length} bytes)`);
assert(cssContent.includes('[data-theme="light"]'), 'CSS defines explicit [data-theme="light"] block');
assert(cssContent.includes('[data-theme="dark"]'), 'CSS defines explicit [data-theme="dark"] block');
assert(!cssContent.includes('@supports (color: light-dark(#000, #fff)) {\n  :root {\n    --text-primary: light-dark'), 'CSS does NOT contain broken unscoped light-dark text override');
assert(cssContent.includes('.skip-link'), 'CSS styles skip-link for keyboard accessibility');
assert(cssContent.includes('.arch-pipeline-strip'), 'CSS styles architecture pipeline flow strip');

// 8. Visual Assets & Canonical Social Media Meta
assert(fs.existsSync(path.join(rootDir, 'assets/images/me.jpg')), 'Portrait me.jpg exists');
assert(fs.existsSync(path.join(rootDir, 'assets/favicon.svg')), 'Favicon assets/favicon.svg exists');
assert(htmlContent.includes('<meta property="og:image" content="https://kuasha.xyz/assets/images/me.jpg">'), 'OpenGraph og:image uses absolute canonical URL for scraper unfurling');
assert(htmlContent.includes('<meta name="twitter:image" content="https://kuasha.xyz/assets/images/me.jpg">'), 'Twitter image uses absolute canonical URL');

// 9. Anti-FOUC Hydration Script Integrity
assert(htmlContent.includes('localStorage.getItem("color-scheme") || localStorage.getItem("theme")'), 'Anti-FOUC theme hydration script checks both storage keys');
assert(htmlContent.includes('(prefers-color-scheme: dark)'), 'Anti-FOUC script handles system preference');

// 10. Accessibility Landmarks & Alt text
assert(htmlContent.includes('alt="Arafat Zahan'), 'Portrait image has descriptive alt text');
assert(htmlContent.includes('role="banner"'), 'Semantic banner role present');
assert(htmlContent.includes('role="navigation"'), 'Semantic navigation role present');
assert(htmlContent.includes('role="main"') || htmlContent.includes('<main'), 'Main content landmark present');
assert(htmlContent.includes('role="contentinfo"'), 'Footer landmark present');

// 11. Verified Facts & Narrative Coverage
assert(htmlContent.includes('3M+'), 'Contains 3M+ scale claim');
assert(htmlContent.includes('236'), 'Contains 236 merged PRs claim');
assert(htmlContent.includes('Jasper'), 'Contains Jasper media engine');
assert(htmlContent.includes('Motion Mechanics'), 'Contains Motion Mechanics');
assert(htmlContent.includes('7,000'), 'Contains ~7,000 npm downloads');
assert(htmlContent.includes('ChickenTech'), 'Contains ChickenTech precision agriculture horizon');
assert(htmlContent.includes('kuasha420@gmail.com'), 'Contains email address');
assert(htmlContent.includes('+880 1841 832 034'), 'Contains phone number');
assert(htmlContent.includes('10up Summit "Uppie" Award'), 'Contains 10up Uppie award');

// 12. Programmatic Execution of Terminal Commands
const terminalCode = fs.readFileSync(path.join(rootDir, 'assets/js/terminal.js'), 'utf-8');
const terminalMatch = terminalCode.match(/const TERMINAL_COMMANDS = ({[\s\S]*?\n};)/);
assert(Boolean(terminalMatch), 'TERMINAL_COMMANDS dictionary extractable for programmatic test');

const mockCommands = eval(`(${terminalMatch[1].replace(/;\s*$/, '')})`);
const testCommands = ['help', 'whoami', 'ls', 'pwd', 'uname', 'date', 'sitekit', 'jasper', 'clinic', 'knot', 'chickentech', 'npm', 'skills', 'cv', 'contact', 'matrix'];

for (const cmd of testCommands) {
  assert(typeof mockCommands[cmd] === 'function', `Terminal command '${cmd}' is defined`);
  const output = mockCommands[cmd]([]);
  assert(typeof output === 'string' && output.length > 0, `Terminal command '${cmd}' returns non-empty output`);
}
console.log(`✓ Verified ${testCommands.length} terminal CLI commands execute without error`);

// 13. Programmatic Search Test of Command Palette Keywords
const paletteCode = fs.readFileSync(path.join(rootDir, 'assets/js/command-palette.js'), 'utf-8');
const paletteMatch = paletteCode.match(/const PALETTE_ACTIONS = (\[[\s\S]*?\n\]);/);
assert(Boolean(paletteMatch), 'PALETTE_ACTIONS array extractable for programmatic test');

const mockPalette = eval(`(${paletteMatch[1]})`);
const testQueries = ['jasper', 'sitekit', 'clinic', 'chickentech', 'whatsapp', 'resume', 'email', 'theme'];

for (const q of testQueries) {
  const matches = mockPalette.filter(item =>
    item.label.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    (item.keywords && item.keywords.some(k => k.toLowerCase().includes(q)))
  );
  assert(matches.length > 0, `Command palette keyword search for '${q}' returns at least 1 result (found: ${matches.length})`);
}
console.log(`✓ Verified ${testQueries.length} command palette keyword queries return matching actions`);

console.log('--- ALL VERIFICATION TESTS PASSED (13/13) ---');
