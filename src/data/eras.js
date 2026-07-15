// Historical eras the Legacy Keeper can travel to.
// `unlockCost` is in Legacy Points. The first era is free; later eras unlock
// as the player earns points, giving a sense of progression across the timeline.
//
// All descriptions are grounded in verified history. Dates are inclusive ranges
// commonly used by historians and are meant as orientation, not hard bounds.

export const ERAS = [
  {
    id: 'reconstruction',
    name: 'Reconstruction',
    years: '1865–1877',
    unlockCost: 0,
    accent: '#e05a3b',
    tagline: 'A nation remade — and the first Black members of Congress.',
    summary:
      'After the Civil War and the Thirteenth Amendment, formerly enslaved people built schools, churches, and political power. Hiram Revels became the first Black U.S. Senator in 1870, and roughly 2,000 Black men held public office before the era was rolled back.',
    figures: ['hiram-revels', 'frederick-douglass'],
  },
  {
    id: 'harlem-renaissance',
    name: 'Harlem Renaissance',
    years: '1918–1937',
    unlockCost: 40,
    accent: '#f4b942',
    tagline: 'A flowering of literature, art, and jazz in upper Manhattan.',
    summary:
      'Centered in Harlem, New York, this cultural movement gave the world Langston Hughes, Zora Neale Hurston, Duke Ellington, and the music of the Cotton Club and Savoy Ballroom. It reshaped American art and asserted a proud, modern Black identity.',
    figures: ['langston-hughes', 'zora-neale-hurston'],
  },
  {
    id: 'great-migration',
    name: 'The Great Migration',
    years: '1916–1970',
    unlockCost: 90,
    accent: '#2ea36b',
    tagline: 'Six million people in search of freedom and opportunity.',
    summary:
      'Roughly six million Black Americans left the rural South for cities in the North, Midwest, and West, reshaping places like Chicago’s Bronzeville and building new communities, newspapers, and industries away from Jim Crow.',
    figures: ['ida-b-wells'],
  },
  {
    id: 'civil-rights',
    name: 'Civil Rights Movement',
    years: '1954–1968',
    unlockCost: 160,
    accent: '#4a7dd6',
    tagline: 'Nonviolent resistance that changed the law of the land.',
    summary:
      'From the Montgomery Bus Boycott (1955–56) to the March on Washington (1963) and the Voting Rights Act (1965), organizers won landmark victories against segregation through boycotts, marches, and legal challenges.',
    figures: ['rosa-parks', 'martin-luther-king', 'john-lewis'],
  },
  {
    id: 'space-age',
    name: 'The Space Age',
    years: '1958–1972',
    unlockCost: 240,
    accent: '#9b6dd6',
    tagline: 'Hidden figures who put humans in orbit and on the Moon.',
    summary:
      'At NASA, mathematicians like Katherine Johnson calculated the trajectories for the first American in space and John Glenn’s orbital flight, while a generation of Black scientists and engineers powered the era of human spaceflight.',
    figures: ['katherine-johnson'],
  },
]
