import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill } from '../components/ui.jsx'
import { getLevelInfo, achievementCtx } from '../game/selectors.js'
import { ACHIEVEMENTS } from '../data/achievements.js'
import { TITLES, earnedTitles } from '../data/titles.js'
import { MENTORS } from '../data/mentors.js'

export default function Progress() {
  const { state, dispatch } = useGame()
  const lvl = getLevelInfo(state)
  const ctx = achievementCtx(state)
  const unlockedTitles = earnedTitles(state)
  const unlockedTitleIds = new Set(unlockedTitles.map((t) => t.id))

  const earned = ACHIEVEMENTS.filter((a) => state.achievements.includes(a.id))

  return (
    <div className="view">
      <PageHeader
        icon="🏅"
        title="Progression"
        subtitle="Your level, titles, and achievement badges — the record of how far you’ve carried the flame."
      />

      <section className="level-hero">
        <div className="level-ring">
          <span className="level-ring-num">{lvl.level}</span>
          <span className="level-ring-label">Level</span>
        </div>
        <div className="level-hero-body">
          <div className="xp-bar big">
            <div className="xp-fill" style={{ width: `${lvl.pct}%` }} />
          </div>
          <p className="muted">
            {lvl.into}/{lvl.span} XP toward Level {lvl.level + 1} · {state.xp} total XP
          </p>
        </div>
      </section>

      <h3 className="section-label">Companion</h3>
      {state.unlockedMentors.length === 0 ? (
        <p className="empty-note">
          Recruit a mentor to choose a companion who guides you as you play.
        </p>
      ) : (
        <div className="grid grid-titles">
          <button
            className={`title-card has ${!state.activeCompanion ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_COMPANION', id: null })}
          >
            <span className="title-name">None</span>
            <span className="title-hint">Travel solo</span>
          </button>
          {MENTORS.filter((m) => state.unlockedMentors.includes(m.id)).map((m) => (
            <button
              key={m.id}
              className={`title-card has ${state.activeCompanion === m.id ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SET_COMPANION', id: m.id })}
            >
              <span className="title-name">{m.name}</span>
              <span className="title-hint">{m.teaches}</span>
            </button>
          ))}
        </div>
      )}

      <h3 className="section-label">Titles</h3>
      <div className="grid grid-titles">
        {TITLES.map((t) => {
          const has = unlockedTitleIds.has(t.id)
          const active = state.activeTitle === t.id
          return (
            <button
              key={t.id}
              className={`title-card ${has ? 'has' : 'locked'} ${active ? 'active' : ''}`}
              disabled={!has}
              onClick={() => dispatch({ type: 'SET_TITLE', id: t.id })}
            >
              <span className="title-name">{t.name}</span>
              <span className="title-hint">{has ? (active ? 'Equipped' : 'Tap to equip') : t.hint}</span>
            </button>
          )
        })}
      </div>

      <h3 className="section-label">
        Achievements · {earned.length}/{ACHIEVEMENTS.length}
      </h3>
      <div className="grid grid-badges">
        {ACHIEVEMENTS.map((a) => {
          const has = state.achievements.includes(a.id)
          const progressable = a.req(state, ctx)
          return (
            <div key={a.id} className={`badge-card ${has ? 'has' : 'locked'}`}>
              <div className="badge-icon">{has ? a.icon : '🔒'}</div>
              <div className="badge-body">
                <div className="badge-name">{a.name}</div>
                <div className="badge-desc">{a.desc}</div>
              </div>
              {has ? (
                <Pill tone="good">Earned</Pill>
              ) : progressable ? (
                <Pill tone="accent">Ready…</Pill>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
