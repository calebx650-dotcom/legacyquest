// Leaderboards & Seasons. Friendly competition. With no backend, the rankings
// use sample players blended with your real stats, and the seasonal timers are
// derived from the calendar so they feel live.

import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill } from '../components/ui.jsx'
import { getLevel } from '../game/selectors.js'
import { weekKey } from '../data/quests.js'

const SAMPLE = [
  { name: 'Zora W.', xp: 1420 },
  { name: 'DeShawn P.', xp: 1180 },
  { name: 'Amara J.', xp: 990 },
  { name: 'Nia C.', xp: 870 },
  { name: 'Malik T.', xp: 610 },
  { name: 'Imani R.', xp: 540 },
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function daysLeftInWeek() {
  const now = new Date()
  const day = (now.getDay() + 6) % 7 // Mon=0
  return 7 - day
}

function daysLeftInMonth() {
  const now = new Date()
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  return end.getDate() - now.getDate()
}

export default function Leaderboards() {
  const { state } = useGame()
  const you = { name: 'You', xp: state.xp, you: true }
  const board = [...SAMPLE, you].sort((a, b) => b.xp - a.xp)
  const rank = board.findIndex((r) => r.you) + 1
  const now = new Date()

  // A simple "school-wide challenge": collective artifacts toward a goal.
  const schoolGoal = 500
  const schoolProgress = 372 + state.collectibles.length // sample base + yours
  const schoolPct = Math.min(100, Math.round((schoolProgress / schoolGoal) * 100))

  return (
    <div className="view">
      <PageHeader
        icon="🏆"
        title="Leaderboards & Seasons"
        subtitle="Weekly mystery competitions, monthly artifact hunts, and seasonal museum events. Compete with your class and school."
      />
      <p className="demo-note">
        Demo data — other players here are sample competitors. Your XP and rank are real.
      </p>

      <div className="season-banner">
        <div>
          <span className="kicker">Current season</span>
          <h2>{MONTHS[now.getMonth()]} — “Keepers of the Flame”</h2>
          <p className="muted">
            Seasonal museum event: recover rare and legendary artifacts to light the season’s
            beacon.
          </p>
        </div>
        <div className="season-rank">
          <span className="rank-num">#{rank}</span>
          <span className="muted">your rank</span>
        </div>
      </div>

      <div className="grid grid-two">
        <section className="card">
          <div className="board-head">
            <h3>Weekly Mystery Competition</h3>
            <Pill tone="accent">{daysLeftInWeek()}d left</Pill>
          </div>
          <p className="muted small">Week {weekKey()} · ranked by total XP</p>
          <ol className="board">
            {board.map((r, i) => (
              <li key={r.name} className={`board-row ${r.you ? 'you' : ''}`}>
                <span className="board-rank">{i + 1}</span>
                <span className="board-name">{r.name}</span>
                <span className="board-xp">{r.xp} XP</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="card">
          <div className="board-head">
            <h3>Monthly Artifact Hunt</h3>
            <Pill tone="accent">{daysLeftInMonth()}d left</Pill>
          </div>
          <p className="muted small">Most artifacts recovered this month</p>
          <ol className="board">
            {[
              { name: 'Zora W.', n: 11 },
              { name: 'Amara J.', n: 8 },
              { name: 'You', n: state.collectibles.length, you: true },
              { name: 'Malik T.', n: 5 },
            ]
              .sort((a, b) => b.n - a.n)
              .map((r, i) => (
                <li key={r.name} className={`board-row ${r.you ? 'you' : ''}`}>
                  <span className="board-rank">{i + 1}</span>
                  <span className="board-name">{r.name}</span>
                  <span className="board-xp">{r.n} 🏺</span>
                </li>
              ))}
          </ol>
        </section>
      </div>

      <section className="card school-challenge">
        <div className="board-head">
          <h3>School-Wide Challenge</h3>
          <Pill tone="good">Community goal</Pill>
        </div>
        <p className="muted">
          Together, recover {schoolGoal} artifacts to unlock a bonus era for the whole school.
        </p>
        <div className="bar big">
          <div className="bar-fill" style={{ width: `${schoolPct}%` }} />
        </div>
        <p className="muted small">
          {schoolProgress} / {schoolGoal} recovered ({schoolPct}%)
        </p>
      </section>
    </div>
  )
}
