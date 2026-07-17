import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill } from '../components/ui.jsx'
import { audio } from '../audio/engine.js'
import { CULTURE } from '../data/culture.js'
import { Icon } from '../components/icons.jsx'

export default function Culture() {
  const { state, dispatch } = useGame()

  return (
    <div className="view">
      <PageHeader
        icon="🎵"
        title="Culture Journey"
        subtitle="Follow the through-line of Black music — from spirituals to hip-hop — and how each sound met its moment in history."
      />

      <div className="culture-timeline">
        {CULTURE.map((c) => {
          const visited = state.visitedCulture.includes(c.id)
          return (
            <article key={c.id} className={`culture-card ${visited ? 'visited' : ''}`}>
              <div className="culture-era">{c.era}</div>
              <div className="culture-body">
                <div className="culture-head">
                  <h3>{c.genre}</h3>
                  {visited && <Pill tone="good">Explored</Pill>}
                </div>
                <p>{c.origin}</p>
                <div className="culture-figure">
                  <span className="culture-figure-name">{c.figure}</span>
                  <span className="muted">{c.figureNote}</span>
                </div>
                <div className="culture-foot">
                  <span className="clip-note" title="Licensed audio clips would play here">
                    <Icon name="speaker" size={13} /> Clip available where licensed
                  </span>
                  {!visited && (
                    <button
                      className="btn"
                      onClick={() => {
                        audio.play('unlock')
                        dispatch({ type: 'VISIT_CULTURE', id: c.id })
                      }}
                    >
                      Listen &amp; learn
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
