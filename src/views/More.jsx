// More — everything beyond the five core tabs, grouped for discovery. Keeps
// the main navigation game-simple while nothing is lost.

import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui.jsx'
import { GameIcon } from '../components/icons.jsx'

const GROUPS = [
  {
    label: 'More ways to play',
    items: [
      { to: '/quests', label: 'Quests', icon: '🎯', blurb: 'Daily and weekly goals' },
      { to: '/events', label: 'Events', icon: '🎁', blurb: 'Double XP and artifact hunts' },
      { to: '/mysteries', label: 'History Mysteries', icon: '🕵️', blurb: 'Full case library' },
      { to: '/stories', label: 'Narrated Stories', icon: '📖', blurb: 'Branching perspectives' },
      { to: '/puzzles', label: 'Puzzle Lab', icon: '🧩', blurb: 'All puzzle modes' },
      { to: '/culture', label: 'Culture Journey', icon: '🎵', blurb: 'Music through history' },
      { to: '/community', label: 'Community Builder', icon: '🏙️', blurb: 'Rebuild Greenwood' },
      { to: '/mentors', label: 'Mentors', icon: '⚔️', blurb: 'Recruit your guides' },
      { to: '/eras', label: 'Eras', icon: '🧭', blurb: 'The full timeline' },
      { to: '/hall', label: 'Keeper’s Hall', icon: '🏛️', blurb: 'Classic dashboard' },
    ],
  },
  {
    label: 'Compete',
    items: [
      { to: '/leaderboards', label: 'Leaderboards & Seasons', icon: '🏆', blurb: 'Rankings and challenges' },
    ],
  },
  {
    label: 'Classroom & tools',
    items: [
      { to: '/teacher', label: 'Teacher Mode', icon: '🎓', blurb: 'Worksheets and reports' },
      { to: '/analytics', label: 'Analytics', icon: '📊', blurb: 'On-device metrics' },
      { to: '/studio', label: 'Content Studio', icon: '🛠️', blurb: 'Add your own content' },
      { to: '/offline', label: 'Offline & Packs', icon: '📥', blurb: 'Play without internet' },
      { to: '/account', label: 'Account & Sync', icon: '👤', blurb: 'Move your save' },
    ],
  },
]

export default function More() {
  return (
    <div className="view">
      <PageHeader
        icon="🛠️"
        title="More"
        subtitle="Everything beyond the main path: extra game modes, competition, and classroom tools."
      />
      {GROUPS.map((g) => (
        <section key={g.label}>
          <h3 className="section-label">{g.label}</h3>
          <div className="grid grid-more">
            {g.items.map((it) => (
              <Link key={it.to} to={it.to} className="more-card">
                <span className="more-icon">
                  <GameIcon glyph={it.icon} size={22} />
                </span>
                <span className="more-body">
                  <span className="more-label">{it.label}</span>
                  <span className="more-blurb">{it.blurb}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
