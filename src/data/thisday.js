// "This Day in Black History" — verified events keyed by MM-DD. If today has an
// exact match it's featured as "This Day"; otherwise a deterministic featured
// event is shown, always labeled with its true date so nothing is misdated.

export const THIS_DAY = {
  '01-15': { year: 1929, text: 'Dr. Martin Luther King Jr. was born in Atlanta, Georgia.' },
  '02-01': {
    year: 1960,
    text: 'Four students began the Greensboro sit-in at a segregated Woolworth’s lunch counter, sparking a wave of sit-ins across the South.',
  },
  '02-03': {
    year: 1870,
    text: 'The Fifteenth Amendment was ratified, barring denial of the vote based on race.',
  },
  '02-23': { year: 1868, text: 'Scholar and NAACP co-founder W. E. B. Du Bois was born.' },
  '03-07': {
    year: 1965,
    text: '“Bloody Sunday”: marchers were attacked crossing the Edmund Pettus Bridge in Selma, Alabama, galvanizing support for voting rights.',
  },
  '04-04': { year: 1968, text: 'Dr. Martin Luther King Jr. was assassinated in Memphis, Tennessee.' },
  '04-15': {
    year: 1947,
    text: 'Jackie Robinson debuted for the Brooklyn Dodgers, breaking Major League Baseball’s color line.',
  },
  '05-17': {
    year: 1954,
    text: 'The Supreme Court decided Brown v. Board of Education, ruling school segregation unconstitutional.',
  },
  '06-19': {
    year: 1865,
    text: 'Juneteenth: enslaved people in Galveston, Texas, learned they were free, two and a half years after the Emancipation Proclamation.',
  },
  '07-02': { year: 1964, text: 'President Johnson signed the Civil Rights Act of 1964 into law.' },
  '07-16': {
    year: 1862,
    text: 'Journalist and anti-lynching crusader Ida B. Wells was born in Holly Springs, Mississippi.',
  },
  '08-06': { year: 1965, text: 'President Johnson signed the Voting Rights Act of 1965.' },
  '08-28': {
    year: 1963,
    text: 'At the March on Washington, Dr. King delivered his “I Have a Dream” speech to some 250,000 people.',
  },
  '10-16': { year: 1995, text: 'The Million Man March gathered in Washington, D.C.' },
  '11-04': { year: 2008, text: 'Barack Obama was elected the first Black President of the United States.' },
  '12-01': {
    year: 1955,
    text: 'Rosa Parks was arrested in Montgomery, Alabama, for refusing to give up her bus seat.',
  },
  '12-05': { year: 1955, text: 'The Montgomery Bus Boycott began.' },
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Returns { exact, dateLabel, year, text } for a given date.
export function featuredForDate(date = new Date()) {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const key = `${mm}-${dd}`

  if (THIS_DAY[key]) {
    return {
      exact: true,
      dateLabel: `${MONTHS[date.getMonth()]} ${date.getDate()}, ${THIS_DAY[key].year}`,
      ...THIS_DAY[key],
    }
  }

  // No exact match: pick a deterministic featured event and label it truthfully.
  const keys = Object.keys(THIS_DAY)
  const dayIndex = Math.floor(date.getTime() / 86_400_000)
  const chosenKey = keys[dayIndex % keys.length]
  const [cm, cd] = chosenKey.split('-')
  const ev = THIS_DAY[chosenKey]
  return {
    exact: false,
    dateLabel: `${MONTHS[Number(cm) - 1]} ${Number(cd)}, ${ev.year}`,
    ...ev,
  }
}

// Stable id for "claimed the bonus for this featured event today".
export function featuredId(date = new Date()) {
  const f = featuredForDate(date)
  return `${String(date.getFullYear())}-${f.dateLabel}`
}
