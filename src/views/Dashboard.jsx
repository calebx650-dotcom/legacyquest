import { Link } from 'react-router-dom'
import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Reward } from '../components/ui.jsx'
import Speak from '../components/Speak.jsx'
import { audio } from '../audio/engine.js'
import { allEras } from '../content/store.js'
import { MYSTERIES } from '../data/mysteries.js'
import { PUZZLES } from '../data/puzzles.js'
import { MENTORS } from '../data/mentors.js'
import { COMMUNITY } from '../data/community.js'
import { featuredForDate, featuredId } from '../data/thisday.js'
import { activeEvents } from '../data/events.js'

export default function Dashboard() {
  const { state, dispatch } = useGame()

  const featured = featuredForDate()
  const fid = featuredId()
  const claimedToday = state.thisDayClaimed === fid

  const events = activeEvents()
  const now = new Date()
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate(),
  ).padStart(2, '0')}`
  const dailyDone = state.daily.lastCompleted === todayStr
  const streak = state.daily.streak || 0

  function claimThisDay() {
    if (claimedToday) return
    audio.play('unlock')
    dispatch({ type: 'CLAIM_THIS_DAY', id: fid })
  }

  const progress = [
    { label: 'Eras restored', done: state.unlockedEras.length, total: allEras().length, to: '/eras' },
    {
      label: 'Mysteries solved',
      done: state.solvedMysteries.length,
      total: MYSTERIES.length,
      to: '/mysteries',
    },
    {
      label: 'Puzzles cleared',
      done: state.solvedPuzzles.length,
      total: PUZZLES.length,
      to: '/puzzles',
    },
    {
      label: 'Mentors recruited',
      done: state.unlockedMentors.length,
      total: MENTORS.length,
      to: '/mentors',
    },
    {
      label: 'Greenwood rebuilt',
      done: state.builtBuildings.length,
      total: COMMUNITY.buildings.length,
      to: '/community',
    },
  ]

  // Suggest the next thing to do.
  const nextMystery = MYSTERIES.find((m) => !state.solvedMysteries.includes(m.id))
  const nextPuzzle = PUZZLES.find((p) => !state.solvedPuzzles.includes(p.id))

  return (
    <div className="view">
      <PageHeader
        icon="🏛️"
        title="Keeper’s Hall"
        subtitle="The Eraser is unmaking Black history. As a Legacy Keeper, restore it — one story at a time."
      />

      {events.length > 0 && (
        <div className="event-banner">
          <span className="event-banner-icon">{events[0].icon}</span>
          <span>
            <strong>{events[0].name} is live!</strong> {events[0].blurb}
          </span>
          <Link className="btn btn-sm" to="/events">
            View events
          </Link>
        </div>
      )}

      {streak > 0 && !dailyDone && (
        <div className="reminder-banner">
          <span>🔥</span>
          <span>
            You have a <strong>{streak}-day streak</strong> — don’t break it! Today’s Daily Legacy is
            waiting.
          </span>
          <Link className="btn btn-sm" to="/daily">
            Keep it alive
          </Link>
        </div>
      )}

      <section className="thisday-card">
        <div className="thisday-head">
          <span className="kicker">
            {featured.exact ? 'This Day in Black History' : 'Featured moment in Black history'}
          </span>
          <span className="thisday-date">{featured.dateLabel}</span>
        </div>
        <p className="thisday-text">
          {featured.text}
          <Speak text={`On ${featured.dateLabel}. ${featured.text}`} />
        </p>
        {claimedToday ? (
          <Reward points={10}>Explored today’s moment — come back tomorrow for another.</Reward>
        ) : (
          <button className="btn btn-primary" onClick={claimThisDay}>
            Explore &amp; claim bonus (+10 pts, +15 XP)
          </button>
        )}
      </section>

      <section className="hero-card">
        <div className="hero-body">
          <h2>The timeline is fading.</h2>
          <p>
            Figures, inventions, and speeches are vanishing. Travel through the eras, solve the
            mysteries the Eraser left behind, and recover every artifact for your Legacy Museum.
            Every mission is built from verified history.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/daily">
              Today’s Daily Legacy →
            </Link>
            {nextMystery && (
              <Link className="btn" to="/mysteries">
                Investigate: {nextMystery.title}
              </Link>
            )}
          </div>
        </div>
      </section>

      <h3 className="section-label">Your progress</h3>
      <div className="grid grid-progress">
        {progress.map((p) => {
          const pct = Math.round((p.done / p.total) * 100)
          return (
            <Link to={p.to} key={p.label} className="progress-card">
              <div className="progress-top">
                <span>{p.label}</span>
                <strong>
                  {p.done}/{p.total}
                </strong>
              </div>
              <div className="bar">
                <div className="bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </Link>
          )
        })}
      </div>

      <h3 className="section-label">Recommended missions</h3>
      <div className="grid grid-two">
        {nextMystery ? (
          <Link to="/mysteries" className="mission-card">
            <span className="mission-kind">🕵️ History Mystery</span>
            <h4>{nextMystery.title}</h4>
            <p>{nextMystery.brief}</p>
            <span className="mission-reward">Reward: +{nextMystery.reward} pts</span>
          </Link>
        ) : (
          <div className="mission-card mission-done">
            <span className="mission-kind">🕵️ History Mysteries</span>
            <h4>All mysteries solved!</h4>
            <p>You’ve restored every investigation currently in the timeline. More eras await.</p>
          </div>
        )}
        {nextPuzzle ? (
          <Link to="/puzzles" className="mission-card">
            <span className="mission-kind">🧩 Puzzle Lab</span>
            <h4>{nextPuzzle.title}</h4>
            <p>{nextPuzzle.instructions}</p>
            <span className="mission-reward">Reward: +{nextPuzzle.reward} pts</span>
          </Link>
        ) : (
          <div className="mission-card mission-done">
            <span className="mission-kind">🧩 Puzzle Lab</span>
            <h4>Every puzzle cleared!</h4>
            <p>Sharp work, Keeper. Check the Museum to admire what you’ve recovered.</p>
          </div>
        )}
      </div>
    </div>
  )
}
