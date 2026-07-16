// Puzzle Lab — short, varied games. Five types are implemented:
//   match    : pair items across two columns (inventions ↔ inventors)
//   timeline : drag events into correct chronological order
//   decode   : substitute a simple cipher to reveal a message
//   jigsaw   : restore an Eraser-damaged historical photo by swapping tiles
//   memory   : flip-and-match pairs of mentor cards
// All content is factual; the timeline uses real, uncontested dates.

export const PUZZLES = [
  {
    id: 'inventors-match',
    type: 'match',
    title: 'Match the Inventor to the Invention',
    reward: 20,
    instructions: 'Pair each inventor with what they are credited for creating or improving.',
    pairs: [
      { left: 'Garrett Morgan', right: 'Three-position traffic signal (1923)' },
      { left: 'Lewis Latimer', right: 'Longer-lasting carbon lightbulb filament' },
      { left: 'Elijah McCoy', right: 'Automatic lubricator for steam engines' },
      { left: 'Dr. Patricia Bath', right: 'Laserphaco cataract-removal device' },
      { left: 'Granville Woods', right: 'Induction telegraph for moving trains' },
    ],
  },
  {
    id: 'civil-rights-timeline',
    type: 'timeline',
    title: 'Put the Civil Rights Milestones in Order',
    reward: 25,
    instructions: 'Arrange these landmark events from earliest to latest.',
    // Stored in correct order; the app shuffles them for play.
    events: [
      { label: 'Brown v. Board of Education', year: 1954 },
      { label: 'Montgomery Bus Boycott begins', year: 1955 },
      { label: 'March on Washington', year: 1963 },
      { label: 'Civil Rights Act signed', year: 1964 },
      { label: 'Voting Rights Act signed', year: 1965 },
    ],
  },
  {
    id: 'railroad-decode',
    type: 'decode',
    title: 'Decode the Underground Railroad Message',
    reward: 25,
    instructions:
      'This message uses a Caesar shift of 3 (each letter moved 3 places back: D→A, E→B …). Decode it to reveal the safe instruction.',
    // Plaintext: "FOLLOW THE DRINKING GOURD" (the Big Dipper, pointing to the North Star)
    cipher: 'IROORZ WKH GULQNLQJ JRXUG',
    shift: 3,
    answer: 'FOLLOW THE DRINKING GOURD',
    note: '“Follow the Drinking Gourd” refers to the Big Dipper, whose pointer stars indicate the North Star — a guide north to freedom.',
  },
  {
    id: 'photo-restore',
    type: 'jigsaw',
    title: 'Restore the Damaged Photograph',
    reward: 25,
    instructions:
      'The Eraser scrambled this portrait of Harriet Tubman. Tap two tiles to swap them until the photograph is whole again.',
    photo: 'harriet-tubman',
    caption: 'Harriet Tubman, photographed c. 1885 (public domain).',
    grid: 3,
  },
  {
    id: 'mentor-memory',
    type: 'memory',
    title: 'Mentor Memory Match',
    reward: 20,
    instructions: 'Flip the cards and match each pair of Legacy mentors.',
    pairs: [
      { id: 'tubman', icon: '🧭', label: 'Harriet Tubman' },
      { id: 'douglass', icon: '✒️', label: 'Frederick Douglass' },
      { id: 'johnson', icon: '🚀', label: 'Katherine Johnson' },
      { id: 'walker', icon: '🏢', label: 'Madam C. J. Walker' },
      { id: 'wells', icon: '📰', label: 'Ida B. Wells' },
      { id: 'morgan', icon: '🚦', label: 'Garrett Morgan' },
    ],
  },
]
