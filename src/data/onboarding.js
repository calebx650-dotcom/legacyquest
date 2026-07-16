// Cinematic onboarding script. A short comic-panel sequence that establishes the
// stakes, names the player a Legacy Keeper, introduces Harriet Tubman as guide,
// and ends with a quick guided mission that unlocks the first artifact — all in
// two to three minutes.

export const ONBOARDING = {
  rewardArtifact: 'north-star-map',
  rewardXp: 60,
  rewardPoints: 35,

  scenes: [
    {
      id: 's1',
      art: '🌑',
      accent: '#8a5a3b',
      anim: 'zoom',
      kicker: 'The timeline is unraveling',
      title: 'Something is erasing history.',
      text: 'One by one, names fade from the record. Inventions vanish. Speeches fall silent. A force the archives call The Eraser is unmaking Black history — page by page.',
    },
    {
      id: 's2',
      art: '📖',
      accent: '#e05a3b',
      anim: 'flicker',
      kicker: 'Memories going dark',
      title: 'Whole stories are disappearing.',
      text: 'A patent here. A front page there. A song no one can quite remember. If nothing is done, the people who built so much of the world will be forgotten entirely.',
    },
    {
      id: 's3',
      art: '🔥',
      accent: '#f4b942',
      anim: 'rise',
      speaker: 'Professor Sankofa',
      kicker: 'A light is chosen',
      title: 'You are named a Legacy Keeper.',
      text: '“I’m Professor Sankofa — I built the Chrono-Compass that carries Keepers through time. It just chose you. Every artifact we recover together is a memory saved from the dark.”',
    },
    {
      id: 's4',
      art: '🧭',
      accent: '#2ea36b',
      anim: 'parallax',
      speaker: 'Harriet Tubman',
      kicker: 'A guide steps forward',
      title: '“Come. I’ll show you the way.”',
      text: '“I led hundreds to freedom by night, and I never lost a passenger. Your first task is simple: read the sky the way we did, and take your first memory back from the dark.”',
    },
  ],

  // The guided first mission: a single, gentle decision so a new player succeeds.
  mission: {
    speaker: 'Harriet Tubman',
    setup:
      'Freedom-seekers moving north at night had no map and no compass. They followed a pattern of stars in the sky — a “drinking gourd.” Its two pointer stars line up on the star that never moves.',
    question: 'Which star did the Drinking Gourd point toward — the one that guided the way north?',
    options: [
      { id: 'a', text: 'The North Star (Polaris)' },
      { id: 'b', text: 'The Morning Star' },
      { id: 'c', text: 'The brightest star, Sirius' },
    ],
    answerId: 'a',
    correct:
      'Exactly. The Drinking Gourd is the Big Dipper; its pointer stars lead to Polaris, the North Star — a fixed guide north to free states and Canada.',
    wrong:
      'Not quite — but keep looking. The gourd’s pointer stars always lead to the one star that never moves in the sky.',
  },

  outro: {
    art: '⭐',
    accent: '#f4b942',
    speaker: 'Harriet Tubman',
    title: 'Your first memory is restored.',
    text: '“You’ve recovered the North Star Map. This is how it’s done, Keeper — one story, one light, at a time. The rest of history is waiting. Go and bring it back.”',
  },
}
