// Cinematic first-run onboarding. Plays a short comic sequence, hands the player
// a guided first mission (introduced by Harriet Tubman), and unlocks the first
// artifact — all in a couple of minutes. Shown until `state.onboarded` is true.

import { useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { audio } from '../audio/engine.js'
import { ONBOARDING } from '../data/onboarding.js'
import { COLLECTIBLES } from '../data/collectibles.js'
import ComicPanel from './ComicPanel.jsx'
import { Icon, GameIcon } from './icons.jsx'

const STEP = { INTRO: 'intro', MISSION: 'mission', OUTRO: 'outro' }

export default function Onboarding() {
  const { dispatch } = useGame()
  const [sceneIdx, setSceneIdx] = useState(0)
  const [step, setStep] = useState(STEP.INTRO)
  const [picked, setPicked] = useState(null)

  const scenes = ONBOARDING.scenes
  const scene = scenes[sceneIdx]
  const mission = ONBOARDING.mission
  const correct = picked === mission.answerId
  const artifact = COLLECTIBLES[ONBOARDING.rewardArtifact]

  function nextScene() {
    audio.play('click')
    if (sceneIdx < scenes.length - 1) setSceneIdx((i) => i + 1)
    else setStep(STEP.MISSION)
  }

  function choose(id) {
    if (picked) return
    setPicked(id)
    audio.play(id === mission.answerId ? 'solve' : 'wrong')
  }

  function finishMission() {
    audio.play('unlock')
    setStep(STEP.OUTRO)
  }

  function begin() {
    // First real user gesture — safe to enable music going forward.
    dispatch({ type: 'UPDATE_SETTINGS', patch: { music: true } })
    dispatch({ type: 'COMPLETE_ONBOARDING' })
  }

  return (
    <div className="onboarding">
      <div className="onboarding-inner">
        <div className="onboarding-brand">
          <span className="brand-mark">
            <Icon name="flame" size={22} />
          </span>{' '}
          LegacyQuest
        </div>

        {step === STEP.INTRO && (
          <>
            <ComicPanel scene={scene} />
            <div className="onboarding-controls">
              <div className="dots">
                {scenes.map((s, i) => (
                  <span key={s.id} className={`dot ${i === sceneIdx ? 'on' : ''}`} />
                ))}
              </div>
              <div className="onboarding-actions">
                <button className="btn btn-ghost-soft" onClick={begin}>
                  Skip intro
                </button>
                <button className="btn btn-primary" onClick={nextScene}>
                  {sceneIdx < scenes.length - 1 ? 'Continue →' : 'Begin first mission →'}
                </button>
              </div>
            </div>
          </>
        )}

        {step === STEP.MISSION && (
          <div className="comic-panel anim-fade mission-panel" style={{ '--accent': '#2ea36b' }}>
            <div className="comic-body">
              <span className="comic-speaker">{mission.speaker}</span>
              <h2 className="comic-title">Your first mission</h2>
              <p className="comic-text">{mission.setup}</p>
              <p className="case-question">{mission.question}</p>
              <div className="option-grid">
                {mission.options.map((o) => {
                  let cls = 'option'
                  if (picked) {
                    if (o.id === mission.answerId) cls += ' option-correct'
                    else if (o.id === picked) cls += ' option-wrong'
                  }
                  return (
                    <button
                      key={o.id}
                      className={cls}
                      disabled={!!picked}
                      onClick={() => choose(o.id)}
                    >
                      {o.text}
                    </button>
                  )
                })}
              </div>
              {picked && (
                <p className={correct ? 'feedback-ok' : 'feedback-wrong'}>
                  {correct ? mission.correct : mission.wrong}
                </p>
              )}
              {picked && (
                <div className="onboarding-actions">
                  {correct ? (
                    <button className="btn btn-primary" onClick={finishMission}>
                      Restore the memory →
                    </button>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => setPicked(null)}
                    >
                      Try again
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {step === STEP.OUTRO && (
          <div className="comic-panel anim-rise" style={{ '--accent': ONBOARDING.outro.accent }}>
            <div className="comic-art" aria-hidden>
              <span className="comic-emoji comic-glyph reward-pop">
                <GameIcon glyph={ONBOARDING.outro.art} size={84} />
              </span>
            </div>
            <div className="comic-body">
              <span className="comic-speaker">{ONBOARDING.outro.speaker}</span>
              <h2 className="comic-title">{ONBOARDING.outro.title}</h2>
              <p className="comic-text">{ONBOARDING.outro.text}</p>

              <div className="reward-card">
                <span className="reward-card-icon">
                  <GameIcon glyph={artifact.icon} size={32} />
                </span>
                <div>
                  <div className="reward-card-name">{artifact.name}</div>
                  <div className="reward-card-meta">
                    First artifact recovered · +{ONBOARDING.rewardPoints} Legacy Points · +
                    {ONBOARDING.rewardXp} XP
                  </div>
                </div>
              </div>

              <div className="onboarding-actions">
                <button className="btn btn-primary btn-lg" onClick={begin}>
                  Enter LegacyQuest →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
