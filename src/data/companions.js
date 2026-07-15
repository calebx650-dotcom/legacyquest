// Companion tips. Any recruited mentor can be set as your active companion; they
// offer short, in-character guidance as you play. Tips are historically grounded
// nudges toward the mode that matches the mentor's specialty.

export const COMPANION_TIPS = {
  'harriet-tubman': [
    'Read the clues like the night sky, Keeper — patience finds the path.',
    'I never lost a passenger. Take the mysteries one careful step at a time.',
    'Courage is a habit. Return each day and your streak becomes strength.',
  ],
  'frederick-douglass': [
    'Power concedes nothing without a demand — interview every figure you meet.',
    'The pen shaped the fight. Visit the Culture Journey and hear how words moved people.',
    'Agitate, agitate, agitate — keep exploring the eras.',
  ],
  'katherine-johnson': [
    'Check the numbers twice. In the Puzzle Lab, order and precision win.',
    'There were no textbooks — so we wrote them. Try the Historian difficulty.',
    'Every trajectory starts with a single calculation. One quest at a time.',
  ],
  'madam-cj-walker': [
    'I gave myself a start — rebuild Greenwood and watch a community rise.',
    'Enterprise compounds. Spend Legacy Points where they build the most.',
    'Invest in people. The Community Builder is where legacies take root.',
  ],
  'ida-b-wells': [
    'Turn the light of truth upon them — gather every piece of evidence.',
    'The record matters. Recover documents and newspapers for the Museum.',
    'Facts, carefully kept, outlast the Eraser.',
  ],
}

export function tipFor(mentorId, seed = Date.now()) {
  const tips = COMPANION_TIPS[mentorId]
  if (!tips || tips.length === 0) return null
  return tips[Math.floor(seed / 20000) % tips.length]
}
