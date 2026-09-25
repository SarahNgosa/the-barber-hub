import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { motion } from 'motion/react'
import PageHero from '../components/PageHero'
import Button from '../components/Button'
import Stepper from '../components/booking/Stepper'
import ServiceStep from '../components/booking/ServiceStep'
import BarberStep from '../components/booking/BarberStep'
import DateTimeStep from '../components/booking/DateTimeStep'
import DetailsStep from '../components/booking/DetailsStep'
import Summary from '../components/booking/Summary'
import Confirmation from '../components/booking/Confirmation'
import { getService } from '../data/Services'
import { getBarber } from '../data/barbers'
import { PROMOS } from '../data/promos'
import { getSlots, findFreeBarber } from '../lib/availability'
import { saveBooking, makeReference } from '../lib/bookings'

const EMPTY_DETAILS = { name: '', phone: '', email: '', notes: '' }

// Read ?service=...&barber=...&promo=... from the link, keeping only valid values
function readLink(params) {
  const s = params.get('service')
  const b = params.get('barber')
  const p = params.get('promo')?.toUpperCase()
  const serviceId = getService(s) ? s : null
  const barberId = b === 'any' || getBarber(b) ? b : null
  return {
    serviceId,
    barberId,
    promo: PROMOS[p] ? p : null,
    step: serviceId ? (barberId ? 3 : 2) : 1, // skip steps that are already answered
  }
}

export default function Book() {
  const [params] = useSearchParams()
  const [initial] = useState(() => readLink(params))

  const [step, setStep] = useState(initial.step)
  const [serviceId, setServiceId] = useState(initial.serviceId)
  const [barberId, setBarberId] = useState(initial.barberId)
  const [date, setDate] = useState(null)
  const [start, setStart] = useState(null)
  const [details, setDetails] = useState(EMPTY_DETAILS)
  const [promo, setPromo] = useState(initial.promo)
  const [agreed, setAgreed] = useState(false)
  const [booking, setBooking] = useState(null)
  const [notice, setNotice] = useState('')

  const panelRef = useRef(null)
  const stepperRef = useRef(null)

  // Values worked out from the state above
  const service = getService(serviceId)
  const discount = service && promo ? Math.min(PROMOS[promo].discount, service.price) : 0
  const total = service ? service.price - discount : 0
  const canContinue = (step === 1 && serviceId) || (step === 2 && barberId) || (step === 3 && date && start != null)

  // After the confirmation appears, move keyboard focus to its heading
  useEffect(() => {
    if (booking) document.getElementById('confirm-title')?.focus()
  }, [booking])

  function goToStep(n) {
    setStep(n)
    setNotice('')
    // Wait for React to draw the new step, then bring it into view and focus it
    requestAnimationFrame(() => {
      stepperRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
      panelRef.current?.focus({ preventScroll: true })
    })
  }

  function handleContinue() {
    if (step === 3) {
      // Double-check the time is still free before moving on
      const slot = getSlots(date, service, barberId).find((s) => s.start === start)
      if (!slot?.free) {
        setStart(null)
        setNotice('That time is no longer available. Please choose another.')
        return
      }
    }
    goToStep(step + 1)
  }

  function handleConfirm(promoCode) {
    const barber = findFreeBarber(date, start, service, barberId)
    if (!barber) {
      setStart(null)
      goToStep(3)
      setNotice('Sorry, that time was just taken. Please choose another.')
      return
    }
    const off = promoCode ? Math.min(PROMOS[promoCode].discount, service.price) : 0
    const newBooking = {
      ref: makeReference(),
      serviceId,
      barberId: barber.id,
      anyBarber: barberId === 'any',
      date,
      start,
      mins: service.mins,
      name: details.name.trim(),
      phone: details.phone.trim(),
      email: details.email.trim(),
      notes: details.notes.trim(),
      promo: promoCode,
      discount: off,
      total: service.price - off,
      createdAt: new Date().toISOString(),
    }
    saveBooking(newBooking)
    setBooking(newBooking)
    window.scrollTo(0, 0)
  }

  function startOver() {
    setStep(1)
    setServiceId(null)
    setBarberId(null)
    setDate(null)
    setStart(null)
    setDetails(EMPTY_DETAILS)
    setPromo(null)
    setAgreed(false)
    setBooking(null)
    setNotice('')
    window.scrollTo(0, 0)
  }

  if (booking) return <Confirmation booking={booking} onBookAnother={startOver} />

  return (
    <>
      <title>Book an Appointment | The Barber Hub</title>
      <meta name="description" content="Book a haircut, fade, beard trim or shave at The Barber Hub, Braamfontein. Choose your barber and time online." />

      <PageHero title="Book an appointment">Four quick steps. No account or deposit needed.</PageHero>

      <section className="wrap grid items-start gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
        <div className="min-w-0">
          <div ref={stepperRef} className="scroll-mt-24">
            <Stepper step={step} onGoTo={goToStep} />
          </div>

          {/* key={step} makes React treat each step as new, so it animates in */}
          <motion.div
            key={step}
            ref={panelRef}
            tabIndex={-1}
            className="outline-none"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {step === 1 && (
              <ServiceStep selectedId={serviceId} onSelect={(id) => { setServiceId(id); setStart(null) }} />
            )}
            {step === 2 && (
              <BarberStep selectedId={barberId} onSelect={(id) => { setBarberId(id); setDate(null); setStart(null) }} />
            )}
            {step === 3 && (
              <DateTimeStep
                service={service}
                barberId={barberId}
                date={date}
                start={start}
                notice={notice}
                onSelectDate={(d) => { setDate(d); setStart(null); setNotice('') }}
                onSelectTime={setStart}
              />
            )}
            {step === 4 && (
              <DetailsStep
                details={details}
                setDetails={setDetails}
                promo={promo}
                setPromo={setPromo}
                agreed={agreed}
                setAgreed={setAgreed}
                onBack={() => goToStep(3)}
                onConfirm={handleConfirm}
              />
            )}
          </motion.div>

          {step < 4 && (
            <div className="mt-8 flex flex-wrap justify-between gap-3">
              {step > 1 ? <Button variant="outlineDark" onClick={() => goToStep(step - 1)}>Back</Button> : <span />}
              <Button onClick={handleContinue} disabled={!canContinue}>Continue</Button>
            </div>
          )}
        </div>

        <Summary service={service} barberId={barberId} date={date} start={start} promo={promo} discount={discount} total={total} />
      </section>
    </>
  )
}