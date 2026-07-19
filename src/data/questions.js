// Question bank for Defend the Timeline. Every question restates a fact that
// already appears (verified) elsewhere in the game's content, tagged by era.
// `a` is the index of the correct option.

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
  // Transatlantic Slave Trade
  {
    era: 'slave-trade',
    q: 'Whose 1789 autobiography became a bestseller and fueled the abolition movement?',
    options: ['Frederick Douglass', 'Olaudah Equiano', 'William Still', 'Sojourner Truth'],
    a: 1,
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
  // Black Wall Street
  {
    era: 'black-wall-street',
    q: 'The prosperous Greenwood district of Tulsa was known as what?',
    options: ['Sweet Auburn', 'Bronzeville', 'Black Wall Street', 'The Gold Coast'],
    a: 2,
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
  // Afrofuturism
  {
    era: 'afrofuturism',
    q: 'Which science-fiction author is a central figure of Afrofuturism?',
    options: ['Octavia Butler', 'Isaac Asimov', 'Ursula K. Le Guin', 'Ray Bradbury'],
    a: 0,
  },
]

// Questions for an era, padded with general questions if the era has few.
export function questionsForEra(eraId, count = 8) {
  const own = QUESTIONS.filter((q) => q.era === eraId)
  const rest = QUESTIONS.filter((q) => q.era !== eraId)
  return [...own, ...rest].slice(0, count)
}
