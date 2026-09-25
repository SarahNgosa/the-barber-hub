import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/services'
import About from './pages/About'
import Contact from './pages/Contact'
import Book from './pages/Book'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="book" element={<Book />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}