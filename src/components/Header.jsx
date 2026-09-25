import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import Logo from './Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the page changes
  useEffect(() => { setOpen(false) }, [pathname])

  // While the menu is open: stop the page scrolling behind it, and let Escape close it
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink text-paper">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-10">
        <Link to="/" aria-label="The Barber Hub, home">
          <Logo />
        </Link>

        {/* Desktop navigation (hidden on phones) */}
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                `border-b-2 px-3 py-2 font-semibold transition-colors ${
                  isActive ? 'border-paper text-paper' : 'border-transparent text-white/70 hover:text-paper'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="ml-4 inline-flex h-11 items-center border-2 border-paper bg-paper px-5 font-bold text-ink transition-colors hover:bg-transparent hover:text-paper"
          >
            Book now
          </Link>
        </nav>

        {/* Menu button (phones only): three lines that turn into an X */}
        <button
          type="button"
          className="flex size-12 flex-col items-center justify-center md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`my-1.5 block h-0.5 w-6 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu: slides in from the right */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed inset-x-0 bottom-0 top-18 z-40 overflow-y-auto bg-ink px-5 pb-10 md:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <NavLink
                  to={l.to}
                  end
                  className={({ isActive }) =>
                    `wide block border-b border-white/10 py-5 text-3xl font-extrabold ${isActive ? 'underline underline-offset-8' : ''}`
                  }
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
            <Link to="/book" className="mt-8 flex h-14 items-center justify-center bg-paper text-lg font-bold text-ink">
              Book now
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}