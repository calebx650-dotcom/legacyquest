import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './views/Dashboard.jsx'
import Eras from './views/Eras.jsx'
import Mentors from './views/Mentors.jsx'
import Mysteries from './views/Mysteries.jsx'
import PuzzleLab from './views/PuzzleLab.jsx'
import Community from './views/Community.jsx'
import Culture from './views/Culture.jsx'
import Museum from './views/Museum.jsx'
import DailyLegacy from './views/DailyLegacy.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/daily" element={<DailyLegacy />} />
        <Route path="/eras" element={<Eras />} />
        <Route path="/mysteries" element={<Mysteries />} />
        <Route path="/puzzles" element={<PuzzleLab />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/community" element={<Community />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/museum" element={<Museum />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Layout>
  )
}
