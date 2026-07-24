import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from '../layout/Logo.jsx'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#impact', label: 'Impact' },
  { href: '#features', label: 'Features' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? 'bg-white/85 backdrop-blur border-b border-slate-200'
          : 'bg-white/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
        <a href="#home" className="flex items-center">
          <Logo size={36} tone="light" />
        </a>
        <ul className="hidden md:flex items-center gap-7 text-sm text-slate-600">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-slate-900 transition font-medium">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-4">
          <a href="#get-app" className="text-sm text-slate-600 hover:text-slate-900 transition font-medium">
            Get the App
          </a>
          <Link
            to="/login"
            className="bg-[#E63946] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#c1121f] transition shadow-sm"
          >
            Launch App
          </Link>
        </div>
        <button
          className="md:hidden text-slate-900 p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-slate-700 py-1 font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#get-app"
            onClick={() => setOpen(false)}
            className="text-sm text-slate-700 py-1 font-medium"
          >
            Get the App
          </a>
          <Link
            to="/login"
            className="bg-[#E63946] text-white px-4 py-2 rounded-full text-sm font-semibold text-center hover:bg-[#c1121f] transition"
          >
            Launch App
          </Link>
        </div>
      )}
    </nav>
  )
}
