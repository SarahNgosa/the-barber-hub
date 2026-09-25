import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import Button from './Button'
import Photo from './Photo'

const SEEN_KEY = 'tbh_offer_seen'
const HIDDEN_ON = ['/book', '/terms', '/privacy'] // don't interrupt booking or reading the legal pages

function hasSeen() {
  try { return localStorage.getItem(SEEN_KEY) === 'yes' } catch { return false }
}
function markSeen() {
  try { localStorage.setItem(SEEN_KEY, 'yes') } catch { /* storage blocked: fine */ }
}

export default function OfferModal() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const boxRef = useRef(null)
  const lastFocus = useRef(null)

  // Show the offer 5 seconds after arriving, only once per visitor
  useEffect(() => {
    if (hasSeen() || HIDDEN_ON.includes(pathname)) return
    const timer = setTimeout(() => {
      lastFocus.current = document.activeElement
      setOpen(true)
    }, 5000)
    return () => clearTimeout(timer) // cancel if the visitor changes page first
  }, [pathname])

  function close() {
    markSeen()
    setOpen(false)
    lastFocus.current?.focus?.() // put the keyboard focus back where it was
  }

  function claim() {
    markSeen()
    setOpen(false)
    navigate('/book?promo=FIRSTHUB')
  }

  // While open: freeze the page behind, close on Escape, keep Tab inside the popup
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    boxRef.current?.querySelector('button')?.focus()

    function onKey(e) {
      if (e.key === 'Escape') close()
      if (e.key === 'Tab') {
        const items = boxRef.current.querySelectorAll('button, a[href]')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) close() }} // clicking the dark background closes it
        >
          <motion.div
            ref={boxRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-title"
            aria-describedby="offer-text"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative grid max-h-[calc(100dvh-40px)] w-full max-w-3xl overflow-auto bg-paper text-ink sm:grid-cols-[1fr_1.1fr]"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close offer"
              className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full bg-paper transition-colors hover:bg-chalk"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2.4" />
              </svg>
            </button>

            <Photo src="/images/chair.webp" alt="Black leather barber chair in the shop" className="aspect-video sm:aspect-auto" />

            <div className="p-7 sm:p-10">
              <h2 id="offer-title" className="text-4xl">R50 off your first cut</h2>
              <p id="offer-text" className="mt-4">
                New to The Barber Hub? Use this code when you book online and we'll take R50 off any service on your first visit.
              </p>
              <p className="wide my-6 inline-block border-2 border-dashed border-ink px-4 py-2 font-extrabold tracking-widest">
                FIRSTHUB
              </p>
              <div className="grid gap-2.5">
                <Button onClick={claim}>Book with R50 off</Button>
                <Button variant="outlineDark" onClick={close}>No thanks</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}