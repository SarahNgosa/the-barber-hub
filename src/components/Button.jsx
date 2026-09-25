import { Link } from 'react-router'

const base =
  'inline-flex items-center justify-center gap-2 border-2 font-bold whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-40'

const variants = {
  dark: 'border-ink bg-ink text-paper hover:bg-paper hover:text-ink',             // for light backgrounds
  light: 'border-paper bg-paper text-ink hover:bg-transparent hover:text-paper',  // for dark backgrounds
  outlineDark: 'border-ink text-ink hover:bg-ink hover:text-paper',
  outlineLight: 'border-paper text-paper hover:bg-paper hover:text-ink',
}

const sizes = {
  md: 'min-h-12 px-6',
  sm: 'min-h-10 px-4 text-sm',
}

// to = page inside our site, href = outside link, neither = a normal button
export default function Button({ to, href, variant = 'dark', size = 'md', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <button type="button" className={cls} {...rest}>{children}</button>
}