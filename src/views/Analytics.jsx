import { useMemo, useState } from 'react'
import { PageHeader, Pill } from '../components/ui.jsx'
import { analytics, formatDuration } from '../game/analytics.js'

const PATH_LABELS = {
  '/': 'Keeper’s Hall',
  '/daily': 'Daily Legacy',
  '/quests': 'Quests',
  '/eras': 'Eras',
  '/mysteries': 'History Mysteries',
  '/puzzles': 'Puzzle Lab',
  '/mentors': 'Mentors',
  '/community': 'Community Builder',
  '/culture': 'Culture Journey',
  '/museum': 'Legacy Museum',
  '/stories': 'Narrated Stories',
  '/events': 'Events',
  '/progress': 'Progression',
  '/leaderboards': 'Leaderboards',
  '/teacher': 'Teacher Mode',
  '/account': 'Account',
  '/studio': 'Content Studio',
  '/analytics': 'Analytics',
}
const label = (p) => PATH_LABELS[p] || p

export default function Analytics() {
  const [tick, setTick] = useState(0)
  const s = useMemo(() => analytics.summary(), [tick])

  const mostVisited = s.views.slice(0, 5)
  const leastVisited = [...s.views].reverse().slice(0, 5)

  return (
    <div className="view">
      <PageHeader
        icon="📊"
        title="Analytics"
        subtitle="Product metrics for this device — session length, hardest questions, where attention goes, and retention."
      />
      <p className="demo-note">
        On-device analytics (nothing leaves your browser). Aggregating across many users would use a
        backend; this is the single-player view of that same dashboard.
      </p>

      <div className="grid grid-progress">
        <div className="stat-tile">
          <span className="stat-num">{formatDuration(s.currentSessionMs)}</span>
          <span className="stat-label">This session</span>
        </div>
        <div className="stat-tile">
          <span className="stat-num">{formatDuration(s.avgSessionMs)}</span>
          <span className="stat-label">Avg session</span>
        </div>
        <div className="stat-tile">
          <span className="stat-num">{s.sessions}</span>
          <span className="stat-label">Sessions</span>
        </div>
        <div className="stat-tile">
          <span className="stat-num">{s.retention.activeDays}</span>
          <span className="stat-label">Active days</span>
        </div>
      </div>

      <h3 className="section-label">Retention</h3>
      <div className="retention-row">
        <Pill tone={s.retention.d1 ? 'good' : 'lock'}>Day 1 {s.retention.d1 ? 'yes' : '—'}</Pill>
        <Pill tone={s.retention.d7 ? 'good' : 'lock'}>Day 7 {s.retention.d7 ? 'yes' : '—'}</Pill>
        <Pill tone={s.retention.d30 ? 'good' : 'lock'}>Day 30 {s.retention.d30 ? 'yes' : '—'}</Pill>
      </div>

      <div className="grid grid-two">
        <section className="card">
          <h3>Hardest questions</h3>
          {s.hardest.length === 0 ? (
            <p className="muted">No missed questions yet — answer some challenges to populate this.</p>
          ) : (
            <ul className="metric-list">
              {s.hardest.map((q) => (
                <li key={q.id}>
                  <span className="metric-name">{q.label}</span>
                  <span className="metric-val">
                    {q.wrong} wrong · {Math.round(q.rate * 100)}% miss
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <h3>Likely quit points</h3>
          {s.quits.length === 0 ? (
            <p className="muted">Not enough sessions yet to detect where players leave.</p>
          ) : (
            <ul className="metric-list">
              {s.quits.map((q) => (
                <li key={q.path}>
                  <span className="metric-name">{label(q.path)}</span>
                  <span className="metric-val">{q.n} exits</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <h3>Most visited</h3>
          <ul className="metric-list">
            {mostVisited.map((v) => (
              <li key={v.path}>
                <span className="metric-name">{label(v.path)}</span>
                <span className="metric-val">{v.n} visits</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h3>Most skipped</h3>
          <p className="muted small">Screens (and eras) getting the least attention.</p>
          <ul className="metric-list">
            {leastVisited.map((v) => (
              <li key={v.path}>
                <span className="metric-name">{label(v.path)}</span>
                <span className="metric-val">{v.n} visits</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="danger-zone">
        <button
          className="btn btn-ghost"
          onClick={() => {
            analytics.reset()
            setTick((t) => t + 1)
          }}
        >
          Clear analytics
        </button>
      </div>
    </div>
  )
}
