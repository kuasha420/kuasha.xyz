/**
 * Web Audio API Tactile Sound Synthesizer
 * Zero external audio assets, zero latency, runs entirely client-side.
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false; // Muted by default for polite UX
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  toggle() {
    this.enabled = !this.enabled;
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
    if (!this.enabled || !this.ctx) return;
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
    if (!this.enabled || !this.ctx) return;
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
}

window.soundEngine = new SoundEngine();
