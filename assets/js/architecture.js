/**
 * Interactive Systems Architecture Engine for kuasha.xyz
 * Provides clickable schematics, live node inspectors, and simulation state.
 */

const ARCHITECTURE_DATA = {
  sitekit: {
    id: "sitekit",
    title: "Google Site Kit @ Mass Scale (3M+ Sites)",
    badge: "236 Merged Upstream PRs",
    summary: "Architecting core infrastructure and enterprise modules for Google's official WordPress plugin across GA4, Reader Revenue Manager, AdSense, and Search Console.",
    metrics: [
      { label: "Active Production Sites", value: "3,000,000+" },
      { label: "Merged Upstream PRs", value: "236" },
      { label: "Approved Google Design Docs", value: "2 (User Input v2, ABR)" },
      { label: "Industry Award", value: "10up Summit Uppie (Iceland)" }
    ],
    nodes: [
      {
        id: "wp-host",
        name: "WordPress Core Runtime",
        role: "Host Environment",
        type: "client",
        status: "3M+ Instances",
        description: "Executes in unconstrained PHP/MySQL environments across shared hosting, enterprise VIP, and cloud VMs with diverse PHP versions and strict performance constraints.",
        tech: ["WordPress 5.2+", "PHP 7.4-8.3", "REST API", "Transient Cache"]
      },
      {
        id: "user-input",
        name: "User Input v2 Engine",
        role: "Design Doc Author",
        type: "engine",
        status: "Google Approved",
        description: "Authored technical design doc approved by Google TL Felix Arntz & Google PM Mariya Moeva. Engineered client-side state caching, asynchronous survey datastores, inline question editing, and personalized Key Metrics dashboard tailoring.",
        tech: ["React 18", "WordPress Data Stores", "State Machine", "Local Storage Fallback"]
      },
      {
        id: "store-factory",
        name: "ETS Store Factory",
        role: "Existing Tags Simplification",
        type: "factory",
        status: "Modular Architecture",
        description: "Engineered `createExistingTagStore` reusable store factory unifying tag detection, permission checking, and validation across GA4, GTM, and AdSense while purging legacy duplicated stores.",
        tech: ["Redux/DataStore Patterns", "Higher-Order Stores", "TypeScript Types", "Jest Test Suites"]
      },
      {
        id: "abr-module",
        name: "Ad Blocking Recovery (ABR)",
        role: "Design Doc Author",
        type: "security",
        status: "Production Revenue",
        description: "Architected end-to-end AdSense recovery tag injection workflows, automated publisher messaging, site eligibility gating, and BackstopJS Visual Regression Testing.",
        tech: ["BackstopJS VRT", "AdSense Integration", "Automated Snippet Injection", "PHPUnit"]
      },
      {
        id: "google-apis",
        name: "Google Cloud Platform Services",
        role: "Upstream Service APIs",
        type: "cloud",
        status: "OAuth2 & Cloud Proxies",
        description: "Federated authentication and telemetry endpoints querying Google Analytics Data API, Search Console, and Reader Revenue Manager with token refresh cycles and exponential backoff.",
        tech: ["Google Cloud API", "OAuth 2.0", "Batch Requests", "Telemetry Pipeline"]
      }
    ],
    simulation: {
      actionLabel: "Simulate Tag Detection Cycle",
      activeText: "Analyzing 3M+ Host Environments & Refreshing ExistingTagStore...",
      resultText: "Tag sync completed: 0 schema drifts, 100% BackstopJS VRT match, 0.4ms datastore resolution."
    }
  },

  jasper: {
    id: "jasper",
    title: "Jasper Media Engine & Hosted SaaS",
    badge: ">90% Throttling Drop",
    summary: "Distributed audio streaming engine and logically multi-tenant SaaS control plane designed for high-concurrency Discord voice channels and real-time scrubbing.",
    metrics: [
      { label: "Throttle Reduction", value: ">90%" },
      { label: "Voice Latency Jitter", value: "<12ms" },
      { label: "SaaS Onboarding DevOps", value: "Zero-Touch" },
      { label: "Database Migrations", value: "Checksum-Tracked" }
    ],
    nodes: [
      {
        id: "gateway-mesh",
        name: "Discord Gateway Intent Router",
        role: "Event Ingress",
        type: "client",
        status: "Zero Loss",
        description: "Isolates gateway intent dispatching from audio worker loops. Prevents voice heartbeat drops during heavy chat event bursts.",
        tech: ["WebSocket Shards", "Intent Masking", "Backpressure Buffer", "Node.js"]
      },
      {
        id: "lease-manager",
        name: "Concurrency Lease Manager",
        role: "State Arbiter",
        type: "engine",
        status: "Per-Guild Locks",
        description: "Manages distributed per-guild voice leases, preventing double-play races, orchestrating graceful worker draining, and maintaining cluster consistency across restarts.",
        tech: ["Redis Leases", "Distributed Semaphores", "Heartbeat Lease TTL", "Safe Drain Contract"]
      },
      {
        id: "stream-daemon",
        name: "Externalized yt-dlp & FFmpeg Daemon",
        role: "Lead Systems Architect",
        type: "factory",
        status: "Isolated Subprocess Pool",
        description: "Decoupled media resolution into a standalone high-performance daemon pool. Pre-extracts PCM audio frames with automated upstream user-agent rotation and rate-limit circuit breaking.",
        tech: ["yt-dlp", "FFmpeg Pipelines", "Unix Sockets / IPC", "PCM Frame Buffering"]
      },
      {
        id: "web-client",
        name: "Next.js Interactive Audio Console",
        role: "Real-Time Control Plane",
        type: "security",
        status: "Synchronized Scrubbing",
        description: "Next.js web application with sub-second synchronized seek bars, track scrubbing, typed Plugin SDK, and community permissions.",
        tech: ["Next.js App Router", "Server Components", "WebSocket Sync", "Tailwind CSS"]
      },
      {
        id: "hosted-saas",
        name: "Hosted Jasper Multi-Tenant SaaS",
        role: "Control Plane",
        type: "cloud",
        status: "Automated Provisioning",
        description: "Allows Discord server communities to provision dedicated high-availability bot instances with zero DevOps configuration, isolated databases, and automated billing.",
        tech: ["PostgreSQL Checksum Migrations", "Docker Orchestration", "Fastify Admin APIs", "Metrics Prometheus"]
      }
    ],
    simulation: {
      actionLabel: "Simulate Upstream Rate-Limit Spike",
      activeText: "Upstream 429 detected! Engaging yt-dlp daemon worker failover and PCM frame cache...",
      resultText: "Failover successful: Audio playback uninterrupted (<4ms glitch), 0 stream drops across voice channels."
    }
  },

  healthcare: {
    id: "healthcare",
    title: "Clinical Platform & Health Tech",
    badge: "100% Paperless Clinic",
    summary: "Built the technical architecture for Motion Mechanics Physiotherapy Hub (Savar) and Sunshine Physio (Next.js 16 + Expo Mobile under Purrfect Software Limited).",
    metrics: [
      { label: "Clinic Team Size", value: "18 Members" },
      { label: "Paperless Operations", value: "100%" },
      { label: "Specialties Covered", value: "Neuro, MSK, Paediatrics" },
      { label: "Mobile Framework", value: "React Native / Expo" }
    ],
    nodes: [
      {
        id: "patient-portal",
        name: "Bilingual Web & Mobile Ingress",
        role: "Client Interface",
        type: "client",
        status: "English & Bengali",
        description: "Cross-platform patient booking and triage workflows with bilingual localization across responsive Next.js web and Expo React Native mobile apps.",
        tech: ["Next.js 16", "React Native / Expo", "i18n Localization", "Storybook"]
      },
      {
        id: "trpc-mesh",
        name: "End-to-End Type-Safe tRPC Mesh",
        role: "API Layer",
        type: "engine",
        status: "Turborepo Monorepo",
        description: "Shared schema and validation pipeline across web and mobile apps, eliminating serialization drift and validating patient triage inputs via Zod contracts.",
        tech: ["tRPC v11", "Zod Schema Validation", "Turborepo", "TanStack Query"]
      },
      {
        id: "auth-secrets",
        name: "Automated GCP Re-Auth & Pawthy CLI",
        role: "Security & Zero Trust",
        type: "security",
        status: "Zero-Trust Secrets",
        description: "Custom GCP service account re-authentication wrappers and automated secrets deployment powered by internal `@psl-oss/pawthy` CLI with transactional outbox.",
        tech: ["GCP Service Accounts", "Pawthy CLI", "Fastify Outbox", "Hexagonal Domain"]
      },
      {
        id: "clinical-db",
        name: "PostgreSQL & Drizzle / Prisma ORM",
        role: "Data Persistence",
        type: "cloud",
        status: "Encrypted Records",
        description: "Audit-logged clinical database storing rehabilitation assessments, session progress, physiotherapy treatment plinth schedules, and financial P&L records.",
        tech: ["PostgreSQL 16", "Drizzle ORM", "Prisma ORM", "ACID Transactions"]
      }
    ],
    simulation: {
      actionLabel: "Simulate End-to-End Triage & Appointment Booking",
      activeText: "Dispatching bilingual appointment booking request across tRPC mesh and PostgreSQL...",
      resultText: "Booking confirmed: Doctor schedule locked, GCP token refreshed, SMS dispatch queue notified."
    }
  },

  hardware: {
    id: "hardware",
    title: "Low-Level Systems & Edge Computing",
    badge: "Kernel / evdev / IoT",
    summary: "From distributed Wayland workspace fabrics and Qualcomm modem baseband audio to toddler input hardware isolation and precision agriculture automation.",
    metrics: [
      { label: "Wayland Mesh Nodes", value: "3 (Desktop/Laptop/Deck)" },
      { label: "Baseband Audio", value: "8kHz PCM PipeWire" },
      { label: "Input Shield Latency", value: "<1ms evdev" },
      { label: "Horizon Project", value: "ChickenTech IoT Edge" }
    ],
    nodes: [
      {
        id: "knot-mesh",
        name: "Knot Mesh Linux Workspace Fabric",
        role: "Multi-Node Wayland Fabric",
        type: "client",
        status: "Arch / KDE Plasma 6",
        description: "Distributed Linux workspace fabric connecting Arch Linux desktop, laptop, and Steam Deck via KRDP virtual monitors, remote PTY execution, and Linda Tuplespace batching.",
        tech: ["Arch Linux", "Wayland / KRDP", "Linda Tuplespace", "systemd daemons"]
      },
      {
        id: "mislty-daemon",
        name: "mislty 4G Modem Voice Daemon",
        role: "Reverse-Engineered Driver",
        type: "factory",
        status: "MDM9600 Baseband",
        description: "Reverse-engineered Linux desktop suite and control daemon for Qualcomm MDM9600 4G LTE modems. Sub-4s mode switching with native PipeWire 8kHz narrowband voice bridging.",
        tech: ["Qualcomm AT Commands", "PipeWire Audio", "C / Python", "Linux Udev Rules"]
      },
      {
        id: "jimha-shield",
        name: "jimha Child Hardware Shield",
        role: "evdev Input Interceptor",
        type: "security",
        status: "Sub-1ms Hardware Filter",
        description: "Linux evdev input interceptor written in Python for child hardware isolation. Captures and absorbs raw `/dev/input` keystrokes to protect host OS while outputting audio/visual feedback.",
        tech: ["Linux evdev", "Python 3", "uinput Drivers", "Audio Synthesis"]
      },
      {
        id: "chickentech",
        name: "ChickenTech IoT Precision Agriculture",
        role: "The Horizon Vision",
        type: "cloud",
        status: "Edge Sensing & Automation",
        description: "Edge IoT sensor fabric for poultry precision agriculture: real-time micro-climate monitoring (temperature, humidity, ammonia), automated ventilation gates, and solar failover telemetry.",
        tech: ["ESP32 / MicroPython", "MQTT Message Bus", "TimescaleDB", "Edge Inference"]
      }
    ],
    simulation: {
      actionLabel: "Simulate evdev Hardware Keystroke Intercept",
      activeText: "Intercepting 120 raw key-down events via jimha evdev filter on /dev/input/event3...",
      resultText: "Interception clean: Host OS protected from arbitrary commands; 0 dropped signals; audio chime triggered."
    }
  }
};

class ArchitectureVisualizer {
  constructor() {
    this.currentSystem = "sitekit";
    this.selectedNodeId = null;
    this.isSimulating = false;
  }

  init() {
    this.tabsContainer = document.getElementById("arch-tabs");
    this.diagramContainer = document.getElementById("arch-diagram");
    this.inspectorContainer = document.getElementById("arch-inspector");
    this.simButton = document.getElementById("arch-sim-btn");
    this.simStatus = document.getElementById("arch-sim-status");

    if (!this.tabsContainer || !this.diagramContainer) return;

    this.bindEvents();
    this.renderSystem("sitekit");
  }

  bindEvents() {
    this.tabsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-system]");
      if (btn) {
        const sys = btn.getAttribute("data-system");
        if (sys && sys !== this.currentSystem) {
          window.soundEngine?.playClick();
          this.renderSystem(sys);
        }
      }
    });

    if (this.simButton) {
      this.simButton.addEventListener("click", () => {
        this.runSimulation();
      });
    }
  }

  renderSystem(systemId) {
    this.currentSystem = systemId;
    const system = ARCHITECTURE_DATA[systemId];
    if (!system) return;

    // Update active tab buttons
    const buttons = this.tabsContainer.querySelectorAll("[data-system]");
    buttons.forEach((btn) => {
      if (btn.getAttribute("data-system") === systemId) {
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      }
    });

    // Default selected node is the 2nd node (usually core engine)
    this.selectedNodeId = system.nodes[1]?.id || system.nodes[0]?.id;

    // Render interactive diagram
    this.renderDiagram(system);

    // Render inspector details
    this.renderInspector(system, this.selectedNodeId);

    // Update Simulation button label
    if (this.simButton && system.simulation) {
      this.simButton.textContent = "⚡ " + system.simulation.actionLabel;
    }
    if (this.simStatus) {
      this.simStatus.textContent = "System state: Nominal • Ready for interactive probe";
      this.simStatus.className = "arch-sim-status";
    }
  }

  renderDiagram(system) {
    let nodesHtml = "";

    system.nodes.forEach((node, index) => {
      const isSelected = node.id === this.selectedNodeId;
      nodesHtml += `
        <div class="arch-node-card ${isSelected ? 'active' : ''}" data-node-id="${node.id}" tabindex="0" role="button" aria-label="Inspect ${node.name}">
          <div class="arch-node-header">
            <span class="arch-node-badge arch-badge-${node.type}">${node.type.toUpperCase()}</span>
            <span class="arch-node-num">0${index + 1}</span>
          </div>
          <h4 class="arch-node-title">${node.name}</h4>
          <p class="arch-node-role">${node.role}</p>
          <div class="arch-node-footer">
            <span class="arch-node-status-dot"></span>
            <span class="arch-node-status-text">${node.status}</span>
          </div>
        </div>
      `;
    });

    this.diagramContainer.innerHTML = `
      <div class="arch-pipeline-meta">
        <div>
          <h3 class="arch-sys-title">${system.title}</h3>
          <p class="arch-sys-summary">${system.summary}</p>
        </div>
        <div class="arch-sys-badge">${system.badge}</div>
      </div>

      <div class="arch-nodes-grid">
        ${nodesHtml}
      </div>

      <div class="arch-metrics-bar">
        ${system.metrics.map(m => `
          <div class="arch-metric-col">
            <div class="arch-metric-val">${m.value}</div>
            <div class="arch-metric-lbl">${m.label}</div>
          </div>
        `).join('')}
      </div>
    `;

    // Bind node clicks
    this.diagramContainer.querySelectorAll(".arch-node-card").forEach(card => {
      card.addEventListener("click", () => {
        const nodeId = card.getAttribute("data-node-id");
        this.selectNode(nodeId);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const nodeId = card.getAttribute("data-node-id");
          this.selectNode(nodeId);
        }
      });
    });
  }

  selectNode(nodeId) {
    if (this.selectedNodeId === nodeId) return;
    window.soundEngine?.playClick();
    this.selectedNodeId = nodeId;

    // Update active classes
    this.diagramContainer.querySelectorAll(".arch-node-card").forEach(card => {
      if (card.getAttribute("data-node-id") === nodeId) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });

    const system = ARCHITECTURE_DATA[this.currentSystem];
    this.renderInspector(system, nodeId);
  }

  renderInspector(system, nodeId) {
    if (!this.inspectorContainer) return;
    const node = system.nodes.find(n => n.id === nodeId) || system.nodes[0];
    if (!node) return;

    this.inspectorContainer.innerHTML = `
      <div class="arch-inspector-card">
        <div class="arch-inspector-top">
          <div>
            <div class="arch-inspector-sub">COMPONENT INSPECTION // ${node.id.toUpperCase()}</div>
            <h4 class="arch-inspector-title">${node.name}</h4>
          </div>
          <span class="arch-badge-${node.type} tag-pill">${node.role}</span>
        </div>

        <p class="arch-inspector-desc">${node.description}</p>

        <div class="arch-inspector-stack-title">Production Technologies & Patterns:</div>
        <div class="arch-inspector-tags">
          ${node.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
  }

  runSimulation() {
    if (this.isSimulating) return;
    const system = ARCHITECTURE_DATA[this.currentSystem];
    if (!system || !system.simulation) return;

    this.isSimulating = true;
    window.soundEngine?.playBeep(520, 0.15, 0.05);

    if (this.simButton) {
      this.simButton.disabled = true;
      this.simButton.classList.add("anim-pulse");
    }

    if (this.simStatus) {
      this.simStatus.textContent = system.simulation.activeText;
      this.simStatus.className = "arch-sim-status is-active";
    }

    // Flash nodes in sequence
    const nodes = this.diagramContainer.querySelectorAll(".arch-node-card");
    nodes.forEach((n, idx) => {
      setTimeout(() => {
        n.classList.add("node-pulsing");
        window.soundEngine?.playBeep(400 + idx * 80, 0.04, 0.02);
      }, idx * 180);

      setTimeout(() => {
        n.classList.remove("node-pulsing");
      }, idx * 180 + 350);
    });

    setTimeout(() => {
      this.isSimulating = false;
      if (this.simButton) {
        this.simButton.disabled = false;
        this.simButton.classList.remove("anim-pulse");
      }
      if (this.simStatus) {
        this.simStatus.textContent = system.simulation.resultText;
        this.simStatus.className = "arch-sim-status is-success";
      }
      window.soundEngine?.playSuccess();
    }, nodes.length * 180 + 400);
  }
}

window.architectureVisualizer = new ArchitectureVisualizer();
