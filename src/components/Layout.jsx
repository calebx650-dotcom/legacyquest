import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useGame } from '../state/GameContext.jsx'
import { audio } from '../audio/engine.js'
import { getLevelInfo } from '../game/selectors.js'
import { TITLES } from '../data/titles.js'
import { MENTORS } from '../data/mentors.js'
import { tipFor } from '../data/companions.js'
import SettingsPanel from './SettingsPanel.jsx'

const NAV_GROUPS = [
  {
    label: 'Play',
    items: [
      { to: '/', label: 'Keeper’s Hall', icon: '🏛️', end: true },
      { to: '/daily', label: 'Daily Legacy', icon: '📅' },
      { to: '/quests', label: 'Quests', icon: '🎯' },
      { to: '/events', label: 'Events', icon: '🎁' },
    ],
  },
  {
    label: 'Explore',
    items: [
      { to: '/eras', label: 'Eras', icon: '🧭' },
      { to: '/mysteries', label: 'History Mysteries', icon: '🕵️' },
      { to: '/stories', label: 'Narrated Stories', icon: '📖' },
      { to: '/puzzles', label: 'Puzzle Lab', icon: '🧩' },
      { to: '/culture', label: 'Culture Journey', icon: '🎵' },
    ],
  },
  {
    label: 'Build',
    items: [
      { to: '/mentors', label: 'Mentors', icon: '⚔️' },
      { to: '/community', label: 'Community Builder', icon: '🏙️' },
      { to: '/museum', label: 'Legacy Museum', icon: '🖼️' },
    ],
  },
  {
    label: 'Progress',
    items: [
      { to: '/progress', label: 'Progression', icon: '🏅' },
      { to: '/leaderboards', label: 'Leaderboards', icon: '🏆' },
    ],
  },
  {
    label: 'Classroom & tools',
    items: [
      { to: '/teacher', label: 'Teacher Mode', icon: '🎓' },
      { to: '/analytics', label: 'Analytics', icon: '📊' },
      { to: '/studio', label: 'Content Studio', icon: '🛠️' },
      { to: '/offline', label: 'Offline & Packs', icon: '📥' },
      { to: '/account', label: 'Account', icon: '👤' },
    ],
  },
]

export default function Layout({ children }) {
  const { state, dispatch } = useGame()
  const [open, setOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [companionOpen, setCompanionOpen] = useState(true)
  const lvl = getLevelInfo(state)
  const title = TITLES.find((t) => t.id === state.activeTitle)?.name ?? 'Legacy Keeper'
  const companion = MENTORS.find((m) => m.id === state.activeCompanion)
  const companionTip = companion ? tipFor(companion.id) : null

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
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="nav-group">
              <div className="nav-group-label">{group.label}</div>
              {group.items.map((item) => (
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
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="keeper-title">{title}</div>
          Legacy Keeper #{1000 + state.collectibles.length}
          <div className="app-version">LegacyQuest 1.0 · history verified</div>
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

      {companion && companionOpen && (
        <div className="companion-widget">
          <div className="companion-avatar">
            {companion.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
          </div>
          <div className="companion-bubble">
            <div className="companion-name">{companion.name}</div>
            <p>{companionTip}</p>
          </div>
          <button
            className="companion-close"
            onClick={() => setCompanionOpen(false)}
            aria-label="Dismiss companion"
          >
            ✕
          </button>
        </div>
      )}

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
    </div>
  )
}
