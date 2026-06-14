import { Routes, Route } from 'react-router-dom'
import App from './App'
import { StoriesPage } from './pages/StoriesPage'
import { GalleryPage } from './pages/GalleryPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/stories" element={<StoriesPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
    </Routes>
  )
}
