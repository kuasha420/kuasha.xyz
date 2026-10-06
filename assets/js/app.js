/**
 * Core Application Logic for kuasha.xyz
 * Handles theme orchestration, live clock, canvas effects, and component demos.
 */

class App {
  constructor() {
    this.theme = "dark";
    this.audioEnabled = false;
    this.currentResumeTrack = "systems";
  }

  init() {
    this.initTheme();
    this.initClock();
    this.initCanvas();
    this.initScrollProgress();
    this.initNavigation();
    this.initResumeSwitcher();
    this.initPackageDemos();
    this.initGlobalCopyButtons();

    // Initialize sub-modules
    window.architectureVisualizer?.init();
    window.terminalConsole?.init();
    window.commandPalette?.init();
  }

  /* ----------------- THEME ENGINE ----------------- */
  initTheme() {
    const savedTheme = localStorage.getItem("color-scheme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.theme = savedTheme || (prefersDark ? "dark" : "light");

    this.applyTheme(this.theme);

    // Watch system changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("color-scheme")) {
        this.applyTheme(e.matches ? "dark" : "light");
      }
    });

    // Bind toggle buttons
    const toggles = document.querySelectorAll(".theme-toggle-btn");
    toggles.forEach(btn => {
      btn.addEventListener("click", () => this.toggleTheme());
    });
  }

  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.content = theme;
    }

    const icons = document.querySelectorAll(".theme-toggle-icon");
    icons.forEach(i => {
      i.textContent = theme === "dark" ? "🌙" : "☀️";
    });
  }

  toggleTheme() {
    const nextTheme = this.theme === "dark" ? "light" : "dark";
    localStorage.setItem("color-scheme", nextTheme);
    this.applyTheme(nextTheme);
    window.soundEngine?.playClick();
    this.showToast(`Switched to ${nextTheme} theme`);
  }

  /* ----------------- AUDIO TOGGLE ----------------- */
  toggleAudio() {
    const isEnabled = window.soundEngine?.toggle();
    this.audioEnabled = isEnabled;
    const icons = document.querySelectorAll(".audio-toggle-icon");
    icons.forEach(i => {
      i.textContent = isEnabled ? "🔊" : "🔇";
    });
    this.showToast(isEnabled ? "Tactile audio synthesis enabled" : "Audio muted");
  }

  /* ----------------- LIVE CLOCK (UTC+6) ----------------- */
  initClock() {
    const clockEl = document.getElementById("live-time-display");
    if (!clockEl) return;

    const updateTime = () => {
      try {
        const now = new Date();
        const options = {
          timeZone: "Asia/Dhaka",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        };
        const timeStr = new Intl.DateTimeFormat("en-GB", options).format(now);
        clockEl.textContent = `${timeStr} BST (UTC+6)`;
      } catch {
        clockEl.textContent = "UTC+6 (Savar, Dhaka)";
      }
    };

    updateTime();
    setInterval(updateTime, 1000);
  }

  /* ----------------- SCROLL PROGRESS BAR ----------------- */
  initScrollProgress() {
    const bar = document.getElementById("scroll-progress-bar");
    if (!bar) return;

    window.addEventListener("scroll", () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      bar.style.width = scrolled + "%";
    }, { passive: true });
  }

  /* ----------------- NAVIGATION & SMOOTH SCROLL ----------------- */
  initNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href").substring(1);
        if (!targetId) return;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          window.soundEngine?.playClick();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          history.pushState(null, null, `#${targetId}`);
        }
      });
    });

    // Mobile nav menu drawer
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    if (menuBtn && mobileDrawer) {
      menuBtn.addEventListener("click", () => {
        const isOpen = mobileDrawer.classList.toggle("is-open");
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        window.soundEngine?.playClick();
      });

      mobileDrawer.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
          mobileDrawer.classList.remove("is-open");
          menuBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Audio toggle button
    const audioBtn = document.getElementById("audio-toggle-btn");
    if (audioBtn) {
      audioBtn.addEventListener("click", () => this.toggleAudio());
    }
  }

  /* ----------------- RESUME TRACK SWITCHER ----------------- */
  initResumeSwitcher() {
    const RESUME_TRACKS = {
      systems: {
        title: "Principal Systems Architect",
        tagline: "High-scale web platforms, distributed media engines & fault-tolerant cluster architectures.",
        pdfUrl: "assets/pdf/Arafat_Zahan_Systems_Architect_CV.pdf",
        keyFocus: [
          "Google Site Kit technical lead at 10up (3M+ active production websites, 236 merged upstream PRs)",
          "Jasper distributed streaming engine with externalized yt-dlp/FFmpeg daemon (>90% throttle reduction)",
          "Hosted Jasper logically multi-tenant SaaS control plane with per-guild concurrency leases",
          "Knot multi-node Wayland fabric, MDM9600 baseband audio bridge, and Linux evdev input isolation"
        ]
      },
      founding: {
        title: "Founding Engineer / Head of Eng",
        tagline: "Zero-to-one company building, commercial clinic launches & cross-functional leadership.",
        pdfUrl: "assets/pdf/Arafat_Zahan_Founding_Engineer_CV.pdf",
        keyFocus: [
          "Co-founded Motion Mechanics physical rehabilitation clinic: commercial buildout, P&L & 18-person team",
          "Engineered 100% paperless clinical operating platform with Next.js 15, Turborepo, tRPC & PostgreSQL",
          "Architected Sunshine Physio dual-stack web/mobile app (Next.js 16 + Expo) under Purrfect Software",
          "Zero-trust Pawthy developer secrets synchronization CLI with transactional outbox & Discord webhooks"
        ]
      },
      staff: {
        title: "Staff Full-Stack Engineer",
        tagline: "End-to-end type safety, modern React/Next.js architectures, DX leadership & design systems.",
        pdfUrl: "assets/pdf/Arafat_Zahan_Staff_FullStack_CV.pdf",
        keyFocus: [
          "Authored Google-approved technical design documents for User Input v2 and Ad Blocking Recovery",
          "Deep TypeScript training authoring, CSS Modules discipline lead, and 'Mid-Point Review' innovation",
          "Next.js (15/16 App Router, Server Components), Turborepo, Tailwind CSS, Storybook & Vitest",
          "Published open-source React & React Native component packages with ~7,000 monthly downloads"
        ]
      },
      comprehensive: {
        title: "Comprehensive Curriculum Vitae",
        tagline: "Full unabridged career chronicle, technical training, publications, education & awards.",
        pdfUrl: "assets/pdf/Arafat_Zahan_Curriculum_Vitae.pdf",
        keyFocus: [
          "Complete historical documentation spanning 2012 open-source origins through October 2026",
          "10up Summit 'Uppie' Award Winner (Reykjavik, Iceland) for Google Site Kit excellence",
          "Formal training in Red Hat Enterprise Linux (RHCE) & Cisco Network Engineering (CCNA)",
          "Savar Digital Polytechnic CS instructor & Rover Scout civic crisis team leadership"
        ]
      }
    };

    const tabButtons = document.querySelectorAll("[data-resume-track]");
    const trackTitle = document.getElementById("resume-track-title");
    const trackTagline = document.getElementById("resume-track-tagline");
    const trackHighlights = document.getElementById("resume-track-highlights");
    const downloadBtn = document.getElementById("resume-track-download-btn");

    if (!tabButtons.length || !trackTitle) return;

    const renderTrack = (trackKey) => {
      const track = RESUME_TRACKS[trackKey];
      if (!track) return;
      this.currentResumeTrack = trackKey;

      tabButtons.forEach(btn => {
        const isMatch = btn.getAttribute("data-resume-track") === trackKey;
        btn.classList.toggle("active", isMatch);
        btn.setAttribute("aria-selected", isMatch ? "true" : "false");
      });

      trackTitle.textContent = track.title;
      trackTagline.textContent = track.tagline;
      downloadBtn.href = track.pdfUrl;
      downloadBtn.download = track.pdfUrl.split("/").pop();

      if (trackHighlights) {
        trackHighlights.innerHTML = track.keyFocus.map(item => `
          <li class="resume-highlight-item">
            <span class="resume-bullet">⚡</span>
            <span>${item}</span>
          </li>
        `).join("");
      }
    };

    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-resume-track");
        window.soundEngine?.playClick();
        renderTrack(key);
      });
    });

    renderTrack("systems");
  }

  /* ----------------- INTERACTIVE PACKAGE DEMOS ----------------- */
  initPackageDemos() {
    // 1. Toast Demo
    const toastDemoBtn = document.getElementById("demo-trigger-toast");
    if (toastDemoBtn) {
      toastDemoBtn.addEventListener("click", () => {
        window.soundEngine?.playSuccess();
        this.showToast("🔔 [react-native-paper-toast] Message delivered imperative via useToast()!");
      });
    }

    // 2. Alert Demo
    const alertDemoBtn = document.getElementById("demo-trigger-alert");
    if (alertDemoBtn) {
      alertDemoBtn.addEventListener("click", () => {
        window.soundEngine?.playBeep(480, 0.1, 0.04);
        this.showAlertModal({
          title: "Production Confirmation",
          message: "Simulating react-native-paper-alerts cross-platform modal. Deploy zero-downtime worker shard?",
          confirmText: "Deploy Shard",
          cancelText: "Dismiss",
          onConfirm: () => {
            window.soundEngine?.playSuccess();
            this.showToast("✓ Worker shard deployed with 0ms interruption!");
          }
        });
      });
    }
  }

  /* ----------------- GLOBAL TOAST NOTIFICATIONS ----------------- */
  showToast(message, duration = 3200) {
    let container = document.getElementById("global-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "global-toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-pill";
    toast.innerHTML = `<span class="toast-dot"></span><span>${message}</span>`;
    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add("is-visible");
    });

    setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration);
  }

  /* ----------------- MODAL ALERT HELPER ----------------- */
  showAlertModal({ title, message, confirmText = "Confirm", cancelText = "Cancel", onConfirm }) {
    const modal = document.getElementById("global-alert-modal");
    if (!modal) return;

    const titleEl = document.getElementById("alert-modal-title");
    const msgEl = document.getElementById("alert-modal-msg");
    const confirmBtn = document.getElementById("alert-modal-confirm");
    const cancelBtn = document.getElementById("alert-modal-cancel");

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;
    if (confirmBtn) confirmBtn.textContent = confirmText;
    if (cancelBtn) cancelBtn.textContent = cancelText;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    const cleanup = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    };

    confirmBtn.onclick = () => {
      cleanup();
      if (onConfirm) onConfirm();
    };

    cancelBtn.onclick = () => {
      cleanup();
      window.soundEngine?.playClick();
    };

    modal.onclick = (e) => {
      if (e.target === modal) cleanup();
    };
  }

  /* ----------------- GLOBAL COPY BUTTONS ----------------- */
  initGlobalCopyButtons() {
    document.querySelectorAll("[data-copy]").forEach(btn => {
      btn.addEventListener("click", () => {
        const text = btn.getAttribute("data-copy");
        const feedback = btn.getAttribute("data-feedback") || "Copied to clipboard!";
        this.copyToClipboard(text, feedback);
      });
    });
  }

  copyToClipboard(text, feedbackText) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        window.soundEngine?.playSuccess();
        this.showToast(`✓ ${feedbackText}`);
      }).catch(() => {
        this.fallbackCopy(text, feedbackText);
      });
    } else {
      this.fallbackCopy(text, feedbackText);
    }
  }

  fallbackCopy(text, feedbackText) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      window.soundEngine?.playSuccess();
      this.showToast(`✓ ${feedbackText}`);
    } catch {
      this.showToast("Press Ctrl+C to copy");
    }
    document.body.removeChild(textarea);
  }

  /* ----------------- AMBIENT BACKGROUND CANVAS ----------------- */
  initCanvas() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let width, height;
    let particles = [];
    const particleCount = 45;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize, { passive: true });
    resize();

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8
      });
    }

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    let mouse = { x: -1000, y: -1000 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    const animate = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        const isDark = document.documentElement.getAttribute("data-theme") !== "light";
        const dotColor = isDark ? "rgba(56, 189, 248, 0.35)" : "rgba(2, 132, 199, 0.25)";
        const lineColor = isDark ? "rgba(56, 189, 248, 0.08)" : "rgba(2, 132, 199, 0.06)";

        // Update & draw particles
        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();

          // Connect nearby particles
          for (let j = i + 1; j < particleCount; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}

window.app = new App();
document.addEventListener("DOMContentLoaded", () => {
  window.app.init();
});
