import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  // Start each new page at the top
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:bg-paper focus:p-3 focus:text-ink">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
        <Footer />
    </>
  )
}