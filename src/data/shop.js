export const SHOP = {
  name: 'The Barber Hub',
  street: '73 Juta Street',
  suburb: 'Braamfontein',
  city: 'Johannesburg',
  postcode: '2001',
  fullAddress: '73 Juta Street, Braamfontein, Johannesburg, 2001, South Africa',
  phone: '+27 11 403 2210',
  phoneHref: 'tel:+27114032210',
  email: 'hello@thebarberhub.co.za',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=73+Juta+Street+Braamfontein+Johannesburg',
  timeZone: 'Africa/Johannesburg',
  instagram: 'https://www.instagram.com/thebarberhub.jhb',
  facebook: 'https://www.facebook.com/thebarberhubjhb',
  tiktok: 'https://www.tiktok.com/@thebarberhub.jhb',
  whatsapp: 'https://wa.me/27724032210',
}

// Opening hours by weekday (0 = Sunday, 6 = Saturday).
// [open, close] in 24-hour time. null = closed.
export const HOURS = {
  0: null,
  1: [9, 19],
  2: [9, 19],
  3: [9, 19],
  4: [9, 19],
  5: [9, 19],
  6: [8, 17],
}

// How we group the days when showing hours to customers
export const HOURS_SUMMARY = [
  { label: 'Mon to Fri', days: [1, 2, 3, 4, 5] },
  { label: 'Saturday', days: [6] },
  { label: 'Sunday', days: [0] },
]