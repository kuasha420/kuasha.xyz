/**
 * Interactive System Console (`kuasha:~$`)
 * Fast, responsive, keyboard-driven terminal with command autocomplete and history.
 */

const TERMINAL_COMMANDS = {
  help: () => `
Available system commands:
  <span class="cmd-hl">whoami</span>        Display operator identity & role overview
  <span class="cmd-hl">sitekit</span>       Google Site Kit at scale (3M+ sites, 236 PRs)
  <span class="cmd-hl">jasper</span>        Jasper distributed streaming engine & Hosted SaaS
  <span class="cmd-hl">clinic</span>        18-person clinic co-founding & 100% paperless platform
  <span class="cmd-hl">knot</span>          Knot mesh, MDM9600 mislty daemon & jimha evdev shield
  <span class="cmd-hl">npm</span>           Published open-source libraries (~7,000 monthly downloads)
  <span class="cmd-hl">skills</span>        Technical competencies & architecture matrix
  <span class="cmd-hl">cv</span>            List all 4 curated resume tracks & direct PDF links
  <span class="cmd-hl">download</span>      Download CV (e.g. 'download systems', 'download all')
  <span class="cmd-hl">contact</span>       Direct email, WhatsApp, GitHub & coordinates
  <span class="cmd-hl">matrix</span>        Systems telemetry dump & kernel diagnostics
  <span class="cmd-hl">clear</span>         Clear terminal display buffer
  <span class="cmd-hl">sudo</span>          Request root privilege
`,

  whoami: () => `
<span class="cmd-success">Arafat Zahan (kuasha420)</span>
Role:       Principal Systems Architect & Founding Engineer
Experience: 6+ years professional software engineering (building software since 2012)
Location:   Savar, Dhaka, Bangladesh (UTC+6)
Highlights:
  • Technical Lead on Google Site Kit via 10up (3M+ production sites, 236 merged PRs)
  • Lead Systems Architect of Jasper Media Platform (>90% audio throttle drop)
  • Co-Founder of Motion Mechanics Physical Clinic & Platform Architect
  • Author of open-source packages downloaded ~7,000 times/month
  • Linux Kernel, Wayland mesh & hardware evdev developer
`,

  sitekit: () => `
<span class="cmd-info">== GOOGLE SITE KIT PARTNERSHIP (10up) ==</span>
Scale:        Active on 3,000,000+ WordPress installations globally
Upstream PRs: 236 merged pull requests in google/site-kit-wp
Key Designs:
  1. User Input v2 (Approved by Google TL Felix Arntz & Google PM Mariya Moeva)
     • Re-engineered user goal survey, client-side store persistence & dynamic dashboards
  2. Ad Blocking Recovery / ABR (Approved by Google PM Mariya Moeva & 10up Leadership)
     • Automated recovery snippet injection, publisher notices, BackstopJS VRT
  3. Existing Tags Simplification (ETS)
     • Decoupled tag detection via reusable \`createExistingTagStore\` store factory
Process:      Pioneered "Mid-Point Review" process adopted across 10up Site Kit team
Honors:       10up Summit "Uppie" Award Winner (Reykjavik, Iceland, May 2023)
`,

  jasper: () => `
<span class="cmd-info">== JASPER MEDIA ENGINE & HOSTED SAAS ==</span>
Architecture: Decoupled distributed audio streaming pipeline & multi-tenant SaaS
Highlights:
  • Externalized yt-dlp & FFmpeg daemon pool: Reduced source throttling by >90%
  • Worker coordination: Bot instances stream across multiple voice channels concurrently
  • Concurrency leases: Distributed per-guild locks, gateway intent isolation, zero-downtime drain
  • Next.js Web Console: Sub-second synchronized seek bars and track scrubbing
  • Hosted Jasper: Multi-tenant SaaS control plane for Discord communities with zero DevOps onboarding
`,

  clinic: () => `
<span class="cmd-info">== CLINICAL OPERATIONS & PLATFORM ARCHITECTURE ==</span>
Motion Mechanics Physiotherapy & Rehabilitation Hub (Savar, Dhaka):
  • Co-founded physical outpatient facility on CRP Road across 3 clinical specialties
  • Co-directed commercial lease, equipment procurement (traction, plinths), and 18-person team
  • Built proprietary 100% paperless platform: Next.js 15, Turborepo, tRPC, Prisma, PostgreSQL
Sunshine Physio (Sep 2026 – Present):
  • Lead Frontend Engineer across Next.js 16 Web and React Native / Expo mobile
  • Bilingual localization (Bengali & English), Vitest test suites, Storybook, Drizzle ORM
`,

  knot: () => `
<span class="cmd-info">== HARDWARE, LINUX & EDGE SYSTEMS ==</span>
Knot Mesh:
  • Multi-node Linux/Wayland workspace fabric connecting Arch Linux desktop, laptop, and Steam Deck
  • KRDP virtual monitors, remote PTY execution, and Linda Tuplespace batching
mislty:
  • Reverse-engineered Linux daemon for Qualcomm MDM9600 4G LTE modems
  • Native PipeWire 8kHz narrowband voice bridging to baseband hardware
jimha:
  • Toddler-safe Linux evdev input interceptor in Python (kuasha420/jimha)
  • Intercepts raw /dev/input events to protect host OS with zero user-space latency
ChickenTech (Horizon):
  • Edge IoT sensor fabric for poultry precision agriculture and micro-climate control
`,

  npm: () => `
<span class="cmd-info">== PUBLISHED OPEN-SOURCE PACKAGES (~7,000/mo) ==</span>
  1. react-native-paper-phone-number-input   ~4,100 / month
     • International phone input with modal & flag picker for React Native Paper
  2. react-native-paper-toast               ~2,140 / month
     • Imperative toast notifications and custom hook provider
  3. react-native-paper-alerts              ~520 / month
     • Cross-platform imperative alert and confirm modal dialogs
  4. mst-persistent-store                   ~240 / month
     • Persistent MobX-State-Tree store provider and custom React hooks
  5. antigravity-manager-bin                Arch Linux AUR package maintainer
  6. jimha                                  Linux evdev child hardware isolation
`,

  skills: () => `
<span class="cmd-info">== TECHNICAL COMPETENCIES MATRIX ==</span>
Languages:     TypeScript, JavaScript (ESNext/Node.js), Python, PHP, Shell/Bash, SQL
Frontend:      React 18/19, Next.js 15/16 App Router, Turborepo, Tailwind CSS, Storybook
Mobile:        React Native, Expo, React Native Paper, Native Android Bridges
Distributed:   Node.js (Fastify/Express), Hexagonal Architecture, Concurrency Leases, Sharding
Persistence:   PostgreSQL, MySQL, Prisma ORM, Drizzle ORM, Redis Leases, Checksum Migrations
Quality & QA:  Jest, Vitest, React Testing Library, Playwright, BackstopJS VRT, PHPUnit
Systems:       Arch Linux, systemd daemons, PipeWire, Docker, GCP Service Accounts, GitHub Actions
`,

  cv: () => `
<span class="cmd-info">== RESUME & CV TRACKS (PDF ARTIFACTS) ==</span>
1. Systems Architect CV   -> assets/pdf/Arafat_Zahan_Systems_Architect_CV.pdf
2. Founding Engineer CV    -> assets/pdf/Arafat_Zahan_Founding_Engineer_CV.pdf
3. Staff Full-Stack CV     -> assets/pdf/Arafat_Zahan_Staff_FullStack_CV.pdf
4. Comprehensive CV        -> assets/pdf/Arafat_Zahan_Curriculum_Vitae.pdf

Type <span class="cmd-hl">download systems</span> or <span class="cmd-hl">download all</span> to trigger instant PDF retrieval.
`,

  download: (args) => {
    const target = (args[0] || "cv").toLowerCase();
    let file = "assets/pdf/Arafat_Zahan_Curriculum_Vitae.pdf";
    let name = "Curriculum Vitae";

    if (target.includes("system") || target.includes("architect")) {
      file = "assets/pdf/Arafat_Zahan_Systems_Architect_CV.pdf";
      name = "Systems Architect CV";
    } else if (target.includes("founding") || target.includes("lead")) {
      file = "assets/pdf/Arafat_Zahan_Founding_Engineer_CV.pdf";
      name = "Founding Engineer CV";
    } else if (target.includes("staff") || target.includes("stack")) {
      file = "assets/pdf/Arafat_Zahan_Staff_FullStack_CV.pdf";
      name = "Staff Full-Stack CV";
    }

    const a = document.createElement("a");
    a.href = file;
    a.download = file.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    return `<span class="cmd-success">✓ Initiated download for ${name} (${file})</span>`;
  },

  contact: () => `
<span class="cmd-info">== CONTACT COORDINATES ==</span>
Email:     kuasha420@gmail.com
WhatsApp:  +880 1841 832 034
GitHub:    https://github.com/kuasha420
LinkedIn:  https://www.linkedin.com/in/arafat-zahan-a03502394/
npm:       https://www.npmjs.com/~kuasha420
Location:  Savar, Dhaka, Bangladesh (UTC+6)
`,

  matrix: () => `
<span class="cmd-success">SYSTEMS TELEMETRY // KUASHA.XYZ CORE</span>
UPSTREAM:   google/site-kit-wp (236 PRs merged, 3M+ active production deployments)
DAEMON:     Jasper media worker pool (yt-dlp + FFmpeg, >90% throttle reduction)
HEALTHCARE: Motion Mechanics & Sunshine Physio (18-person team, 100% paperless)
PACKAGES:   ~7,000 monthly npm downloads across 4 open-source libraries
KERNEL:     Linux x86_64 / Arch Linux / PipeWire 8kHz PCM / evdev isolation
STATUS:     ALL SUBSYSTEMS NOMINAL • READY FOR FOUNDING & PRINCIPAL CHALLENGES
`,

  sudo: () => `
[sudo] password for visitor: *********
<span class="cmd-success">✓ Access Granted.</span> Operator kuasha is currently logged into terminal.
"Always architect for failure modes before celebrating happy paths."
`,

  clear: () => "CLEAR"
};

class TerminalConsole {
  constructor() {
    this.history = [];
    this.historyIndex = -1;
  }

  init() {
    this.container = document.getElementById("terminal-output");
    this.input = document.getElementById("terminal-input");
    this.form = document.getElementById("terminal-form");
    this.chips = document.querySelectorAll(".terminal-chip");

    if (!this.input || !this.container) return;

    this.bindEvents();
    this.printInitialBanner();
  }

  printInitialBanner() {
    this.container.innerHTML = `
      <div class="terminal-line"><span class="cmd-dim">kuasha.xyz [System Terminal v4.2.0-lts]</span></div>
      <div class="terminal-line"><span class="cmd-dim">Arch Linux x86_64 • Connected to Arafat Zahan's engineering core</span></div>
      <div class="terminal-line">Type <span class="cmd-hl">help</span> to explore systems, architectures, and artifacts.</div>
    `;
  }

  bindEvents() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleCommand(this.input.value.trim());
      });
    }

    this.input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex] || "";
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex] || "";
        } else if (this.historyIndex === 0) {
          this.historyIndex = -1;
          this.input.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.autocomplete();
      }
    });

    this.chips.forEach(chip => {
      chip.addEventListener("click", () => {
        const cmd = chip.getAttribute("data-cmd");
        if (cmd) {
          window.soundEngine?.playClick();
          this.input.value = cmd;
          this.handleCommand(cmd);
        }
      });
    });
  }

  autocomplete() {
    const val = this.input.value.toLowerCase().trim();
    if (!val) return;
    const matches = Object.keys(TERMINAL_COMMANDS).filter(c => c.startsWith(val));
    if (matches.length === 1) {
      this.input.value = matches[0];
    }
  }

  handleCommand(cmdStr) {
    if (!cmdStr) return;

    window.soundEngine?.playClick();
    this.history.push(cmdStr);
    this.historyIndex = -1;

    const parts = cmdStr.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Echo input
    const lineEcho = document.createElement("div");
    lineEcho.className = "terminal-line terminal-echo";
    lineEcho.innerHTML = `<span class="term-prompt">kuasha:~$</span> <span class="term-cmd-text">${this.escapeHtml(cmdStr)}</span>`;
    this.container.appendChild(lineEcho);

    // Execute
    if (cmd === "clear") {
      this.container.innerHTML = "";
      this.input.value = "";
      return;
    }

    const handler = TERMINAL_COMMANDS[cmd];
    let outputHtml = "";

    if (handler) {
      outputHtml = handler(args);
    } else {
      outputHtml = `<span class="cmd-error">command not found: ${this.escapeHtml(cmd)}. Type <span class="cmd-hl">help</span> for valid commands.</span>`;
    }

    const outputElem = document.createElement("div");
    outputElem.className = "terminal-output-block";
    outputElem.innerHTML = outputHtml.trim();
    this.container.appendChild(outputElem);

    this.input.value = "";

    // Auto scroll to bottom
    const parent = this.container.closest(".terminal-body") || this.container;
    parent.scrollTop = parent.scrollHeight;
  }

  escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

window.terminalConsole = new TerminalConsole();
