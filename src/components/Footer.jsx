import { Link } from 'react-router'
import Logo from './Logo'
import { SHOP, HOURS, HOURS_SUMMARY } from '../data/shop'
import { formatHour } from '../lib/time'
import { InstagramIcon, FacebookIcon, TikTokIcon, WhatsAppIcon } from './Icons'

const socials = [
  { label: 'Instagram', href: SHOP.instagram, Icon: InstagramIcon },
  { label: 'Facebook', href: SHOP.facebook, Icon: FacebookIcon },
  { label: 'TikTok', href: SHOP.tiktok, Icon: TikTokIcon },
  { label: 'WhatsApp', href: SHOP.whatsapp, Icon: WhatsAppIcon },
]

const explore = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services & prices' },
  { to: '/about', label: 'About & barbers' },
  { to: '/book', label: 'Book online' },
  { to: '/contact', label: 'Contact & directions' },
]

const linkStyle = 'text-white/75 transition-colors hover:text-paper hover:underline underline-offset-4'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 md:px-10 md:pt-24">
        <div className="grid gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">

          {/* Brand, booking button and socials */}
          <div>
            <Link to="/" aria-label="The Barber Hub, home" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel">
              Precision cuts, fades and hot towel shaves in the heart of Braamfontein since 2019.
            </p>
            <Link
              to="/book"
              className="mt-6 inline-flex h-11 items-center border-2 border-paper bg-paper px-5 font-bold text-ink transition-colors hover:bg-transparent hover:text-paper"
            >
              Book an appointment
            </Link>
            <ul className="mt-6 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Site links */}
          <nav aria-label="Footer">
            <h2 className="wide mb-4 text-base">Explore</h2>
            <ul className="space-y-3">
              {explore.map((l) => (
                <li key={l.to}><Link to={l.to} className={linkStyle}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Opening hours, built from the HOURS data */}
          <div>
            <h2 className="wide mb-4 text-base">Opening hours</h2>
            <ul className="max-w-64 space-y-3 text-sm">
              {HOURS_SUMMARY.map(({ label, days }) => {
                const hours = HOURS[days[0]]
                return (
                  <li key={label} className="flex justify-between gap-4 text-white/75">
                    <span>{label}</span>
                    <span className="font-semibold text-paper">
                      {hours ? `${formatHour(hours[0])} to ${formatHour(hours[1])}` : 'Closed'}
                    </span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-4 text-sm text-steel">Closed on public holidays.</p>
          </div>

          {/* Contact details */}
          <div>
            <h2 className="wide mb-4 text-base">Visit us</h2>
            <ul className="space-y-3">
              <li>
                <a href={SHOP.mapsUrl} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                  {SHOP.street}, {SHOP.suburb}<br />{SHOP.city}, {SHOP.postcode}
                </a>
              </li>
              <li><a href={SHOP.phoneHref} className={linkStyle}>{SHOP.phone}</a></li>
              <li><a href={`mailto:${SHOP.email}`} className={linkStyle}>{SHOP.email}</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright and legal links */}
        <div className="flex flex-col gap-4 pt-6 text-sm text-steel md:flex-row md:justify-between">
          <p>© {year} The Barber Hub (Pty) Ltd. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link to="/terms" className={linkStyle}>Terms &amp; Conditions</Link></li>
            <li><Link to="/privacy" className={linkStyle}>Privacy Policy</Link></li>
            <li><Link to="/terms#cancellations" className={linkStyle}>Cancellation policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}