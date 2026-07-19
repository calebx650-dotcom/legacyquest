// Cinematic onboarding script. A short comic-panel sequence establishes the
// stakes and names the player a Legacy Keeper — hosted by Rosa Parks, who
// then walks through how the game actually works before handing off to
// Harriet Tubman for a quick guided first mission that unlocks the first
// artifact. All in three to four minutes.

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
      speaker: 'Rosa Parks',
      photo: 'rosa-parks',
      kicker: 'A guide steps forward',
      title: 'You are named a Legacy Keeper.',
      text: '“I am Rosa Parks. I did not set out to change history — I only refused to give up my seat, and kept refusing. Every Legacy Keeper starts the same way: one choice, held steady. Let me show you how this works.”',
    },
  ],

  // Rosa Parks explains the actual game systems in plain terms before
  // handing off to the first mission — the "get started" walkthrough.
  mechanics: {
    speaker: 'Rosa Parks',
    accent: '#e9b949',
    title: 'How this journey works',
    intro:
      '“This is not a story you only read — it is one you take part in. Here is what you will find along the way.”',
    items: [
      {
        icon: 'compass',
        name: 'Quest Path',
        text: 'One trail through history, era by era. Every stop is a real story, a puzzle, or a timeline to defend.',
      },
      {
        icon: 'shield',
        name: 'Defend the Timeline',
        text: 'Answer correctly to push back the Eraser. Every right answer is ground you take back for the record.',
      },
      {
        icon: 'coin',
        name: 'Coins & XP',
        text: 'Earn coins and experience for what you learn. Coins restore eras; XP raises your level as a Keeper.',
      },
      {
        icon: 'flame',
        name: 'Daily streaks',
        text: 'Return each day and your streak grows. Steadiness is the whole point — small, kept promises.',
      },
      {
        icon: 'frame',
        name: 'Legacy Museum',
        text: 'Every artifact you recover is kept here — proof of a story the record almost lost.',
      },
    ],
    outro: '“That is the whole of it. Now — let us take the first one back, together.”',
  },

  // The guided first mission: a single, gentle decision so a new player
  // succeeds, handed off from Rosa Parks to Harriet Tubman.
  mission: {
    speaker: 'Harriet Tubman',
    transition:
      '“Come. I’ll show you the way.” Rosa asked me to walk you through the first one myself — I led hundreds to freedom by night, and I never lost a passenger.',
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

  outroTruth:
    'The Eraser is fiction. The erasing has been real — for generations, stories like these were kept out of textbooks and headlines. Keeping them alive is the whole quest.',

  outro: {
    art: '⭐',
    accent: '#f4b942',
    speaker: 'Rosa Parks',
    photo: 'rosa-parks',
    title: 'Your first memory is restored.',
    text: '“That is how it is done, Keeper — one story, kept steady, at a time. I only ever refused to give up my seat. You are refusing to let these stories be taken. Go on, and bring the rest of them back.”',
  },
}
