import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useGame } from '../state/GameContext.jsx'
import { audio } from '../audio/engine.js'
import { getLevelInfo } from '../game/selectors.js'
import { TITLES } from '../data/titles.js'
import SettingsPanel from './SettingsPanel.jsx'

const NAV = [
  { to: '/', label: 'Keeper’s Hall', icon: '🏛️', end: true },
  { to: '/daily', label: 'Daily Legacy', icon: '📅' },
  { to: '/quests', label: 'Quests', icon: '🎯' },
  { to: '/eras', label: 'Eras', icon: '🧭' },
  { to: '/mysteries', label: 'History Mysteries', icon: '🕵️' },
  { to: '/puzzles', label: 'Puzzle Lab', icon: '🧩' },
  { to: '/mentors', label: 'Mentors', icon: '⚔️' },
  { to: '/community', label: 'Community Builder', icon: '🏙️' },
  { to: '/culture', label: 'Culture Journey', icon: '🎵' },
  { to: '/museum', label: 'Legacy Museum', icon: '🖼️' },
  { to: '/progress', label: 'Progression', icon: '🏅' },
  { to: '/leaderboards', label: 'Leaderboards', icon: '🏆' },
  { to: '/teacher', label: 'Teacher Mode', icon: '🎓' },
]

export default function Layout({ children }) {
  const { state, dispatch } = useGame()
  const [open, setOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const lvl = getLevelInfo(state)
  const title = TITLES.find((t) => t.id === state.activeTitle)?.name ?? 'Legacy Keeper'

  function toggleMusic() {
    audio.play('click')
    dispatch({ type: 'UPDATE_SETTINGS', patch: { music: !state.settings.music } })
  }

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
        <div className="sidebar-foot">
          <div className="keeper-title">{title}</div>
          Legacy Keeper #{1000 + state.collectibles.length}
        </div>
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

          <div className="level-badge" title={`Level ${lvl.level}`}>
            <span className="level-num">Lv {lvl.level}</span>
            <div className="xp-bar">
              <div className="xp-fill" style={{ width: `${lvl.pct}%` }} />
            </div>
            <span className="xp-text">
              {lvl.into}/{lvl.span} XP
            </span>
          </div>

          <div className="stat-chips">
            <div className="chip chip-points" title="Legacy Points">
              <span className="chip-icon">✦</span>
              <span className="chip-value">{state.legacyPoints}</span>
              <span className="chip-label">Points</span>
            </div>
            <div className="chip" title="Daily streak">
              <span className="chip-icon">🔥</span>
              <span className="chip-value">{state.daily.streak}</span>
              <span className="chip-label">Streak</span>
            </div>
            <div className="chip" title="Artifacts recovered">
              <span className="chip-icon">🏺</span>
              <span className="chip-value">{state.collectibles.length}</span>
              <span className="chip-label">Artifacts</span>
            </div>
            <button
              className={`icon-btn ${state.settings.music ? 'on' : ''}`}
              onClick={toggleMusic}
              title={state.settings.music ? 'Mute music' : 'Play music'}
              aria-label="Toggle music"
            >
              {state.settings.music ? '🔊' : '🔇'}
            </button>
            <button
              className="icon-btn"
              onClick={() => setSettingsOpen(true)}
              title="Settings"
              aria-label="Open settings"
            >
              ⚙️
            </button>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
    </div>
  )
}
