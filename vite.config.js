import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// LegacyQuest — static SPA. `base: './'` keeps asset paths relative so the
// production build also works when opened from a subpath or offline (a core
// requirement for schools with limited internet).
export default defineConfig({
  plugins: [react()],
  base: './',
})
