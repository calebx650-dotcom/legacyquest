import { Routes, Route } from 'react-router-dom'
import { useGame } from './state/GameContext.jsx'
import Layout from './components/Layout.jsx'
import Onboarding from './components/Onboarding.jsx'
import GameSystems from './components/GameSystems.jsx'
import Dashboard from './views/Dashboard.jsx'
import Eras from './views/Eras.jsx'
import Mentors from './views/Mentors.jsx'
import Mysteries from './views/Mysteries.jsx'
import PuzzleLab from './views/PuzzleLab.jsx'
import Community from './views/Community.jsx'
import Culture from './views/Culture.jsx'
import Museum from './views/Museum.jsx'
import DailyLegacy from './views/DailyLegacy.jsx'
import Quests from './views/Quests.jsx'
import Progress from './views/Progress.jsx'
import Teacher from './views/Teacher.jsx'
import Leaderboards from './views/Leaderboards.jsx'

export default function App() {
  const { state } = useGame()

  // Cinematic onboarding gates the rest of the app on first run.
  if (!state.onboarded) {
    return (
      <>
        <Onboarding />
        <GameSystems />
      </>
    )
  }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/daily" element={<DailyLegacy />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/eras" element={<Eras />} />
          <Route path="/mysteries" element={<Mysteries />} />
          <Route path="/puzzles" element={<PuzzleLab />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/community" element={<Community />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/museum" element={<Museum />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
      <GameSystems />
    </>
  )
}
