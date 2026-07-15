// Narrated interactive stories. Each is a small branching graph (2–5 minutes)
// whose choices reveal different historical perspectives before converging on a
// factual ending. Node text is read aloud via the browser's speech synthesis
// when narration is on. All content is grounded in real history.

export const STORIES = [
  {
    id: 'stay-off-the-buses',
    title: 'Stay Off the Buses',
    era: 'civil-rights',
    blurb: 'Montgomery, December 1955. Experience the first days of the boycott.',
    rewardXp: 50,
    rewardPoints: 20,
    artifact: 'letter-mia',
    start: 'open',
    nodes: {
      open: {
        text: 'It is December 5, 1955. Four days ago, Rosa Parks was arrested for refusing to give up her seat. Tonight, Montgomery’s Black residents must decide: keep riding, or stay off the buses entirely.',
        choices: [
          { label: 'Experience it as a bus rider', to: 'rider' },
          { label: 'Experience it as an organizer', to: 'organizer' },
        ],
      },
      rider: {
        speaker: 'A Montgomery rider',
        text: 'You depend on the bus to get to work across town. Leaflets went out overnight asking everyone to stay off. It will not be easy — but neither has riding been.',
        choices: [
          { label: 'Walk to work', to: 'walk', note: 'Many walked miles rather than ride.' },
          { label: 'Join a carpool', to: 'carpool', note: 'Volunteers organized hundreds of cars.' },
        ],
      },
      walk: {
        text: 'You walk. So do thousands of others. One elder, asked if she is tired, answers, “My feet is tired, but my soul is rested.” The boycott will last 381 days.',
        end: true,
        ending: 'You chose to walk — and the walking became the movement.',
      },
      carpool: {
        text: 'You join a carpool. The Montgomery Improvement Association organizes some 300 cars, and Black-owned taxis charge bus fare. The city fights the carpools in court — but the people keep moving.',
        end: true,
        ending: 'You kept the wheels turning when the buses stood empty.',
      },
      organizer: {
        speaker: 'At the MIA meeting',
        text: 'The new Montgomery Improvement Association must choose a leader for the boycott. The choice will define the movement’s voice.',
        choices: [
          { label: 'Elect the young Rev. Dr. King', to: 'king' },
          { label: 'Rely on veteran organizer E. D. Nixon', to: 'nixon' },
        ],
      },
      king: {
        text: 'The association elects the 26-year-old Rev. Dr. Martin Luther King Jr. as president. That night he tells the crowd, “We have no alternative but to protest.” A national leader is born.',
        end: true,
        ending: 'You helped raise up the voice that would carry the movement.',
      },
      nixon: {
        text: 'E. D. Nixon, a seasoned Pullman-porter organizer and NAACP leader, is central to the effort — he bailed Rosa Parks out of jail and helped launch the boycott. Leadership, you learn, is a team, not one person.',
        end: true,
        ending: 'You saw the organizers behind the famous names.',
      },
    },
  },
  {
    id: 'follow-the-north-star',
    title: 'Follow the North Star',
    era: 'reconstruction',
    blurb: 'A night journey on the Underground Railroad. Every choice is a risk.',
    rewardXp: 50,
    rewardPoints: 20,
    start: 'dusk',
    nodes: {
      dusk: {
        text: 'Night is the only safe time to travel. Ahead lie miles of woods and rivers between you and the next station. How will you find your way?',
        choices: [
          { label: 'Travel as a passenger seeking freedom', to: 'passenger' },
          { label: 'Travel as a conductor guiding others', to: 'conductor' },
        ],
      },
      passenger: {
        speaker: 'A freedom-seeker',
        text: 'You have never been this far north. With no map, you look up. Which sign will you trust to guide you?',
        choices: [
          { label: 'The Drinking Gourd', to: 'gourd', note: 'The Big Dipper points to the North Star.' },
          { label: 'The nearest road', to: 'road', note: 'Roads were watched by patrols.' },
        ],
      },
      gourd: {
        text: 'You follow the Drinking Gourd — the Big Dipper — to Polaris, the star that never moves. It leads you north, station to station, toward free soil.',
        end: true,
        ending: 'You read the sky the way so many did, and kept moving north.',
      },
      road: {
        text: 'Roads are faster but dangerous — slave patrols watch them closely. You slip back into the treeline and follow the stars instead. Caution keeps you free.',
        end: true,
        ending: 'You learned why the network moved by night and off the roads.',
      },
      conductor: {
        speaker: 'Harriet Tubman',
        text: '“I never lost a passenger,” you remind yourself. The group is frightened and one wants to turn back — which could doom everyone.',
        choices: [
          { label: 'Insist the group press on', to: 'press', note: 'Tubman is said to have done exactly this.' },
          { label: 'Wait and rest at a station', to: 'rest' },
        ],
      },
      press: {
        text: 'You urge the group onward — turning back would risk betraying the whole route. By dawn you reach the next station, exhausted but free. Tubman guided some 70 people to freedom this way.',
        end: true,
        ending: 'You carried others through the dark, and did not lose a soul.',
      },
      rest: {
        text: 'You shelter at a “station” run by allies — free Black families and Quakers among them — resting before the next leg. Every safe house is a link in a hidden chain to freedom.',
        end: true,
        ending: 'You saw how many hands it took to move one family to freedom.',
      },
    },
  },
]
