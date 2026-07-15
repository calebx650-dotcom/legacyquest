// Community Builder — rebuild historically significant Black communities.
// The prototype features Greenwood ("Black Wall Street") in Tulsa, Oklahoma.
// Each building costs Legacy Points and unlocks a true story about the district.

export const COMMUNITY = {
  id: 'greenwood',
  name: 'Greenwood — “Black Wall Street”',
  place: 'Tulsa, Oklahoma',
  intro:
    'In the early 1900s, Greenwood was one of the most prosperous Black communities in America, with a self-sustaining economy of businesses, schools, and churches. In 1921, a white mob destroyed the district in the Tulsa Race Massacre. Rebuild it here — and recover its stories.',
  buildings: [
    {
      id: 'school',
      name: 'Booker T. Washington School',
      icon: '🏫',
      cost: 20,
      story:
        'Greenwood residents prized education. Booker T. Washington High School served the community and continued to educate generations even after the district was rebuilt.',
    },
    {
      id: 'newspaper',
      name: 'The Tulsa Star Newspaper',
      icon: '📰',
      cost: 25,
      story:
        'Black-owned newspapers like the Tulsa Star informed residents, advertised local businesses, and gave the community a political voice.',
    },
    {
      id: 'church',
      name: 'Mount Zion Baptist Church',
      icon: '⛪',
      cost: 30,
      story:
        'Dedicated just weeks before the 1921 massacre, Mount Zion was destroyed and later rebuilt by its congregation over many years — a symbol of Greenwood’s resilience.',
    },
    {
      id: 'theater',
      name: 'Dreamland Theatre',
      icon: '🎭',
      cost: 35,
      story:
        'The 750-seat Dreamland Theatre hosted live music and silent films. It anchored Greenwood’s thriving entertainment district before 1921.',
    },
    {
      id: 'business',
      name: 'Stradford Hotel',
      icon: '🏨',
      cost: 40,
      story:
        'Built by attorney and entrepreneur J. B. Stradford, the luxury hotel was among the largest Black-owned hotels in the country.',
    },
    {
      id: 'library',
      name: 'Greenwood Library',
      icon: '📚',
      cost: 45,
      story:
        'A branch library gave residents access to books and study space, reinforcing Greenwood’s deep investment in learning and self-reliance.',
    },
  ],
}
