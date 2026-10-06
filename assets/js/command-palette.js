/**
 * Command Palette (`Cmd+K` / `Ctrl+K`)
 * Lightning-fast spotlight navigation and system actions.
 */

const PALETTE_ACTIONS = [
  { id: "sec-hero", label: "Jump to Overview & Coordinates", category: "Navigation", icon: "⚡", action: () => scrollToSection("hero") },
  { id: "sec-arch", label: "Jump to Systems Architecture Visualizer", category: "Navigation", icon: "🏛️", action: () => scrollToSection("architecture") },
  { id: "sec-cv", label: "Jump to Resume & CV Suite", category: "Navigation", icon: "📑", action: () => scrollToSection("resumes") },
  { id: "sec-oss", label: "Jump to Open Source Packages (~7k/mo)", category: "Navigation", icon: "📦", action: () => scrollToSection("opensource") },
  { id: "sec-journey", label: "Jump to Engineering Journey & Timeline", category: "Navigation", icon: "⏳", action: () => scrollToSection("journey") },
  { id: "sec-skills", label: "Jump to Competencies & Tech Stack", category: "Navigation", icon: "🛠️", action: () => scrollToSection("skills") },
  { id: "sec-term", label: "Jump to Interactive System Terminal", category: "Navigation", icon: "💻", action: () => scrollToSection("terminal") },
  { id: "sec-contact", label: "Jump to Contact Coordinates", category: "Navigation", icon: "📫", action: () => scrollToSection("contact") },

  { id: "pdf-sys", label: "Download: Systems Architect CV (PDF)", category: "Downloads", icon: "📄", action: () => triggerDownload("assets/pdf/Arafat_Zahan_Systems_Architect_CV.pdf") },
  { id: "pdf-found", label: "Download: Founding Engineer CV (PDF)", category: "Downloads", icon: "📄", action: () => triggerDownload("assets/pdf/Arafat_Zahan_Founding_Engineer_CV.pdf") },
  { id: "pdf-staff", label: "Download: Staff Full-Stack CV (PDF)", category: "Downloads", icon: "📄", action: () => triggerDownload("assets/pdf/Arafat_Zahan_Staff_FullStack_CV.pdf") },
  { id: "pdf-cv", label: "Download: Comprehensive Curriculum Vitae (PDF)", category: "Downloads", icon: "📄", action: () => triggerDownload("assets/pdf/Arafat_Zahan_Curriculum_Vitae.pdf") },

  { id: "act-email", label: "Copy Email: kuasha420@gmail.com", category: "Action", icon: "📋", action: () => window.app?.copyToClipboard("kuasha420@gmail.com", "Email copied to clipboard!") },
  { id: "act-theme", label: "Toggle Dark / Light Theme", category: "Action", icon: "🌓", action: () => window.app?.toggleTheme() },
  { id: "act-audio", label: "Toggle Tactile Audio Clicks", category: "Action", icon: "🔊", action: () => window.app?.toggleAudio() },

  { id: "ext-gh", label: "Open GitHub: github.com/kuasha420", category: "External", icon: "🐙", action: () => window.open("https://github.com/kuasha420", "_blank") },
  { id: "ext-li", label: "Open LinkedIn: linkedin.com/in/arafat-zahan-a03502394", category: "External", icon: "💼", action: () => window.open("https://www.linkedin.com/in/arafat-zahan-a03502394/", "_blank") },
  { id: "ext-npm", label: "Open npm: npmjs.com/~kuasha420", category: "External", icon: "📦", action: () => window.open("https://www.npmjs.com/~kuasha420", "_blank") }
];

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

class CommandPalette {
  constructor() {
    this.isOpen = false;
    this.selectedIndex = 0;
    this.filtered = [...PALETTE_ACTIONS];
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
    this.isOpen = true;
    this.modal.classList.add("is-open");
    this.modal.setAttribute("aria-hidden", "false");
    this.input.value = "";
    this.filter("");
    setTimeout(() => this.input.focus(), 50);
    window.soundEngine?.playClick();
  }

  close() {
    this.isOpen = false;
    this.modal.classList.remove("is-open");
    this.modal.setAttribute("aria-hidden", "true");
    window.soundEngine?.playClick();
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
        item.category.toLowerCase().includes(q)
      );
    }
    this.selectedIndex = 0;
    this.render();
  }

  moveSelection(delta) {
    if (this.filtered.length === 0) return;
    this.selectedIndex = (this.selectedIndex + delta + this.filtered.length) % this.filtered.length;
    this.render();
    window.soundEngine?.playBeep(350 + this.selectedIndex * 20, 0.02, 0.015);
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
