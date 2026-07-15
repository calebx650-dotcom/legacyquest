// Local, privacy-friendly analytics. Everything is stored on-device (no network,
// no third parties). It records enough to power a real product dashboard for THIS
// player: session length, hardest questions, screen visits (to infer most-skipped
// eras and likely quit points), and simple retention. Aggregating across many
// users would require a backend — this is the single-device version of that.

const KEY = 'legacyquest.analytics.v1'
const MAX_SESSIONS = 50

function ymd(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null
  } catch {
    return null
  }
}

const blank = () => ({ sessions: [], answers: {}, views: {}, activeDays: [], quits: {} })

class Analytics {
  constructor() {
    this.data = load() || blank()
    // A "quit point" is where the previous session ended.
    const last = this.data.sessions[this.data.sessions.length - 1]
    if (last && last.lastPath) {
      this.data.quits[last.lastPath] = (this.data.quits[last.lastPath] || 0) + 1
    }
    this.session = { start: Date.now(), end: Date.now(), lastPath: '/' }
    this.data.sessions.push(this.session)
    if (this.data.sessions.length > MAX_SESSIONS) this.data.sessions.shift()
    this._touchDay()
    this._save()
  }

  _save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.data))
    } catch {
      /* ignore */
    }
  }

  _touchDay() {
    const day = ymd()
    if (!this.data.activeDays.includes(day)) this.data.activeDays.push(day)
  }

  track(type, payload = {}) {
    this.session.end = Date.now()
    if (type === 'view' && payload.path) {
      this.data.views[payload.path] = (this.data.views[payload.path] || 0) + 1
      this.session.lastPath = payload.path
    }
    if (type === 'answer' && payload.id) {
      const a = this.data.answers[payload.id] || { right: 0, wrong: 0, label: payload.label }
      if (payload.correct) a.right++
      else a.wrong++
      if (payload.label) a.label = payload.label
      this.data.answers[payload.id] = a
    }
    this._touchDay()
    this._save()
  }

  reset() {
    this.data = blank()
    this.session = { start: Date.now(), end: Date.now(), lastPath: '/' }
    this.data.sessions.push(this.session)
    this._save()
  }

  summary() {
    const d = this.data
    const lengths = d.sessions.map((s) => Math.max(0, s.end - s.start))
    const avg = lengths.length ? lengths.reduce((a, b) => a + b, 0) / lengths.length : 0
    const current = Date.now() - this.session.start

    const hardest = Object.entries(d.answers)
      .map(([id, a]) => ({
        id,
        label: a.label || id,
        right: a.right,
        wrong: a.wrong,
        rate: a.right + a.wrong ? a.wrong / (a.right + a.wrong) : 0,
      }))
      .filter((q) => q.wrong > 0)
      .sort((a, b) => b.wrong - a.wrong || b.rate - a.rate)
      .slice(0, 6)

    const views = Object.entries(d.views)
      .map(([path, n]) => ({ path, n }))
      .sort((a, b) => b.n - a.n)

    const quits = Object.entries(d.quits)
      .map(([path, n]) => ({ path, n }))
      .sort((a, b) => b.n - a.n)
      .slice(0, 5)

    // Retention relative to first active day.
    const days = [...d.activeDays].sort()
    const first = days[0] ? new Date(days[0]) : new Date()
    const dayNums = new Set(
      days.map((s) => Math.round((new Date(s) - first) / 86_400_000)),
    )
    const retention = {
      d1: dayNums.has(1),
      d7: [...dayNums].some((n) => n >= 7),
      d30: [...dayNums].some((n) => n >= 30),
      activeDays: days.length,
    }

    return { avgSessionMs: avg, currentSessionMs: current, sessions: d.sessions.length, hardest, views, quits, retention }
  }
}

export const analytics = new Analytics()

export function formatDuration(ms) {
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  return `${m}m ${s % 60}s`
}
