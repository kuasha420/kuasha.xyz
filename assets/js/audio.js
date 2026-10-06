/**
 * Web Audio API Tactile Sound Synthesizer
 * Zero external audio assets, zero latency, runs entirely client-side.
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    let saved = null;
    try {
      saved = localStorage.getItem("audio-enabled");
    } catch {}
    this.enabled = saved === "true"; // Defaults false unless user enabled
    if (this.enabled) {
      this.attachUnlockListener();
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  attachUnlockListener() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
  }

  toggle() {
    this.enabled = !this.enabled;
    try {
      localStorage.setItem("audio-enabled", String(this.enabled));
    } catch {}

    if (this.enabled) {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.playBeep(880, 0.05, 0.04);
    }
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // AudioContext policy safe fallback
    }
  }

  playBeep(freq = 440, duration = 0.08, vol = 0.03) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // AudioContext policy safe fallback
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    this.playBeep(523.25, 0.06, 0.03);
    setTimeout(() => this.playBeep(659.25, 0.08, 0.03), 50);
    setTimeout(() => this.playBeep(783.99, 0.12, 0.04), 100);
  }

  playError() {
    if (!this.enabled) return;
    this.playBeep(260, 0.08, 0.04);
    setTimeout(() => this.playBeep(220, 0.12, 0.04), 70);
  }
}

window.soundEngine = new SoundEngine();
