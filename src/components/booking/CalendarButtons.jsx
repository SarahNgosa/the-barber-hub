import { useState } from 'react'
import Button from '../Button'
import { CalendarIcon, DownloadIcon } from '../Icons'
import { buildEvent, googleCalendarUrl, outlookCalendarUrl, downloadIcs } from '../../lib/calendar'

export default function CalendarButtons({ booking }) {
  const [message, setMessage] = useState('')
  const event = buildEvent(booking)

  function handleApple() {
    downloadIcs(event, booking)
    setMessage('Calendar file downloaded. Open it to add the appointment to your calendar.')
  }

  return (
    <div>
      <h2 className="text-2xl">Add to your calendar</h2>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
        <Button href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer" className="whitespace-normal text-center">
          <CalendarIcon className="size-5 shrink-0" />
          Google Calendar
        </Button>
        <Button onClick={handleApple} className="whitespace-normal text-center">
          <DownloadIcon className="size-5 shrink-0" />
          Apple Calendar
        </Button>
        <Button href={outlookCalendarUrl(event)} target="_blank" rel="noopener noreferrer" variant="outlineDark" className="whitespace-normal text-center">
          <CalendarIcon className="size-5 shrink-0" />
          Outlook.com
        </Button>
      </div>
      <p className="mt-3 text-sm text-slate">
        The Apple Calendar button downloads an .ics file, which also works with Outlook desktop, Samsung Calendar and most other calendar apps.
      </p>
      <p aria-live="polite" className="mt-2 text-sm font-semibold">{message}</p>
    </div>
  )
}