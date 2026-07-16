// History Mysteries — investigations the player solves by collecting clues,
// interviewing figures, and choosing the correct conclusion. Each mystery is
// built on verified events. `answerId` marks the historically correct choice;
// distractors are plausible-but-wrong to reward real understanding.

export const MYSTERIES = [
  {
    id: 'montgomery-bus-boycott',
    era: 'civil-rights',
    title: 'Who Sparked the Montgomery Bus Boycott?',
    reward: 35,
    brief:
      'December 1955, Montgomery, Alabama. The city’s buses sit empty. A year-long boycott has begun — but who set it in motion, and how did an entire community stay off the buses for 381 days?',
    briefSimple:
      'Montgomery, Alabama, 1955. Black riders have stopped riding the buses to protest unfair rules. Who started it — and how did they keep it going for 381 days?',
    clues: [
      'On December 1, 1955, a seamstress and NAACP secretary refused to give up her seat to a white passenger and was arrested.',
      'Local activist Jo Ann Robinson and the Women’s Political Council printed and distributed tens of thousands of leaflets overnight calling for a one-day boycott.',
      'The Montgomery Improvement Association was formed to lead the protest, and its members elected a young, newly arrived pastor as president.',
      'Carpools, Black-owned taxis, and miles of walking sustained the boycott for 381 days.',
      'In November 1956, the U.S. Supreme Court in Browder v. Gayle affirmed that bus segregation was unconstitutional.',
    ],
    interviews: [
      {
        figure: 'Rosa Parks',
        line: '“People always say that I didn’t give up my seat because I was tired, but that isn’t true. The only tired I was, was tired of giving in.”',
      },
      {
        figure: 'Jo Ann Robinson',
        line: '“We had planned the protest long before. When the moment came, we were ready to act that very night.”',
      },
    ],
    question: 'Whose arrest became the catalyst that launched the boycott?',
    questionSimple: 'Whose arrest started the bus boycott?',
    choices: [
      { id: 'a', text: 'Rosa Parks, arrested December 1, 1955' },
      { id: 'b', text: 'Claudette Colvin, arrested earlier in March 1955' },
      { id: 'c', text: 'Jo Ann Robinson' },
      { id: 'd', text: 'E. D. Nixon' },
    ],
    answerId: 'a',
    explanation:
      'Rosa Parks’s arrest on December 1, 1955 was the immediate catalyst. Fifteen-year-old Claudette Colvin had been arrested months earlier and was a plaintiff in Browder v. Gayle, but organizers rallied the community around Parks. The boycott was sustained by Jo Ann Robinson’s leaflets, E. D. Nixon’s organizing, and the Montgomery Improvement Association led by Dr. Martin Luther King Jr.',
    unlocks: 'letter-mia',
  },
  {
    id: 'underground-railroad',
    era: 'reconstruction',
    title: 'How Did the Underground Railroad Operate?',
    reward: 35,
    brief:
      'It was neither underground nor a railroad. So how did thousands of enslaved people find their way to freedom through a network hidden in plain sight?',
    briefSimple:
      'The Underground Railroad was not a real train. It was a secret team of brave people helping others escape to freedom. How did it work?',
    clues: [
      'The “railroad” used railway code: guides were “conductors,” safe houses were “stations,” and escapees were “passengers” or “cargo.”',
      'Routes ran mostly north toward free states and Canada, but some led south to Mexico and the Caribbean.',
      'Free and enslaved Black people, Quakers, and other abolitionists sheltered travelers, often moving them at night.',
      'Harriet Tubman made about 13 trips back into slave territory, guiding roughly 70 people to freedom.',
      'Spirituals and quilts are part of oral tradition about signaling, though historians debate how literally coded messages were used.',
    ],
    interviews: [
      {
        figure: 'Harriet Tubman',
        line: '“I always told God, I’m going to hold steady on to you, and you’ve got to see me through.”',
      },
      {
        figure: 'William Still',
        line: '“I kept careful records of every passenger, so that families separated by slavery might one day find each other again.”',
      },
    ],
    question: 'In the network’s code, what was a “station”?',
    questionSimple: 'In the secret code, what was a “station”?',
    choices: [
      { id: 'a', text: 'A guide who led people north' },
      { id: 'b', text: 'A safe house where escapees could rest and hide' },
      { id: 'c', text: 'A message hidden in a spiritual' },
      { id: 'd', text: 'The Canadian border crossing' },
    ],
    answerId: 'b',
    explanation:
      'A “station” was a safe house. “Conductors” like Harriet Tubman guided “passengers” between stations run by “stationmasters.” William Still, the “Father of the Underground Railroad,” documented hundreds of escapes in Philadelphia so separated families could reunite.',
    unlocks: 'diagram-railroad',
  },
  {
    id: 'hidden-inventor',
    era: 'space-age',
    title: 'Which Inventor Made the Traffic Signal Safer?',
    reward: 30,
    brief:
      'Early traffic signals had only “stop” and “go” — and deadly accidents in between. An inventor witnessed a collision and set out to fix it. Who was it?',
    briefSimple:
      'Long ago, traffic lights only said “stop” and “go,” and crashes kept happening. One inventor fixed it. Who was he?',
    clues: [
      'The inventor also created an early gas mask (safety hood) used by firefighters and in World War I.',
      'After witnessing a crash between a car and a carriage, he designed a signal with a third, warning position.',
      'He patented the three-position traffic signal in 1923 and later sold the rights to General Electric.',
      'He was a successful Black businessman in Cleveland, Ohio, and published a newspaper for the Black community.',
    ],
    interviews: [
      {
        figure: 'Garrett Morgan',
        line: '“If a man puts something to use that saves lives, he has done a service that outlasts him.”',
      },
    ],
    question: 'Who patented the three-position traffic signal in 1923?',
    questionSimple: 'Who invented the three-light traffic signal?',
    choices: [
      { id: 'a', text: 'Lewis Latimer' },
      { id: 'b', text: 'Granville Woods' },
      { id: 'c', text: 'Garrett Morgan' },
      { id: 'd', text: 'Elijah McCoy' },
    ],
    answerId: 'c',
    explanation:
      'Garrett Morgan patented the three-position traffic signal in 1923, adding a warning position between “stop” and “go.” He also invented an early gas mask. Latimer improved the lightbulb filament, Granville Woods held dozens of electrical patents, and Elijah McCoy invented an automatic lubricator — each a major inventor in his own right.',
    unlocks: 'patent-signal',
  },
]
