// Explorer (kids) mode helpers. Explorer is a true kids mode: same real
// history, simpler sentences, read-aloud on by default, bigger touch targets
// (via [data-kids] CSS), and no lockouts — always another try.

export const isKidsMode = (state) => state.difficulty === 'explorer'

// Prefer the simple-language variant of a text when kids mode is on.
export const kidText = (state, normal, simple) =>
  isKidsMode(state) && simple ? simple : normal
