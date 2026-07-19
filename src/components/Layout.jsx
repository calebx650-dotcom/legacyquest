import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useGame } from '../state/GameContext.jsx'
import { audio } from '../audio/engine.js'
import { getLevelInfo } from '../game/selectors.js'
import { TITLES } from '../data/titles.js'
import { MENTORS } from '../data/mentors.js'
import { tipFor } from '../data/companions.js'
import { GUIDE, guideTip } from '../data/guide.js'
import GuideAvatar from './GuideAvatar.jsx'
import SettingsPanel from './SettingsPanel.jsx'
import { Icon, GameIcon } from './icons.jsx'

const NAV_GROUPS = [
  {
    label: 'Play',
    items: [
      { to: '/', label: 'Quest Path', icon: '🧭', end: true },
      { to: '/daily', label: 'Daily Legacy', icon: '📅' },
      { to: '/museum', label: 'Legacy Museum', icon: '🖼️' },
      { to: '/progress', label: 'Progression', icon: '🏅' },
      { to: '/more', label: 'More', icon: '🛠️' },
    ],
  },
]

export default function Layout({ children }) {
  const { state, dispatch } = useGame()
  const [open, setOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [companionOpen, setCompanionOpen] = useState(true)
  const location = useLocation()
  const lvl = getLevelInfo(state)
  const title = TITLES.find((t) => t.id === state.activeTitle)?.name ?? 'Legacy Keeper'
  // A recruited mentor companion takes over; otherwise Rosa Parks — every
  // Keeper's guide from the start — rides along.
  const companion = MENTORS.find((m) => m.id === state.activeCompanion)
  const companionTip = companion
    ? tipFor(companion.id)
    : guideTip(location.pathname)

  function toggleMusic() {
    audio.play('click')
    dispatch({ type: 'UPDATE_SETTINGS', patch: { music: !state.settings.music } })
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="brand">
          <span className="brand-mark" aria-hidden>
            <Icon name="flame" size={30} />
          </span>
          <div>
            <div className="brand-name">LegacyQuest</div>
            <div className="brand-tag">Restore · Remember · Rise</div>
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
                    <GameIcon glyph={item.icon} size={17} />
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
            <Icon name="menu" size={18} />
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
            <div className="chip chip-points" title="Coins">
              <span className="chip-icon">
                <Icon name="coin" size={14} />
              </span>
              <span className="chip-value">{state.legacyPoints}</span>
              <span className="chip-label">Coins</span>
            </div>
            <div className="chip" title="Daily streak">
              <span className="chip-icon">
                <Icon name="flame" size={14} />
              </span>
              <span className="chip-value">{state.daily.streak}</span>
              <span className="chip-label">Streak</span>
            </div>
            <div className="chip" title="Artifacts recovered">
              <span className="chip-icon">
                <Icon name="vase" size={14} />
              </span>
              <span className="chip-value">{state.collectibles.length}</span>
              <span className="chip-label">Artifacts</span>
            </div>
            <button
              className={`icon-btn ${state.settings.music ? 'on' : ''}`}
              onClick={toggleMusic}
              title={state.settings.music ? 'Mute music' : 'Play music'}
              aria-label="Toggle music"
            >
              <Icon name={state.settings.music ? 'speaker' : 'speakerOff'} size={17} />
            </button>
            <button
              className="icon-btn"
              onClick={() => setSettingsOpen(true)}
              title="Settings"
              aria-label="Open settings"
            >
              <Icon name="gear" size={17} />
            </button>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>

      {companionOpen && (
        <div className="companion-widget">
          {companion ? (
            <div className="companion-avatar">
              {companion.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </div>
          ) : (
            <div className="guide-avatar-wrap">
              <GuideAvatar size={54} />
            </div>
          )}
          <div className="companion-bubble">
            <div className="companion-name">{companion ? companion.name : GUIDE.name}</div>
            <p>{companionTip}</p>
          </div>
          <button
            className="companion-close"
            onClick={() => setCompanionOpen(false)}
            aria-label="Dismiss companion"
          >
            ×
          </button>
        </div>
      )}

      <nav className="tabbar" aria-label="Primary">
        {[
          { to: '/', icon: '🧭', label: 'Path', end: true },
          { to: '/daily', icon: '📅', label: 'Daily' },
          { to: '/museum', icon: '🖼️', label: 'Museum' },
          { to: '/progress', icon: '🏅', label: 'Progress' },
          { to: '/more', icon: '🛠️', label: 'More' },
        ].map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) => `tab-item ${isActive ? 'is-active' : ''}`}
          >
            <span className="tab-icon" aria-hidden>
              <GameIcon glyph={t.icon} size={20} />
            </span>
            <span>{t.label}</span>
          </NavLink>
        ))}
      </nav>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
    </div>
  )
}
