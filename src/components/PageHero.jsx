import { motion, useReducedMotion } from 'motion/react'
import Photo from './Photo'
import Pole from './Pole'

const ease = [0.2, 0.7, 0.2, 1]

// The title banner at the top of every inside page.
// label = short page name for the "The Barber Hub / ..." line (defaults to the title)
// image = optional background photo. Pages with one must also be listed in
// PHOTO_HERO_PAGES in Header.jsx so the header goes see-through over it.
export default function PageHero({ title, label = title, image, imageAlt = '', children }) {
  const reduceMotion = useReducedMotion()
  const rise = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  })

  return (
    <>
      {/* With a photo, the banner is pulled up under the see-through header (h-18) */}
      <section className={`relative isolate overflow-hidden bg-ink text-paper ${image ? '-mt-18 pt-18' : ''}`}>
        {image && (
          <>
            <motion.div
              className="absolute inset-0 -z-10"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ opacity: { duration: 0.9 }, scale: { duration: 6, ease: 'easeOut' } }}
            >
              <Photo src={image} alt={imageAlt} className="size-full" priority />
            </motion.div>
            {/* Same treatment as the home hero: dark on the left, photo showing through on the right */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-ink/70 lg:bg-transparent lg:bg-linear-to-r lg:from-ink/95 lg:via-ink/70 lg:to-ink/10"
            />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-ink/60 to-transparent" />
          </>
        )}

        <div className={`wrap ${image ? 'flex min-h-[min(60vh,560px)] items-center py-16 md:py-24' : 'py-16 md:py-24'}`}>
          <div>
            <motion.p {...rise(0)} className="mb-5 text-sm font-semibold tracking-wide text-white/60">
              The Barber Hub <span aria-hidden="true" className="mx-1.5">/</span> {label}
            </motion.p>
            <motion.h1 {...rise(0.06)} className="max-w-4xl text-[clamp(2.6rem,6.5vw,5.4rem)] leading-[0.92] font-black">
              {title}
            </motion.h1>
            {children && (
              <motion.div {...rise(0.14)} className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </section>
      <Pole />
    </>
  )
}
