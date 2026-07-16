// Professor Sankofa — the player's mascot and constant partner. A brilliant,
// wild-haired Black physicist who built the Chrono-Compass that lets Legacy
// Keepers travel the timeline. He is fictional (an original character); the
// history he points you toward is real. His name comes from the Akan principle
// "sankofa" — go back and get it.

export const MASCOT = {
  id: 'prof-sankofa',
  name: 'Professor Sankofa',
  short: 'Prof. S',
  role: 'Chrono-physicist · your time-travel partner',
  intro:
    'I built the Chrono-Compass, and I’ve seen what the Eraser does to unguarded memories. Stay close, Keeper — history needs both of us.',
}

// Route-aware tips so the Professor feels present wherever you are.
export const MASCOT_TIPS = {
  '/': [
    'Every era we restore makes the timeline stronger. Where to today, Keeper?',
    'My Chrono-Compass is humming — something on this timeline wants to be found.',
    'E = mc²? Pah. Energy equals memory times courage, squared.',
  ],
  '/daily': [
    'A fact a day keeps the Eraser away. Truly — I ran the numbers.',
    'Streaks bend spacetime in our favor. Don’t break the chain!',
  ],
  '/mysteries': [
    'Evidence first, verdict second — that’s the scientific method, Keeper.',
    'Interview everyone. The quiet voices often carry the loudest truth.',
  ],
  '/puzzles': [
    'Puzzles are just equations wearing costumes. You’ve got this.',
    'When I’m stuck, I swap two pieces and see what the universe says.',
  ],
  '/museum': [
    'Careful with that artifact — it’s older than both of us combined. Well… older than you.',
    'Every exhibit here is a memory the Eraser failed to take. Beautiful, isn’t it?',
  ],
  '/eras': [
    'Pick an era and hold on — the Chrono-Compass gets bumpy past 1900.',
    'Time isn’t a line, Keeper. It’s a quilt. We’re re-stitching it.',
  ],
  default: [
    'Curiosity is the strongest force in physics. Trust me, I’ve measured.',
    'Go back and get it — that’s what my name means, and that’s what we do.',
    'The Eraser fears one thing: a Keeper who keeps showing up.',
  ],
}

export function mascotTip(path, seed = Date.now()) {
  const pool = MASCOT_TIPS[path] || MASCOT_TIPS.default
  return pool[Math.floor(seed / 30000) % pool.length]
}
