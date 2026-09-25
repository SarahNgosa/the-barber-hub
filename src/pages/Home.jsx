import { motion } from 'motion/react'
import Button from '../components/Button'
import Photo from '../components/Photo'
import Pole from '../components/Pole'
import ServiceRow from '../components/ServiceRow'
import BarberCard from '../components/BarberCard'
import { SERVICES } from '../data/Services'
import { BARBERS } from '../data/barbers'

import {getOpenStatus} from '../lib/time'

import HoursTable from '../components/HoursTable'

const heroLines = ['Sharp', 'cuts.', 'Clean fades.']

const steps = [
  { title: 'Pick your service', text: 'Choose a cut, beard service or package. Prices and times are shown upfront.' },
  { title: 'Choose barber and time', text: 'Pick a barber or let us match you, then choose any open slot in the next three weeks.' },
  { title: 'Add it to your calendar', text: 'Save the appointment to Google, Apple or Outlook calendar with a reminder an hour before.' },
]

const reviews = [
  { name: 'Lwazi N.', text: "Best skin fade I've had in Joburg. Sipho took his time and it still looks fresh two weeks later." },
  { name: 'Daniel V.', text: 'Booked online at 11pm, got a slot the next morning. The hot towel shave with Kyle is worth every rand.' },
  { name: 'Mpho K.', text: 'I bring my son for the father and son package every month. Thabo is brilliant with kids.' },
]

export default function Home() {
  const status = getOpenStatus()
  
  const popular = SERVICES.filter((s) => s.popular)

  return (
    <>
      {/* HERO */}
      <title>The Barber Hub | Barber Shop in Braamfontein, Johannesburg</title>
<meta name="description" content="Modern barber shop in Braamfontein, Johannesburg. Fades, scissor cuts, beard trims and hot towel shaves. Book online in under a minute." />
      <section className="bg-ink text-paper">
        <div className="grid lg:min-h-[min(86vh,760px)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center px-5 py-14 md:px-10 lg:py-24 lg:pl-[max(2.5rem,calc((100vw_-_80rem)/2_+_2.5rem))]">
            <p className="mb-7 flex items-center gap-2.5 text-white/80">
              <span
                aria-hidden="true"
                className={`size-2.5 rounded-full ${status.open ? 'bg-paper shadow-[0_0_0_4px_rgba(255,255,255,0.18)]' : 'border-2 border-steel'}`}
              />
              {status.text}
            </p>

            <h1 className="mb-7 text-[clamp(3rem,8.4vw,7.2rem)] leading-[0.92] font-black">
              {heroLines.map((line, i) => (
                <motion.span
                  key={line}
                  className="block"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <p className="mb-9 max-w-xl text-lg text-white/80 md:text-xl">
              A modern barber shop in Braamfontein. Three experienced barbers, honest prices and online booking that takes under a minute.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button to="/book" variant="light">Book an appointment</Button>
              <Button to="/services" variant="outlineLight">See services &amp; prices</Button>
            </div>
          </div>

          <motion.div
            className="order-first lg:order-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <Photo
              src="/images/hero-cut.webp"
              alt="Barber cutting a client's hair at The Barber Hub"
              className="aspect-[4/3] size-full lg:aspect-auto"
              priority
            />
          </motion.div>
        </div>
      </section>
      <Pole />

      {/* MOST BOOKED */}
      <section className="wrap py-20 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl md:text-5xl">Most booked</h2>
          <Button to="/services" variant="outlineDark" size="sm">View all {SERVICES.length} services</Button>
        </div>
        <div className="border-t-2 border-ink">
          {popular.map((s) => <ServiceRow key={s.id} service={s} />)}
        </div>
      </section>

      {/* HOW BOOKING WORKS */}
      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl">Booking takes a minute</h2>
            <p className="text-steel">No calls, no deposits, no account needed.</p>
          </div>
          <ol className="grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-paper pt-5">
                <span className="wide block text-5xl font-black">{i + 1}</span>
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-steel">{s.text}</p>
              </li>
            ))}
          </ol>
          <Button to="/book" variant="light" className="mt-12">Start booking</Button>
        </div>
      </section>

      {/* BARBERS */}
      <section className="wrap py-20 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl md:text-5xl">Meet the barbers</h2>
          <Button to="/about" variant="outlineDark" size="sm">Our story</Button>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {BARBERS.map((b) => <BarberCard key={b.id} barber={b} />)}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-chalk py-20 md:py-28">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl">What clients say</h2>
            <p className="text-slate">4.9 average from 620+ Google reviews</p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name}>
                <p aria-label="5 out of 5 stars" className="mb-3 tracking-[3px]">★★★★★</p>
                <blockquote className="text-lg leading-relaxed">{r.text}</blockquote>
                <figcaption className="mt-4 font-bold">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT US */}
      <section className="wrap grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <Photo src="/images/interior.webp" alt="Inside The Barber Hub" className="aspect-[5/4]" />
        <div>
          <h2 className="text-4xl md:text-5xl">Find us on Juta Street</h2>
          <p className="mt-5 max-w-xl text-lg">
            73 Juta Street, Braamfontein. Two minutes' walk from the Gautrain bus stop, with street parking outside.
          </p>
            <HoursTable className="mt-8" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/book">Book now</Button>
            <Button to="/contact" variant="outlineDark">Directions &amp; contact</Button>
          </div>
        </div>
      </section>
    </>
  )
}