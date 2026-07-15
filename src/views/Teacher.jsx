// Teacher Mode — classroom tools. In this prototype the "class" is sample data
// held locally (no backend), so teachers can see how progress dashboards,
// printable worksheets, quiz reports, assignments, and leaderboards would work.

import { useEffect, useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill } from '../components/ui.jsx'
import { MYSTERIES } from '../data/mysteries.js'
import { ERAS } from '../data/eras.js'
import { getLevel } from '../game/selectors.js'

// Sample roster so the dashboards have something to show. Clearly a demo.
const SAMPLE_CLASS = [
  { name: 'Amara J.', level: 6, mysteries: 3, eras: 4, streak: 9 },
  { name: 'Malik T.', level: 4, mysteries: 2, eras: 3, streak: 4 },
  { name: 'Zora W.', level: 8, mysteries: 3, eras: 6, streak: 14 },
  { name: 'Elijah B.', level: 3, mysteries: 1, eras: 2, streak: 2 },
  { name: 'Nia C.', level: 5, mysteries: 2, eras: 4, streak: 7 },
]

const DISCUSSION = [
  'What conditions made this event possible, and who was involved beyond the most famous names?',
  'How did ordinary people organize and sustain change over time?',
  'What primary sources would help you verify this story, and where might you find them?',
]

const ASSIGN_KEY = 'legacyquest.teacher.assignments.v1'

export default function Teacher() {
  const { state } = useGame()
  const [worksheet, setWorksheet] = useState(MYSTERIES[0].id)
  const [assignments, setAssignments] = useState([])
  const [form, setForm] = useState({ title: '', target: MYSTERIES[0].id, due: '' })

  useEffect(() => {
    try {
      setAssignments(JSON.parse(localStorage.getItem(ASSIGN_KEY) || '[]'))
    } catch {
      setAssignments([])
    }
  }, [])

  function persist(list) {
    setAssignments(list)
    try {
      localStorage.setItem(ASSIGN_KEY, JSON.stringify(list))
    } catch {
      /* ignore */
    }
  }

  function addAssignment(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    persist([{ id: Date.now(), ...form }, ...assignments])
    setForm({ title: '', target: MYSTERIES[0].id, due: '' })
  }

  const mystery = MYSTERIES.find((m) => m.id === worksheet)

  // The player's own row, blended into the sample leaderboard.
  const you = {
    name: 'You',
    level: getLevel(state),
    mysteries: state.solvedMysteries.length,
    eras: state.unlockedEras.length,
    streak: state.daily.streak,
    you: true,
  }
  const leaderboard = [...SAMPLE_CLASS, you].sort((a, b) => b.level - a.level)

  return (
    <div className="view">
      <PageHeader
        icon="🎓"
        title="Teacher Mode"
        subtitle="Classroom tools: progress dashboards, printable worksheets, quiz reports, assignments, and a class leaderboard."
      />
      <p className="demo-note">
        Demo data — this prototype has no server, so the class roster below is sample data. Your own
        stats are real and blended in.
      </p>

      <h3 className="section-label">Class progress</h3>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Level</th>
              <th>Mysteries</th>
              <th>Eras</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((r) => (
              <tr key={r.name} className={r.you ? 'you-row' : ''}>
                <td>{r.name}</td>
                <td>{r.level}</td>
                <td>{r.mysteries}</td>
                <td>{r.eras}</td>
                <td>{r.streak}🔥</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="section-label">Quiz report (your results)</h3>
      <div className="grid grid-two">
        {MYSTERIES.map((m) => {
          const solved = state.solvedMysteries.includes(m.id)
          return (
            <div key={m.id} className="quiz-report-row">
              <span>{m.title}</span>
              {solved ? <Pill tone="good">Correct ✓</Pill> : <Pill tone="lock">Not attempted</Pill>}
            </div>
          )
        })}
      </div>

      <h3 className="section-label">Create assignment</h3>
      <form className="assign-form" onSubmit={addAssignment}>
        <input
          className="text-input"
          placeholder="Assignment title (e.g. Week 3: Civil Rights)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <select
          className="text-input"
          value={form.target}
          onChange={(e) => setForm({ ...form, target: e.target.value })}
        >
          {MYSTERIES.map((m) => (
            <option key={m.id} value={m.id}>
              Mystery: {m.title}
            </option>
          ))}
          {ERAS.map((era) => (
            <option key={era.id} value={`era:${era.id}`}>
              Era: {era.name}
            </option>
          ))}
        </select>
        <input
          className="text-input"
          type="date"
          value={form.due}
          onChange={(e) => setForm({ ...form, due: e.target.value })}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
      {assignments.length > 0 && (
        <ul className="assign-list">
          {assignments.map((a) => (
            <li key={a.id}>
              <strong>{a.title}</strong> {a.due && <span className="muted">· due {a.due}</span>}
              <button
                className="link-btn"
                onClick={() => persist(assignments.filter((x) => x.id !== a.id))}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="section-label">Printable worksheet</h3>
      <div className="worksheet-controls no-print">
        <select
          className="text-input"
          value={worksheet}
          onChange={(e) => setWorksheet(e.target.value)}
        >
          {MYSTERIES.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={() => window.print()}>
          🖨️ Print worksheet
        </button>
      </div>

      <div className="worksheet" id="worksheet">
        <h2>LegacyQuest Worksheet</h2>
        <h3>{mystery.title}</h3>
        <p>{mystery.brief}</p>
        <h4>Evidence to consider</h4>
        <ol>
          {mystery.clues.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ol>
        <h4>Question</h4>
        <p>{mystery.question}</p>
        <ol type="A">
          {mystery.choices.map((c) => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ol>
        <h4>Discussion questions</h4>
        <ol>
          {DISCUSSION.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ol>
        <p className="worksheet-name-line">Name: ______________________________ Date: ____________</p>
      </div>
    </div>
  )
}
