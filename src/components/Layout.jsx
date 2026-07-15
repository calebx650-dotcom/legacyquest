import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useGame } from '../state/GameContext.jsx'

const NAV = [
  { to: '/', label: 'Keeper’s Hall', icon: '🏛️', end: true },
  { to: '/daily', label: 'Daily Legacy', icon: '📅' },
  { to: '/eras', label: 'Eras', icon: '🧭' },
  { to: '/mysteries', label: 'History Mysteries', icon: '🕵️' },
  { to: '/puzzles', label: 'Puzzle Lab', icon: '🧩' },
  { to: '/mentors', label: 'Mentors', icon: '⚔️' },
  { to: '/community', label: 'Community Builder', icon: '🏙️' },
  { to: '/culture', label: 'Culture Journey', icon: '🎵' },
  { to: '/museum', label: 'Legacy Museum', icon: '🖼️' },
]

export default function Layout({ children }) {
  const { state } = useGame()
  const [open, setOpen] = useState(false)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="brand">
          <span className="brand-mark" aria-hidden>
            🔥
          </span>
          <div>
            <div className="brand-name">LegacyQuest</div>
            <div className="brand-tag">Live the history.</div>
          </div>
        </div>
        <nav className="nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="nav-icon" aria-hidden>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot">Legacy Keeper #{1000 + state.collectibles.length}</div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button
            className="hamburger"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <div className="stat-chips">
            <div className="chip chip-points" title="Legacy Points">
              <span className="chip-icon">✦</span>
              <span className="chip-value">{state.legacyPoints}</span>
              <span className="chip-label">Legacy Points</span>
            </div>
            <div className="chip" title="Daily streak">
              <span className="chip-icon">🔥</span>
              <span className="chip-value">{state.daily.streak}</span>
              <span className="chip-label">Day streak</span>
            </div>
            <div className="chip" title="Artifacts recovered">
              <span className="chip-icon">🏺</span>
              <span className="chip-value">{state.collectibles.length}</span>
              <span className="chip-label">Artifacts</span>
            </div>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>

      {open && <div className="scrim" onClick={() => setOpen(false)} />}
    </div>
  )
}
