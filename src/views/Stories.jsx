import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill, Reward, Significance } from '../components/ui.jsx'
import { audio } from '../audio/engine.js'
import { STORIES } from '../data/stories.js'
import { allEras, allCollectibles } from '../content/store.js'
import { Icon } from '../components/icons.jsx'

const eraName = (id) => allEras().find((e) => e.id === id)?.name ?? id

export default function Stories() {
  const { state } = useGame()
  const location = useLocation()
  const [playing, setPlaying] = useState(null)

  // Quest Path deep-link: start a specific story on arrival.
  useEffect(() => {
    if (location.state?.play) setPlaying(location.state.play)
  }, [location.state])

  return (
    <div className="view">
      <PageHeader
        icon="📖"
        title="Narrated Stories"
        subtitle="Step into short, interactive stories. Your choices reveal different historical perspectives — and it all can be read aloud."
      />

      <div className="grid grid-two">
        {STORIES.map((s) => {
          const done = state.completedStories.includes(s.id)
          return (
            <article key={s.id} className={`story-card ${done ? 'done' : ''}`}>
              <div className="case-top">
                <Pill tone="lock">{eraName(s.era)}</Pill>
                {done ? <Pill tone="good">Completed</Pill> : <Pill tone="accent">2–5 min</Pill>}
              </div>
              <h3>{s.title}</h3>
              <p className="case-brief">{s.blurb}</p>
              <span className="mission-reward">
                Reward: +{s.rewardXp} XP, +{s.rewardPoints} pts
              </span>
              <button className="btn btn-primary" onClick={() => setPlaying(s.id)}>
                {done ? 'Replay story' : 'Begin story'}
              </button>
            </article>
          )
        })}
      </div>

      {playing && (
        <StoryPlayer story={STORIES.find((s) => s.id === playing)} onClose={() => setPlaying(null)} />
      )}
    </div>
  )
}

function StoryPlayer({ story, onClose }) {
  const { dispatch } = useGame()
  const [nodeId, setNodeId] = useState(story.start)
  const [narrate, setNarrate] = useState(false)
  const rewardedRef = useRef(false)

  const node = story.nodes[nodeId]
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  // Narrate the current node when narration is on.
  useEffect(() => {
    if (!narrate || !supported) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(node.text)
    u.rate = 0.97
    window.speechSynthesis.speak(u)
    return () => window.speechSynthesis.cancel()
  }, [nodeId, narrate, supported, node.text])

  // Award once, when an ending node is reached.
  useEffect(() => {
    if (node.end && !rewardedRef.current) {
      rewardedRef.current = true
      audio.play('unlock')
      dispatch({ type: 'COMPLETE_STORY', id: story.id })
    }
  }, [node.end, dispatch, story.id])

  function choose(to) {
    audio.play('click')
    setNodeId(to)
  }

  const artifact = story.artifact ? allCollectibles()[story.artifact] : null

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal story-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="story-head">
          <h2>{story.title}</h2>
          {supported && (
            <button
              className={`btn narrate-btn ${narrate ? 'on' : ''}`}
              onClick={() => setNarrate((v) => !v)}
            >
              <Icon name="speaker" size={14} /> {narrate ? 'Narration on' : 'Narrate'}
            </button>
          )}
        </div>

        {node.speaker && <span className="comic-speaker">{node.speaker}</span>}
        <p className="story-text">{node.text}</p>

        {!node.end ? (
          <div className="story-choices">
            {node.choices.map((c) => (
              <button key={c.to} className="story-choice" onClick={() => choose(c.to)}>
                <span className="story-choice-label">{c.label}</span>
                {c.note && <span className="story-choice-note">{c.note}</span>}
              </button>
            ))}
          </div>
        ) : (
          <div className="story-ending">
            <p className="story-ending-line">{node.ending}</p>
            <Reward points={story.rewardPoints}>
              Story complete!{artifact ? ` Recovered “${artifact.name}”.` : ''} +{story.rewardXp} XP
            </Reward>
            <Significance why={story.whyItMatters} reflect={story.reflect} />
            <div className="onboarding-actions">
              <button className="btn" onClick={() => { rewardedRef.current = false; setNodeId(story.start) }}>
                Replay
              </button>
              <button className="btn btn-primary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
