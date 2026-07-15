import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill } from '../components/ui.jsx'
import { MENTORS } from '../data/mentors.js'
import { ERAS } from '../data/eras.js'

const eraName = (id) => ERAS.find((e) => e.id === id)?.name ?? id

export default function Mentors() {
  const { state, dispatch } = useGame()

  return (
    <div className="view">
      <PageHeader
        icon="⚔️"
        title="Mentors"
        subtitle="In LegacyQuest, historical figures are mentors — not fighters. Recruit them to learn real skills and unlock abilities for future missions."
      />

      <div className="grid grid-mentors">
        {MENTORS.map((m) => {
          const unlocked = state.unlockedMentors.includes(m.id)
          const eraReady = state.unlockedEras.includes(m.era)
          const affordable = state.legacyPoints >= m.unlockCost
          return (
            <article key={m.id} className={`mentor-card ${unlocked ? 'is-unlocked' : ''}`}>
              <div className="mentor-head">
                <div className="mentor-portrait" aria-hidden>
                  {m.name
                    .split(' ')
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <h3>{m.name}</h3>
                  <span className="muted">{m.lifespan}</span>
                </div>
              </div>

              <div className="mentor-teaches">
                <Pill tone="accent">Teaches: {m.teaches}</Pill>
                <Pill tone="lock">{eraName(m.era)}</Pill>
              </div>

              <p className="mentor-bio">{m.bio}</p>
              <blockquote className="mentor-quote">{m.quote}</blockquote>

              <div className="mentor-ability">
                <span className="ability-label">Ability</span>
                <span>{m.ability}</span>
              </div>

              {unlocked ? (
                <div className="mentor-foot recruited">✓ Recruited</div>
              ) : !eraReady ? (
                <button className="btn" disabled>
                  Restore {eraName(m.era)} first
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={!affordable}
                  onClick={() => dispatch({ type: 'UNLOCK_MENTOR', mentor: m })}
                >
                  {affordable
                    ? `Recruit (−${m.unlockCost} pts)`
                    : `Need ${m.unlockCost - state.legacyPoints} more pts`}
                </button>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
