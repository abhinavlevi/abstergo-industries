// Web Audio API Synthesizer - 0 external audio dependencies

class SoundFX {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazily init AudioContext upon user gesture
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Tactile button click
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // AudioContext unavailable or error
    }
  }

  // 3D Card flip mechanical swoosh
  public playFlip() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Noise buffer for swoosh
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.06);
      filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.12);
      filter.Q.value = 3.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.12);
    } catch {
      // Ignore
    }
  }

  // Card scan or verification tone
  public playScan() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [880, 1320, 1760].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.06, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.09);
      });
    } catch {
      // Ignore
    }
  }

  // Export / Print high-res badge chime
  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Abstergo chord: F#4, A#4, C#5, F5
      const notes = [587.33, 739.99, 880.00, 1174.66];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0.07, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + 0.55);
      });
    } catch {
      // Ignore
    }
  }

  // Preset swap / reset tone
  public playChirp() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundFX();
