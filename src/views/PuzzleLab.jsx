import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill, Reward } from '../components/ui.jsx'
import { audio } from '../audio/engine.js'
import { PUZZLES } from '../data/puzzles.js'
import { photoUrl, photoCredit } from '../data/photos.js'
import { Icon, GameIcon } from '../components/icons.jsx'

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
  const location = useLocation()
  const [activeId, setActiveId] = useState(PUZZLES[0].id)

  // Quest Path deep-link: select a specific puzzle on arrival.
  useEffect(() => {
    if (location.state?.tab && PUZZLES.some((p) => p.id === location.state.tab))
      setActiveId(location.state.tab)
  }, [location.state])
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
            {state.solvedPuzzles.includes(p.id) && <span className="tick"><Icon name="check" size={12} /></span>}
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
          <Pill tone="accent">+{active.reward} coins</Pill>
        </div>
        {active.type === 'match' && <MatchPuzzle puzzle={active} />}
        {active.type === 'timeline' && <TimelinePuzzle puzzle={active} />}
        {active.type === 'decode' && <DecodePuzzle puzzle={active} />}
        {active.type === 'jigsaw' && <JigsawPuzzle puzzle={active} />}
        {active.type === 'memory' && <MemoryPuzzle puzzle={active} />}
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

/* ---------- Jigsaw: restore a damaged historical photo ---------- */
function JigsawPuzzle({ puzzle }) {
  const { solved, solve } = useSolve(puzzle)
  const n = puzzle.grid // n x n tiles
  const total = n * n
  const src = photoUrl(puzzle.photo)

  // Preload the photo; if it can't load (offline), fall back to a starfield
  // gradient so the puzzle is still playable.
  const [photoOk, setPhotoOk] = useState(null)
  useEffect(() => {
    if (!src) return setPhotoOk(false)
    const img = new Image()
    img.onload = () => setPhotoOk(true)
    img.onerror = () => setPhotoOk(false)
    img.src = src
  }, [src])

  // perm[position] = tile shown at that position; solved when perm[i] === i.
  const [perm, setPerm] = useState(() => {
    if (puzzle && !solved) {
      let p = shuffle([...Array(total).keys()])
      // Ensure it doesn't start solved.
      if (p.every((v, i) => v === i)) [p[0], p[1]] = [p[1], p[0]]
      return p
    }
    return [...Array(total).keys()]
  })
  const [sel, setSel] = useState(null)

  const done = solved || perm.every((v, i) => v === i)

  function tap(i) {
    if (done) return
    audio.play('click')
    if (sel === null) return setSel(i)
    if (sel === i) return setSel(null)
    const next = [...perm]
    ;[next[sel], next[i]] = [next[i], next[sel]]
    setPerm(next)
    setSel(null)
    if (next.every((v, idx) => v === idx) && !solved) solve()
  }

  function tileStyle(tile) {
    const row = Math.floor(tile / n)
    const col = tile % n
    if (photoOk) {
      return {
        backgroundImage: `url("${src}")`,
        backgroundSize: `${n * 100}% ${n * 100}%`,
        backgroundPosition: `${(col / (n - 1)) * 100}% ${(row / (n - 1)) * 100}%`,
      }
    }
    // Offline fallback: a night-sky gradient with a star per tile.
    return {
      background: `radial-gradient(circle at ${20 + col * 30}% ${20 + row * 30}%, #f6d47c 2%, transparent 6%), linear-gradient(${135 + tile * 10}deg, #241645, #0d0916)`,
    }
  }

  return (
    <div className="jigsaw">
      <div
        className={`jigsaw-board ${done ? 'done' : ''}`}
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      >
        {perm.map((tile, pos) => (
          <button
            key={pos}
            className={`jigsaw-tile ${sel === pos ? 'selected' : ''} ${
              done ? 'locked' : ''
            }`}
            style={tileStyle(done ? pos : tile)}
            onClick={() => tap(pos)}
            aria-label={`Tile ${pos + 1}`}
          />
        ))}
      </div>
      {photoOk === false && (
        <p className="muted small center">
          Photo unavailable offline — restoring the North Star sky instead.
        </p>
      )}
      {done ? (
        <>
          <p className="muted small center">
            {photoOk ? `${puzzle.caption} ${photoCredit(puzzle.photo)}` : puzzle.caption}
          </p>
          <Reward points={puzzle.reward}>Photograph restored!</Reward>
        </>
      ) : (
        <p className="muted center">
          {sel === null ? 'Tap a tile to pick it up.' : 'Now tap where it belongs.'}
        </p>
      )}
    </div>
  )
}

/* ---------- Memory: flip-and-match mentor pairs ---------- */
function MemoryPuzzle({ puzzle }) {
  const { solved, solve } = useSolve(puzzle)
  const deck = useMemo(
    () =>
      shuffle(
        puzzle.pairs.flatMap((p) => [
          { key: `${p.id}-a`, pair: p.id, icon: p.icon, label: p.label },
          { key: `${p.id}-b`, pair: p.id, icon: p.icon, label: p.label },
        ]),
      ),
    [puzzle.id],
  )
  const [flipped, setFlipped] = useState([]) // keys currently face-up (max 2)
  const [matched, setMatched] = useState(solved ? deck.map((c) => c.pair) : [])
  const [busy, setBusy] = useState(false)

  const allMatched = matched.length >= puzzle.pairs.length * 2 || solved

  function flip(card) {
    if (busy || allMatched) return
    if (matched.includes(card.pair) || flipped.includes(card.key)) return
    audio.play('click')
    const next = [...flipped, card.key]
    setFlipped(next)
    if (next.length === 2) {
      const [a, b] = next.map((k) => deck.find((c) => c.key === k))
      if (a.pair === b.pair) {
        audio.play('solve')
        const m = [...matched, a.pair, b.pair]
        setMatched(m)
        setFlipped([])
        if (m.length >= puzzle.pairs.length * 2 && !solved) solve()
      } else {
        setBusy(true)
        setTimeout(() => {
          setFlipped([])
          setBusy(false)
        }, 750)
      }
    }
  }

  return (
    <div className="memory">
      <div className="memory-grid">
        {deck.map((card) => {
          const up = allMatched || matched.includes(card.pair) || flipped.includes(card.key)
          return (
            <button
              key={card.key}
              className={`memory-card ${up ? 'up' : ''} ${
                matched.includes(card.pair) ? 'matched' : ''
              }`}
              onClick={() => flip(card)}
              aria-label={up ? card.label : 'Face-down card'}
            >
              <span className="memory-inner">
                <span className="memory-front"><Icon name="flame" size={26} /></span>
                <span className="memory-back">
                  <span className="memory-icon"><GameIcon glyph={card.icon} size={24} /></span>
                  <span className="memory-label">{card.label}</span>
                </span>
              </span>
            </button>
          )
        })}
      </div>
      {allMatched && <Reward points={puzzle.reward}>All mentors matched!</Reward>}
    </div>
  )
}
