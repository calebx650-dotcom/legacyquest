// Rosa Parks — the Keeper's guide. Not a fictional companion riding along on
// an invented adventure: she is who the game keeps asking you to remember,
// framing the journey in her own voice. Every line here is a paraphrase
// grounded in her documented life and words (quiet, deliberate courage;
// steadiness; dignity; community) — nothing sci-fi or invented is put in
// her mouth.

export const GUIDE = {
  id: 'rosa-parks',
  name: 'Rosa Parks',
  short: 'Rosa',
  role: '1913–2005 · Civil rights leader, your guide through the timeline',
  intro:
    'I only ever did what I believed was right. Every era on this path was shaped by someone who did the same — that is what you are here to remember.',
}

// Route-aware tips so Rosa feels present wherever you are, without ever
// slipping into invented game-world jargon.
export const GUIDE_TIPS = {
  '/': [
    'Every era here holds someone who refused to be erased. Where will you stand today?',
    'People say I kept my seat because I was tired. I was tired of giving in — that is different.',
    'One decision, kept steady, can move history. Restore an era and see whose it was.',
  ],
  '/daily': [
    'Change rarely comes all at once. It comes from showing up again the next day, and the day after.',
    'A streak is just steadiness with a name. Keep yours.',
  ],
  '/mysteries': [
    'Ask who was left out of the record, and why — that question is most of the work.',
    'Evidence, patience, and a refusal to look away: that is how the truth gets found.',
  ],
  '/puzzles': [
    'Some problems only give way to people who keep at them quietly, without an audience.',
    'Take your time. Careful thinking outlasts a rushed answer.',
  ],
  '/museum': [
    'Every artifact here is something someone once tried to take out of the story. Now it is back.',
    'I want to be remembered as someone who wanted freedom for others, too. That is what this room is.',
  ],
  '/eras': [
    'Pick an era and listen for the names history tried to leave out.',
    'Every one of these times needed someone willing to stay steady. Go meet them.',
  ],
  default: [
    'You have the right to be treated with dignity — so does everyone whose story is in this app.',
    'I kept my seat because it was right, not because it was easy. Keep going the same way.',
    'The work of remembering does not end with any one action. Stay with it.',
  ],
}

export function guideTip(path, seed = Date.now()) {
  const pool = GUIDE_TIPS[path] || GUIDE_TIPS.default
  return pool[Math.floor(seed / 30000) % pool.length]
}
