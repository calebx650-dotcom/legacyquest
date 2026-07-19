// Question bank for Defend the Timeline. Every question restates a fact that
// already appears (verified) elsewhere in the game's content, tagged by era.
// `a` is the index of the correct option. Each era carries at least four
// dedicated questions so a round stays on-topic without needing much padding
// from other eras (Defend.jsx shuffles both selection and order per attempt).

export const QUESTIONS = [
  // Ancient African Civilizations
  {
    era: 'ancient-africa',
    q: 'Which city was a famous center of learning and manuscripts in the Mali Empire?',
    options: ['Timbuktu', 'Cairo', 'Lagos', 'Carthage'],
    a: 0,
  },
  {
    era: 'ancient-africa',
    q: 'Mansa Musa, famed for his wealth and pilgrimage, ruled which empire?',
    options: ['The Songhai Empire', 'The Mali Empire', 'The Kingdom of Kush', 'The Zulu Kingdom'],
    a: 1,
  },
  {
    era: 'ancient-africa',
    q: 'The ancient Kingdom of Kush, a major rival and sometime ruler of Egypt, was centered along which river?',
    options: ['The Niger', 'The Congo', 'The Nile', 'The Zambezi'],
    a: 2,
  },
  {
    era: 'ancient-africa',
    q: 'Timbuktu’s Sankoré center was famous for what?',
    options: ['Iron smelting', 'A university and manuscript libraries', 'Naval shipbuilding', 'Gold minting only'],
    a: 1,
  },
  {
    era: 'ancient-africa',
    q: 'Which good made the Mali Empire, and Mansa Musa in particular, extraordinarily wealthy?',
    options: ['Gold and salt trade', 'Silk production', 'Whale oil', 'Coffee export'],
    a: 0,
  },
  // Transatlantic Slave Trade
  {
    era: 'slave-trade',
    q: 'Whose 1789 autobiography became a bestseller and fueled the abolition movement?',
    options: ['Frederick Douglass', 'Olaudah Equiano', 'William Still', 'Sojourner Truth'],
    a: 1,
  },
  {
    era: 'slave-trade',
    q: 'Communities of people who had escaped slavery and formed independent settlements were known as what?',
    options: ['Maroon communities', 'Free towns', 'Liberty ports', 'Freedmen’s colonies'],
    a: 0,
  },
  {
    era: 'slave-trade',
    q: 'Roughly how long did the transatlantic slave trade span?',
    options: ['About 40 years', 'About 100 years', 'About four centuries', 'About one decade'],
    a: 2,
  },
  {
    era: 'slave-trade',
    q: 'Olaudah Equiano’s narrative was especially influential in which country’s abolition movement?',
    options: ['Britain', 'Spain', 'Portugal', 'The Netherlands'],
    a: 0,
  },
  // Reconstruction
  {
    era: 'reconstruction',
    q: 'On the Underground Railroad, what was a "station"?',
    options: [
      'A guide who led people north',
      'A safe house where escapees could rest and hide',
      'A coded song',
      'A border crossing',
    ],
    a: 1,
  },
  {
    era: 'reconstruction',
    q: 'Who became the first Black U.S. Senator in 1870?',
    options: ['Frederick Douglass', 'Hiram Revels', 'Blanche Bruce', 'John Lewis'],
    a: 1,
  },
  {
    era: 'reconstruction',
    q: 'The "Drinking Gourd" pointed freedom-seekers toward which star?',
    options: ['Sirius', 'The Morning Star', 'The North Star', 'The Southern Cross'],
    a: 2,
  },
  {
    era: 'reconstruction',
    q: 'About how many people did Harriet Tubman personally guide to freedom?',
    options: ['About 12', 'About 70', 'About 700', 'About 7,000'],
    a: 1,
  },
  {
    era: 'reconstruction',
    q: 'Which amendment abolished slavery in the United States?',
    options: ['The 13th Amendment', 'The 14th Amendment', 'The 15th Amendment', 'The 19th Amendment'],
    a: 0,
  },
  {
    era: 'reconstruction',
    q: 'Roughly how many Black men held public office during Reconstruction before the era was rolled back?',
    options: ['About 20', 'About 200', 'About 2,000', 'About 20,000'],
    a: 2,
  },
  // Black Wall Street
  {
    era: 'black-wall-street',
    q: 'The prosperous Greenwood district of Tulsa was known as what?',
    options: ['Sweet Auburn', 'Bronzeville', 'Black Wall Street', 'The Gold Coast'],
    a: 2,
  },
  {
    era: 'black-wall-street',
    q: 'What destroyed most of Greenwood in 1921?',
    options: ['A hurricane', 'A white mob in the Tulsa Race Massacre', 'A fire started by lightning', 'A stock market crash'],
    a: 1,
  },
  {
    era: 'black-wall-street',
    q: 'What kind of business did Greenwood residents NOT commonly own and run in the district?',
    options: ['Newspapers', 'Theaters', 'A national stock exchange', 'Hotels'],
    a: 2,
  },
  {
    era: 'black-wall-street',
    q: 'In what U.S. state was Greenwood located?',
    options: ['Oklahoma', 'Georgia', 'Louisiana', 'Alabama'],
    a: 0,
  },
  // Harlem Renaissance
  {
    era: 'harlem-renaissance',
    q: 'Which New York neighborhood was the heart of the 1920s Black cultural renaissance?',
    options: ['Brooklyn Heights', 'Harlem', 'The Bronx', 'Greenwich Village'],
    a: 1,
  },
  {
    era: 'harlem-renaissance',
    q: 'Which dance was born at Harlem’s Savoy Ballroom?',
    options: ['The Charleston', 'The Lindy Hop', 'The Twist', 'The Waltz'],
    a: 1,
  },
  {
    era: 'harlem-renaissance',
    q: 'The Harlem Renaissance was primarily a flowering of what?',
    options: ['Literature, art, and music', 'Shipbuilding technology', 'Agricultural science', 'Banking regulation'],
    a: 0,
  },
  {
    era: 'harlem-renaissance',
    q: 'Which decade is most associated with the height of the Harlem Renaissance?',
    options: ['The 1890s', 'The 1920s', 'The 1950s', 'The 1980s'],
    a: 1,
  },
  // Great Migration
  {
    era: 'great-migration',
    q: 'Roughly how many Black Americans left the South during the Great Migration?',
    options: ['Six hundred thousand', 'One million', 'Six million', 'Sixty million'],
    a: 2,
  },
  {
    era: 'great-migration',
    q: 'Who became one of America’s first self-made women millionaires through her hair-care company?',
    options: ['Ida B. Wells', 'Madam C. J. Walker', 'Bessie Coleman', 'Mary McLeod Bethune'],
    a: 1,
  },
  {
    era: 'great-migration',
    q: 'The Great Migration mainly moved Black Americans from the rural South to which kinds of places?',
    options: ['Cities in the North, Midwest, and West', 'Rural Canada', 'The Caribbean', 'Western Europe'],
    a: 0,
  },
  {
    era: 'great-migration',
    q: 'Which Chicago neighborhood grew as a major destination during the Great Migration?',
    options: ['Bronzeville', 'Sweet Auburn', 'Greenwood', 'The Hill District'],
    a: 0,
  },
  // WWII
  {
    era: 'wwii',
    q: 'What were the first Black military aviators in the U.S. Army Air Forces called?',
    options: ['The Red Tails Club', 'The Tuskegee Airmen', 'The Harlem Hellfighters', 'The Night Witches'],
    a: 1,
  },
  {
    era: 'wwii',
    q: 'The all-Black 761st Tank Battalion carried what nickname?',
    options: ['The Black Panthers', 'The Buffalo Soldiers', 'The Iron Men', 'The Trailblazers'],
    a: 0,
  },
  {
    era: 'wwii',
    q: 'The wartime "Double V" campaign demanded victory over fascism abroad and what at home?',
    options: ['Higher wages', 'Racism', 'Shorter work weeks', 'Lower taxes'],
    a: 1,
  },
  {
    era: 'wwii',
    q: 'About how many days did the 761st Tank Battalion fight across Europe?',
    options: ['18 days', '183 days', '18 months', '3 days'],
    a: 1,
  },
  // Civil Rights
  {
    era: 'civil-rights',
    q: 'Whose arrest on December 1, 1955 sparked the Montgomery Bus Boycott?',
    options: ['Claudette Colvin', 'Jo Ann Robinson', 'Rosa Parks', 'Coretta Scott King'],
    a: 2,
  },
  {
    era: 'civil-rights',
    q: 'How long did the Montgomery Bus Boycott last?',
    options: ['38 days', '181 days', '381 days', '3 years'],
    a: 2,
  },
  {
    era: 'civil-rights',
    q: 'Who delivered the "I Have a Dream" speech at the 1963 March on Washington?',
    options: ['John Lewis', 'Dr. Martin Luther King Jr.', 'Thurgood Marshall', 'Malcolm X'],
    a: 1,
  },
  {
    era: 'civil-rights',
    q: 'Which Supreme Court case ruled school segregation unconstitutional in 1954?',
    options: ['Brown v. Board of Education', 'Plessy v. Ferguson', 'Browder v. Gayle', 'Loving v. Virginia'],
    a: 0,
  },
  {
    era: 'civil-rights',
    q: 'In what year was the Voting Rights Act signed into law?',
    options: ['1954', '1963', '1965', '1972'],
    a: 2,
  },
  // Space Age
  {
    era: 'space-age',
    q: 'Which NASA mathematician did John Glenn ask to verify his orbit calculations in 1962?',
    options: ['Dorothy Vaughan', 'Katherine Johnson', 'Mary Jackson', 'Mae Jemison'],
    a: 1,
  },
  {
    era: 'space-age',
    q: 'Who patented the three-position traffic signal in 1923?',
    options: ['Lewis Latimer', 'Elijah McCoy', 'Granville Woods', 'Garrett Morgan'],
    a: 3,
  },
  {
    era: 'space-age',
    q: 'Katherine Johnson received the Presidential Medal of Freedom in what year?',
    options: ['1962', '1983', '2015', '2020'],
    a: 2,
  },
  {
    era: 'space-age',
    q: 'What third position did Garrett Morgan add to the traffic signal?',
    options: ['A left-turn arrow', 'A warning position between stop and go', 'A pedestrian countdown', 'A siren'],
    a: 1,
  },
  // Modern innovators
  {
    era: 'modern-innovators',
    q: 'Who became the first Black woman to travel to space, aboard Endeavour in 1992?',
    options: ['Mae Jemison', 'Bessie Coleman', 'Katherine Johnson', 'Sally Ride'],
    a: 0,
  },
  {
    era: 'modern-innovators',
    q: 'Who was the first Black woman elected to the U.S. Congress, in 1968?',
    options: ['Barbara Jordan', 'Shirley Chisholm', 'Fannie Lou Hamer', 'Angela Davis'],
    a: 1,
  },
  {
    era: 'modern-innovators',
    q: 'Dr. Patricia Bath is known for pioneering a laser device used to treat what?',
    options: ['Cataracts', 'Broken bones', 'Heart arrhythmia', 'Hearing loss'],
    a: 0,
  },
  {
    era: 'modern-innovators',
    q: 'Mae Jemison, in addition to being an astronaut, trained in which fields?',
    options: ['Physician and engineer', 'Lawyer and pilot', 'Architect and chef', 'Historian and diver'],
    a: 0,
  },
  // Afrofuturism
  {
    era: 'afrofuturism',
    q: 'Which science-fiction author is a central figure of Afrofuturism?',
    options: ['Octavia Butler', 'Isaac Asimov', 'Ursula K. Le Guin', 'Ray Bradbury'],
    a: 0,
  },
  {
    era: 'afrofuturism',
    q: 'Afrofuturism blends African diasporic culture with which themes?',
    options: ['Science fiction and technology', 'Medieval knighthood', 'Ancient Rome', 'Arctic exploration'],
    a: 0,
  },
  {
    era: 'afrofuturism',
    q: 'Which cosmic jazz bandleader is an early touchstone of Afrofuturism?',
    options: ['Sun Ra', 'Duke Ellington', 'Louis Armstrong', 'W. C. Handy'],
    a: 0,
  },
  {
    era: 'afrofuturism',
    q: 'Musicians like George Clinton and Janelle Monáe are associated with Afrofuturism through what?',
    options: ['Sound and visual style imagining liberated futures', 'Classical opera composition', 'Country music', 'Gregorian chant'],
    a: 0,
  },
  {
    era: 'afrofuturism',
    q: 'Afrofuturism, at its core, reimagines history and technology to do what?',
    options: ['Envision liberated Black futures', 'Document only the distant past', 'Focus solely on European history', 'Avoid speculative fiction'],
    a: 0,
  },
]

// Fisher-Yates shuffle — returns a new array, does not mutate the input.
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Questions for an era: dedicated questions first (shuffled), padded with a
// shuffled sample from other eras only if the era doesn't have enough on its
// own. Called fresh each round, so both selection and order vary every play.
export function questionsForEra(eraId, count = 8) {
  const own = shuffle(QUESTIONS.filter((q) => q.era === eraId))
  if (own.length >= count) return own.slice(0, count)
  const rest = shuffle(QUESTIONS.filter((q) => q.era !== eraId))
  return [...own, ...rest].slice(0, count)
}
