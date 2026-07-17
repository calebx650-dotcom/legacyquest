import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill } from '../components/ui.jsx'
import { audio } from '../audio/engine.js'
import { COMMUNITY } from '../data/community.js'
import { Icon, GameIcon } from '../components/icons.jsx'

// Madam C. J. Walker's "Enterprise" ability discounts construction by 15%.
const WALKER = 'madam-cj-walker'
const DISCOUNT = 0.15

export default function Community() {
  const { state, dispatch } = useGame()
  const hasWalker = state.unlockedMentors.includes(WALKER)
  const costOf = (b) => (hasWalker ? Math.round(b.cost * (1 - DISCOUNT)) : b.cost)

  const built = state.builtBuildings.length
  const total = COMMUNITY.buildings.length

  return (
    <div className="view">
      <PageHeader
        icon="🏙️"
        title="Community Builder"
        subtitle="Rebuild a district the Eraser tried to wipe out. Each building you raise recovers a true story."
      />

      <div className="community-banner" >
        <div>
          <h2>{COMMUNITY.name}</h2>
          <span className="muted">{COMMUNITY.place}</span>
          <p>{COMMUNITY.intro}</p>
        </div>
        <div className="community-progress">
          <div className="ring" style={{ '--pct': `${(built / total) * 100}%` }}>
            <span>
              {built}/{total}
            </span>
          </div>
          <span className="muted">rebuilt</span>
        </div>
      </div>

      {hasWalker && (
        <p className="ability-active">
          <Icon name="bolt" size={14} /> Madam C. J. Walker’s <strong>Enterprise</strong> ability is active — construction costs
          reduced 15%.
        </p>
      )}

      <div className="grid grid-buildings">
        {COMMUNITY.buildings.map((b) => {
          const isBuilt = state.builtBuildings.includes(b.id)
          const cost = costOf(b)
          const affordable = state.legacyPoints >= cost
          return (
            <article key={b.id} className={`build-card ${isBuilt ? 'built' : ''}`}>
              <div className="build-icon" aria-hidden>
                <GameIcon glyph={b.icon} size={36} />
              </div>
              <h3>{b.name}</h3>
              {isBuilt ? (
                <>
                  <Pill tone="good">Standing</Pill>
                  <p className="build-story">{b.story}</p>
                </>
              ) : (
                <>
                  <p className="muted build-locked-note">
                    Rebuild to recover this building’s story.
                  </p>
                  <button
                    className="btn btn-primary"
                    disabled={!affordable}
                    onClick={() => {
                      audio.play('unlock')
                      dispatch({ type: 'BUILD', id: b.id, cost })
                    }}
                  >
                    {affordable
                      ? `Build (−${cost} pts)`
                      : `Need ${cost - state.legacyPoints} more pts`}
                  </button>
                </>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
