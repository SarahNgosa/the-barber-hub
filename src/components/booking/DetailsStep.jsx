import { useState } from 'react'
import { Link } from 'react-router'
import Button from '../Button'
import { PROMOS } from '../../data/promos'

function validate(details, agreed) {
  const errors = {}
  if (details.name.trim().length < 2) errors.name = 'Enter your full name.'
  const phone = details.phone.replace(/[\s()-]/g, '')
  if (!/^(0\d{9}|\+27\d{9}|\+\d{8,15})$/.test(phone)) errors.phone = 'Enter a valid mobile number, e.g. 072 123 4567.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(details.email.trim())) errors.email = 'Enter a valid email address, e.g. you@example.com.'
  if (!agreed) errors.agree = 'Please agree to the Terms & Conditions to book.'
  return errors
}

const inputClass = (hasError) =>
  `min-h-12 w-full border-2 bg-paper px-3.5 py-2.5 text-base outline-none transition-colors focus:border-ink ${hasError ? 'border-red-700' : 'border-black/15'}`

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={`f-${id}`} className="mb-1.5 block font-bold">
        {label}{optional && <span className="font-normal text-slate"> (optional)</span>}
      </label>
      {children}
      {error && <p id={`e-${id}`} className="mt-1.5 text-sm font-semibold text-red-700">{error}</p>}
    </div>
  )
}

export default function DetailsStep({ details, setDetails, promo, setPromo, agreed, setAgreed, onBack, onConfirm }) {
  const [errors, setErrors] = useState({})
  const [promoInput, setPromoInput] = useState(promo ?? '')

  // Returns a function that updates one field and clears its error as the customer types
  const update = (field) => (e) => {
    setDetails((d) => ({ ...d, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: undefined }))
  }

  // Checks the promo code. Returns the valid code, null for no code, or false if the code is wrong.
  function checkPromo() {
    const code = promoInput.trim().toUpperCase()
    if (!code) { setPromo(null); return null }
    if (!PROMOS[code]) {
      setPromo(null)
      setErrors((er) => ({ ...er, promo: "That code isn't valid. Check the spelling or leave it blank." }))
      return false
    }
    setPromo(code)
    setPromoInput(code)
    setErrors((er) => ({ ...er, promo: undefined }))
    return code
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(details, agreed)
    const code = checkPromo()
    if (code === false) found.promo = "That code isn't valid. Remove it or check the spelling."
    setErrors(found)
    const firstError = Object.keys(found)[0]
    if (firstError) {
      document.getElementById(`f-${firstError}`)?.focus()
      return
    }
    onConfirm(code)
  }

  const a11y = (id) => ({ id: `f-${id}`, 'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `e-${id}` : undefined })

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-3xl">Your details</h2>
      <p className="mt-2 mb-6 text-slate">We'll only use these to confirm or change your appointment.</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field id="name" label="Full name" error={errors.name}>
            <input {...a11y('name')} autoComplete="name" maxLength={80} value={details.name} onChange={update('name')} className={inputClass(errors.name)} />
          </Field>
        </div>
        <Field id="phone" label="Mobile number" error={errors.phone}>
          <input {...a11y('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 072 123 4567" value={details.phone} onChange={update('phone')} className={inputClass(errors.phone)} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input {...a11y('email')} type="email" autoComplete="email" placeholder="you@example.com" value={details.email} onChange={update('email')} className={inputClass(errors.email)} />
        </Field>
        <div className="sm:col-span-2">
          <Field id="notes" label="Notes for your barber" optional>
            <textarea id="f-notes" rows={3} maxLength={400} placeholder="Allergies, a style you like, or anything else we should know" value={details.notes} onChange={update('notes')} className={`${inputClass(false)} resize-y`} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="promo" label="Promo code" optional error={errors.promo}>
            <div className="flex gap-2">
              <input
                {...a11y('promo')}
                autoComplete="off"
                autoCapitalize="characters"
                value={promoInput}
                onChange={(e) => { setPromoInput(e.target.value); setErrors((er) => ({ ...er, promo: undefined })) }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); checkPromo() } }}
                className={inputClass(errors.promo)}
              />
              <Button variant="outlineDark" onClick={checkPromo}>Apply</Button>
            </div>
          </Field>
          {promo && <p className="mt-1.5 text-sm font-semibold text-green-800">{PROMOS[promo].label} applied.</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-agree" className="flex items-start gap-3">
            <input
              id="f-agree"
              type="checkbox"
              checked={agreed}
              aria-invalid={Boolean(errors.agree)}
              aria-describedby={errors.agree ? 'e-agree' : undefined}
              onChange={(e) => { setAgreed(e.target.checked); setErrors((er) => ({ ...er, agree: undefined })) }}
              className="mt-1 size-5 shrink-0 accent-black"
            />
            <span>
              I agree to the{' '}
              <Link to="/terms" target="_blank" className="font-bold underline underline-offset-4">Terms &amp; Conditions</Link>, including the 4-hour cancellation policy.
            </span>
          </label>
          {errors.agree && <p id="e-agree" className="mt-1.5 text-sm font-semibold text-red-700">{errors.agree}</p>}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <Button variant="outlineDark" onClick={onBack}>Back</Button>
        <Button type="submit">Confirm booking</Button>
      </div>
    </form>
  )
}