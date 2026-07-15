// LegacyQuest audio engine.
//
// All sound is generated at runtime with the Web Audio API — no audio files are
// bundled, so everything here is original and royalty-free. It provides:
//   • short SFX (unlock, solve, level-up, click, wrong)
//   • gentle generative "themes" whose mood shifts by era
//   • ambient museum pad
//
// A single AudioContext is created lazily on the first user gesture (browsers
// require this), and music/SFX have independent gains so either can be muted.

const SCALES = {
  // Pentatonic-based moods keep generative melodies pleasant in any order.
  spiritual: [0, 3, 5, 7, 10], // minor pentatonic — soulful, hymn-like
  ragtime: [0, 2, 4, 7, 9], // major pentatonic — bright, jaunty
  jazz: [0, 3, 5, 6, 7, 10], // blues scale — smoky
  soul: [0, 2, 3, 7, 9], // warm
  future: [0, 2, 4, 6, 8, 10], // whole-tone — dreamy, cosmic
  museum: [0, 4, 7, 11], // spacious major 7th — ambient
}

// Map an era id to a musical mood.
const ERA_MOOD = {
  'ancient-africa': 'spiritual',
  'slave-trade': 'spiritual',
  reconstruction: 'spiritual',
  'black-wall-street': 'ragtime',
  'harlem-renaissance': 'jazz',
  'great-migration': 'jazz',
  wwii: 'ragtime',
  'civil-rights': 'soul',
  'space-age': 'soul',
  'modern-innovators': 'future',
  afrofuturism: 'future',
}

const midiToFreq = (n) => 440 * Math.pow(2, (n - 69) / 12)

class AudioEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.musicGain = null
    this.sfxGain = null
    this.musicOn = false
    this.sfxOn = true
    this.mood = 'museum'
    this._timer = null
    this._step = 0
  }

  // Must be called from a user gesture the first time.
  _ensure() {
    if (this.ctx) return true
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return false
    this.ctx = new AC()
    this.master = this.ctx.createGain()
    this.master.gain.value = 0.9
    this.master.connect(this.ctx.destination)
    this.musicGain = this.ctx.createGain()
    this.musicGain.gain.value = 0.0
    this.musicGain.connect(this.master)
    this.sfxGain = this.ctx.createGain()
    this.sfxGain.gain.value = 0.5
    this.sfxGain.connect(this.master)
    return true
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume()
  }

  setSfxEnabled(on) {
    this.sfxOn = on
  }

  setMusicEnabled(on) {
    this.musicOn = on
    if (on) {
      if (!this._ensure()) return
      this.resume()
      this.musicGain.gain.setTargetAtTime(0.16, this.ctx.currentTime, 0.5)
      this._startLoop()
    } else if (this.ctx) {
      this.musicGain.gain.setTargetAtTime(0.0, this.ctx.currentTime, 0.3)
      this._stopLoop()
    }
  }

  setEraMood(eraId) {
    this.mood = ERA_MOOD[eraId] || 'soul'
  }

  // ---- Generative music loop ----
  _startLoop() {
    if (this._timer) return
    const tick = () => {
      this._playStep()
      this._timer = setTimeout(tick, 480) // ~125 bpm eighth-ish
    }
    tick()
  }

  _stopLoop() {
    if (this._timer) clearTimeout(this._timer)
    this._timer = null
  }

  _playStep() {
    if (!this.ctx || !this.musicOn) return
    const scale = SCALES[this.mood] || SCALES.museum
    const root = 57 // A3
    const t = this.ctx.currentTime
    this._step++

    // Melody note (skip some steps for rhythmic space).
    if (this._step % 2 === 0 || Math.random() > 0.4) {
      const degree = scale[Math.floor(Math.random() * scale.length)]
      const octave = Math.random() > 0.7 ? 12 : 0
      this._voice(midiToFreq(root + degree + octave), t, 0.42, 'triangle', 0.5)
    }
    // Soft bass every 4 steps.
    if (this._step % 4 === 0) {
      this._voice(midiToFreq(root - 12), t, 0.9, 'sine', 0.6)
    }
  }

  _voice(freq, when, dur, type = 'sine', gain = 1) {
    const o = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    o.type = type
    o.frequency.value = freq
    g.gain.setValueAtTime(0, when)
    g.gain.linearRampToValueAtTime(gain, when + 0.02)
    g.gain.exponentialRampToValueAtTime(0.001, when + dur)
    o.connect(g)
    g.connect(this.musicGain)
    o.start(when)
    o.stop(when + dur + 0.05)
  }

  // ---- SFX ----
  play(name) {
    if (!this.sfxOn) return
    if (!this._ensure()) return
    this.resume()
    const t = this.ctx.currentTime
    switch (name) {
      case 'unlock':
        this._blip(523.25, t, 0.12, 'sine')
        this._blip(659.25, t + 0.09, 0.12, 'sine')
        this._blip(783.99, t + 0.18, 0.22, 'sine')
        break
      case 'solve':
        this._blip(659.25, t, 0.1, 'triangle')
        this._blip(987.77, t + 0.08, 0.18, 'triangle')
        break
      case 'levelup':
        this._blip(523.25, t, 0.12, 'sawtooth', 0.3)
        this._blip(659.25, t + 0.1, 0.12, 'sawtooth', 0.3)
        this._blip(783.99, t + 0.2, 0.12, 'sawtooth', 0.3)
        this._blip(1046.5, t + 0.3, 0.35, 'sawtooth', 0.3)
        break
      case 'wrong':
        this._blip(196.0, t, 0.22, 'sawtooth', 0.25)
        break
      case 'click':
      default:
        this._blip(880, t, 0.05, 'sine', 0.25)
        break
    }
  }

  _blip(freq, when, dur, type, gain = 0.4) {
    const o = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    o.type = type
    o.frequency.setValueAtTime(freq, when)
    g.gain.setValueAtTime(0, when)
    g.gain.linearRampToValueAtTime(gain, when + 0.01)
    g.gain.exponentialRampToValueAtTime(0.001, when + dur)
    o.connect(g)
    g.connect(this.sfxGain)
    o.start(when)
    o.stop(when + dur + 0.02)
  }
}

// Singleton shared across the app.
export const audio = new AudioEngine()
