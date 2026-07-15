import { useMemo, useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill, Reward } from '../components/ui.jsx'
import { audio } from '../audio/engine.js'
import { PUZZLES } from '../data/puzzles.js'

// Fisher–Yates shuffle (returns a new array).
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function PuzzleLab() {
  const { state } = useGame()
  const [activeId, setActiveId] = useState(PUZZLES[0].id)
  const active = PUZZLES.find((p) => p.id === activeId)

  return (
    <div className="view">
      <PageHeader
        icon="🧩"
        title="Puzzle Lab"
        subtitle="Short, sharp challenges. Match, order, and decode your way through history."
      />

      <div className="puzzle-tabs">
        {PUZZLES.map((p) => (
          <button
            key={p.id}
            className={`puzzle-tab ${p.id === activeId ? 'is-active' : ''}`}
            onClick={() => setActiveId(p.id)}
          >
            {state.solvedPuzzles.includes(p.id) && <span className="tick">✓</span>}
            {p.title}
          </button>
        ))}
      </div>

      <div className="card puzzle-stage" key={active.id}>
        <div className="puzzle-stage-head">
          <div>
            <h3>{active.title}</h3>
            <p className="muted">{active.instructions}</p>
          </div>
          <Pill tone="accent">+{active.reward} pts</Pill>
        </div>
        {active.type === 'match' && <MatchPuzzle puzzle={active} />}
        {active.type === 'timeline' && <TimelinePuzzle puzzle={active} />}
        {active.type === 'decode' && <DecodePuzzle puzzle={active} />}
      </div>
    </div>
  )
}

function useSolve(puzzle) {
  const { state, dispatch } = useGame()
  const solved = state.solvedPuzzles.includes(puzzle.id)
  const solve = () => {
    audio.play('solve')
    dispatch({ type: 'SOLVE_PUZZLE', id: puzzle.id })
  }
  return { solved, solve }
}

/* ---------- Match ---------- */
function MatchPuzzle({ puzzle }) {
  const { solved, solve } = useSolve(puzzle)
  const rights = useMemo(() => shuffle(puzzle.pairs.map((p) => p.right)), [puzzle.id])
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matched, setMatched] = useState({}) // left -> true
  const [wrong, setWrong] = useState(null) // right that just flashed wrong

  const correctFor = (left) => puzzle.pairs.find((p) => p.left === left)?.right

  function clickRight(right) {
    if (!selectedLeft || matched[selectedLeft]) return
    if (correctFor(selectedLeft) === right) {
      const next = { ...matched, [selectedLeft]: true }
      setMatched(next)
      setSelectedLeft(null)
      if (Object.keys(next).length === puzzle.pairs.length && !solved) solve()
    } else {
      setWrong(right)
      setTimeout(() => setWrong(null), 500)
    }
  }

  const done = Object.keys(matched).length === puzzle.pairs.length

  return (
    <div className="match">
      <div className="match-cols">
        <div className="match-col">
          {puzzle.pairs.map((p) => (
            <button
              key={p.left}
              className={`match-item ${matched[p.left] ? 'matched' : ''} ${
                selectedLeft === p.left ? 'selected' : ''
              }`}
              disabled={matched[p.left]}
              onClick={() => setSelectedLeft(p.left)}
            >
              {p.left}
            </button>
          ))}
        </div>
        <div className="match-col">
          {rights.map((r) => {
            const isMatched = Object.keys(matched).some((l) => correctFor(l) === r)
            return (
              <button
                key={r}
                className={`match-item ${isMatched ? 'matched' : ''} ${
                  wrong === r ? 'flash-wrong' : ''
                }`}
                disabled={isMatched}
                onClick={() => clickRight(r)}
              >
                {r}
              </button>
            )
          })}
        </div>
      </div>
      {(done || solved) && <Reward points={puzzle.reward}>All pairs matched!</Reward>}
      {!done && selectedLeft && (
        <p className="muted center">Now pick the match for “{selectedLeft}”.</p>
      )}
    </div>
  )
}

/* ---------- Timeline ---------- */
function TimelinePuzzle({ puzzle }) {
  const { solved, solve } = useSolve(puzzle)
  const [order, setOrder] = useState(() => shuffle(puzzle.events))
  const [checked, setChecked] = useState(solved)

  const correctOrder = [...puzzle.events].sort((a, b) => a.year - b.year)
  const isCorrect = order.every((e, i) => e.label === correctOrder[i].label)

  function move(index, dir) {
    const target = index + dir
    if (target < 0 || target >= order.length) return
    const next = [...order]
    ;[next[index], next[target]] = [next[target], next[index]]
    setOrder(next)
    setChecked(false)
  }

  function check() {
    setChecked(true)
    if (isCorrect && !solved) solve()
  }

  return (
    <div className="timeline">
      <ol className="timeline-list">
        {order.map((e, i) => (
          <li key={e.label} className={`timeline-item ${checked ? (isCorrect ? 'ok' : 'no') : ''}`}>
            <span className="timeline-rank">{i + 1}</span>
            <span className="timeline-label">
              {e.label}
              {(checked && isCorrect) || solved ? <em className="year"> — {e.year}</em> : null}
            </span>
            <span className="timeline-move">
              <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move earlier">
                ▲
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === order.length - 1}
                aria-label="Move later"
              >
                ▼
              </button>
            </span>
          </li>
        ))}
      </ol>
      {solved || (checked && isCorrect) ? (
        <Reward points={puzzle.reward}>Timeline restored in order!</Reward>
      ) : (
        <>
          <button className="btn btn-primary" onClick={check}>
            Check order
          </button>
          {checked && !isCorrect && (
            <p className="feedback-wrong">Not quite in order yet — keep arranging.</p>
          )}
        </>
      )}
    </div>
  )
}

/* ---------- Decode ---------- */
function DecodePuzzle({ puzzle }) {
  const { solved, solve } = useSolve(puzzle)
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)

  const norm = (s) => s.toUpperCase().replace(/\s+/g, ' ').trim()
  const isCorrect = norm(value) === norm(puzzle.answer)

  function check() {
    setChecked(true)
    if (isCorrect && !solved) solve()
  }

  return (
    <div className="decode">
      <div className="cipher">{puzzle.cipher}</div>
      {solved ? (
        <>
          <p className="decoded">
            Decoded: <strong>{puzzle.answer}</strong>
          </p>
          <p className="muted">{puzzle.note}</p>
          <Reward points={puzzle.reward}>Message decoded!</Reward>
        </>
      ) : (
        <>
          <input
            className="text-input"
            placeholder="Type the decoded message…"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setChecked(false)
            }}
            onKeyDown={(e) => e.key === 'Enter' && check()}
          />
          <button className="btn btn-primary" onClick={check}>
            Decode
          </button>
          {checked && !isCorrect && (
            <p className="feedback-wrong">That’s not it yet. Shift each letter back by 3.</p>
          )}
        </>
      )}
    </div>
  )
}
