/**
 * Command Palette (`Cmd+K` / `Ctrl+K`)
 * Lightning-fast spotlight navigation, keyword search, and system actions.
 */

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function triggerDownload(url) {
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.app?.showToast(`Downloading ${a.download}...`);
}

function inspectSystem(systemId) {
  scrollToSection("architecture");
  if (window.architectureVisualizer) {
    window.architectureVisualizer.renderSystem(systemId);
  }
}

function switchResumeTrack(trackId) {
  scrollToSection("resumes");
  const trackBtn = document.querySelector(`[data-resume-track="${trackId}"]`);
  if (trackBtn) {
    trackBtn.click();
  }
}

const PALETTE_ACTIONS = [
  // Navigation
  { id: "sec-hero", label: "Jump to Overview & Coordinates", category: "Navigation", icon: "⚡", keywords: ["top", "hero", "bio", "intro", "home"], action: () => scrollToSection("hero") },
  { id: "sec-arch", label: "Jump to Systems Architecture Visualizer", category: "Navigation", icon: "🏛️", keywords: ["architecture", "systems", "blueprints", "diagrams", "pipeline"], action: () => scrollToSection("architecture") },
  { id: "sec-cv", label: "Jump to Resume & CV Suite", category: "Navigation", icon: "📑", keywords: ["resume", "cv", "curriculum", "vitae", "pdf", "track"], action: () => scrollToSection("resumes") },
  { id: "sec-oss", label: "Jump to Open Source Packages (~7k/mo)", category: "Navigation", icon: "📦", keywords: ["npm", "github", "packages", "toast", "alerts", "phone"], action: () => scrollToSection("opensource") },
  { id: "sec-journey", label: "Jump to Engineering Journey & Timeline", category: "Navigation", icon: "⏳", keywords: ["timeline", "history", "career", "10up", "uppie", "reykjavik"], action: () => scrollToSection("journey") },
  { id: "sec-skills", label: "Jump to Competencies & Tech Stack", category: "Navigation", icon: "🛠️", keywords: ["stack", "skills", "typescript", "react", "nextjs", "linux", "postgresql"], action: () => scrollToSection("skills") },
  { id: "sec-term", label: "Jump to Interactive System Terminal", category: "Navigation", icon: "💻", keywords: ["terminal", "console", "cli", "shell", "bash"], action: () => scrollToSection("terminal") },
  { id: "sec-contact", label: "Jump to Contact Coordinates", category: "Navigation", icon: "📫", keywords: ["contact", "email", "phone", "whatsapp", "hire"], action: () => scrollToSection("contact") },

  // Systems Architecture Direct Inspection
  { id: "arch-sitekit", label: "Inspect: Google Site Kit @ Scale (3M+ Sites)", category: "Systems", icon: "🌐", keywords: ["sitekit", "google", "wordpress", "10up", "ets", "abr", "uppie"], action: () => inspectSystem("sitekit") },
  { id: "arch-jasper", label: "Inspect: Jasper Media Engine (>90% Throttle Drop)", category: "Systems", icon: "⚡", keywords: ["jasper", "streaming", "audio", "ytdlp", "ffmpeg", "saas", "discord"], action: () => inspectSystem("jasper") },
  { id: "arch-clinic", label: "Inspect: Motion Mechanics & Sunshine Physio", category: "Systems", icon: "🏥", keywords: ["clinic", "motion", "mechanics", "sunshine", "healthcare", "trpc", "paperless"], action: () => inspectSystem("healthcare") },
  { id: "arch-hardware", label: "Inspect: Knot Mesh, Kernel & ChickenTech", category: "Systems", icon: "🛰️", keywords: ["knot", "wayland", "linux", "evdev", "mislty", "chickentech", "iot"], action: () => inspectSystem("hardware") },

  // Resume Tracks
  { id: "track-sys", label: "Select Resume: Principal Systems Architect", category: "Resumes", icon: "🏛️", keywords: ["architect cv", "systems resume", "track"], action: () => switchResumeTrack("systems") },
  { id: "track-found", label: "Select Resume: Founding Engineer / Head of Eng", category: "Resumes", icon: "🚀", keywords: ["founding resume", "head of eng", "startup", "0 to 1"], action: () => switchResumeTrack("founding") },
  { id: "track-staff", label: "Select Resume: Staff Full-Stack Engineer", category: "Resumes", icon: "💻", keywords: ["staff engineer", "full stack resume", "react", "typescript"], action: () => switchResumeTrack("staff") },
  { id: "track-all", label: "Select Resume: Comprehensive Curriculum Vitae", category: "Resumes", icon: "📑", keywords: ["complete cv", "full resume", "curriculum vitae"], action: () => switchResumeTrack("comprehensive") },

  // Downloads
  { id: "pdf-sys", label: "Download: Systems Architect CV (PDF)", category: "Downloads", icon: "📄", keywords: ["download systems", "systems pdf"], action: () => triggerDownload("assets/pdf/Arafat_Zahan_Systems_Architect_CV.pdf") },
  { id: "pdf-found", label: "Download: Founding Engineer CV (PDF)", category: "Downloads", icon: "📄", keywords: ["download founding", "founding pdf"], action: () => triggerDownload("assets/pdf/Arafat_Zahan_Founding_Engineer_CV.pdf") },
  { id: "pdf-staff", label: "Download: Staff Full-Stack CV (PDF)", category: "Downloads", icon: "📄", keywords: ["download staff", "staff pdf"], action: () => triggerDownload("assets/pdf/Arafat_Zahan_Staff_FullStack_CV.pdf") },
  { id: "pdf-cv", label: "Download: Comprehensive Curriculum Vitae (PDF)", category: "Downloads", icon: "📄", keywords: ["download cv", "full pdf", "all"], action: () => triggerDownload("assets/pdf/Arafat_Zahan_Curriculum_Vitae.pdf") },

  // Actions
  { id: "act-email", label: "Copy Email: kuasha420@gmail.com", category: "Action", icon: "📋", keywords: ["email", "copy email", "mail"], action: () => window.app?.copyToClipboard("kuasha420@gmail.com", "Email copied to clipboard!") },
  { id: "act-phone", label: "Copy Phone: +880 1841 832 034", category: "Action", icon: "📱", keywords: ["phone", "whatsapp", "call", "number"], action: () => window.app?.copyToClipboard("+8801841832034", "Phone number copied!") },
  { id: "act-theme", label: "Toggle Dark / Light Theme", category: "Action", icon: "🌓", keywords: ["theme", "dark", "light", "mode", "switch"], action: () => window.app?.toggleTheme() },
  { id: "act-audio", label: "Toggle Tactile Audio Clicks", category: "Action", icon: "🔊", keywords: ["audio", "sound", "clicks", "mute", "unmute"], action: () => window.app?.toggleAudio() },

  // External
  { id: "ext-gh", label: "Open GitHub: github.com/kuasha420", category: "External", icon: "🐙", keywords: ["github", "gh", "git", "repos"], action: () => window.open("https://github.com/kuasha420", "_blank") },
  { id: "ext-li", label: "Open LinkedIn: linkedin.com/in/arafat-zahan-a03502394", category: "External", icon: "💼", keywords: ["linkedin", "profile", "connect"], action: () => window.open("https://www.linkedin.com/in/arafat-zahan-a03502394/", "_blank") },
  { id: "ext-npm", label: "Open npm: npmjs.com/~kuasha420", category: "External", icon: "📦", keywords: ["npm", "registry", "downloads"], action: () => window.open("https://www.npmjs.com/~kuasha420", "_blank") },
  { id: "ext-wa", label: "Open WhatsApp Chat (+880 1841 832 034)", category: "External", icon: "🟢", keywords: ["whatsapp", "chat", "message"], action: () => window.open("https://wa.me/8801841832034", "_blank") }
];

class CommandPalette {
  constructor() {
    this.isOpen = false;
    this.selectedIndex = 0;
    this.filtered = [...PALETTE_ACTIONS];
    this.previouslyFocused = null;
  }

  init() {
    this.modal = document.getElementById("command-palette-modal");
    this.input = document.getElementById("palette-input");
    this.resultsList = document.getElementById("palette-results");
    this.triggerBtn = document.getElementById("palette-trigger-btn");

    if (!this.modal || !this.input || !this.resultsList) return;

    this.bindEvents();
  }

  bindEvents() {
    // Keyboard shortcuts
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.toggle();
      } else if (e.key === "Escape" && this.isOpen) {
        this.close();
      } else if (this.isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          this.moveSelection(1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          this.moveSelection(-1);
        } else if (e.key === "Enter") {
          e.preventDefault();
          this.executeSelected();
        } else if (e.key === "Tab") {
          // Trap focus inside modal
          e.preventDefault();
          this.moveSelection(e.shiftKey ? -1 : 1);
        }
      }
    });

    if (this.triggerBtn) {
      this.triggerBtn.addEventListener("click", () => this.open());
    }

    // Modal background click
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Input filter
    this.input.addEventListener("input", () => {
      this.filter(this.input.value);
    });
  }

  open() {
    this.previouslyFocused = document.activeElement;
    this.isOpen = true;
    this.modal.classList.add("is-open");
    this.modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    this.input.value = "";
    this.filter("");
    setTimeout(() => this.input.focus(), 50);
    window.soundEngine?.playClick();
  }

  close() {
    this.isOpen = false;
    this.modal.classList.remove("is-open");
    this.modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    window.soundEngine?.playClick();
    if (this.previouslyFocused && typeof this.previouslyFocused.focus === "function") {
      this.previouslyFocused.focus();
    }
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  filter(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      this.filtered = [...PALETTE_ACTIONS];
    } else {
      this.filtered = PALETTE_ACTIONS.filter(item =>
        item.label.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.keywords && item.keywords.some(k => k.toLowerCase().includes(q)))
      );
    }
    this.selectedIndex = 0;
    this.render();
  }

  moveSelection(delta) {
    if (this.filtered.length === 0) return;
    this.selectedIndex = (this.selectedIndex + delta + this.filtered.length) % this.filtered.length;
    this.render();
    window.soundEngine?.playBeep(350 + this.selectedIndex * 15, 0.02, 0.015);
  }

  executeSelected() {
    const item = this.filtered[this.selectedIndex];
    if (item) {
      window.soundEngine?.playSuccess();
      this.close();
      item.action();
    }
  }

  render() {
    if (this.filtered.length === 0) {
      this.resultsList.innerHTML = `<li class="palette-empty">No matching commands or destinations found</li>`;
      return;
    }

    this.resultsList.innerHTML = this.filtered.map((item, idx) => {
      const isSel = idx === this.selectedIndex;
      return `
        <li class="palette-item ${isSel ? 'is-selected' : ''}" data-index="${idx}" role="option" aria-selected="${isSel}">
          <div class="palette-item-left">
            <span class="palette-item-icon">${item.icon}</span>
            <span class="palette-item-label">${item.label}</span>
          </div>
          <span class="palette-item-cat">${item.category}</span>
        </li>
      `;
    }).join("");

    // Click on item
    this.resultsList.querySelectorAll(".palette-item").forEach(el => {
      el.addEventListener("click", () => {
        const idx = parseInt(el.getAttribute("data-index"), 10);
        this.selectedIndex = idx;
        this.executeSelected();
      });
    });

    // Ensure selected item is scrolled into view
    const selectedEl = this.resultsList.querySelector(".is-selected");
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }
}

window.commandPalette = new CommandPalette();
