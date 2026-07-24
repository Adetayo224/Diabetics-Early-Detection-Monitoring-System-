import { useState } from 'react'
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
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-navy/85 backdrop-blur border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
        <a href="#home" className="flex items-center">
          <Logo size={36} />
        </a>
        <ul className="hidden md:flex items-center gap-7 text-sm text-white/80">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-white transition">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-3">
          <a href="#get-app" className="text-sm text-white/80 hover:text-white transition">
            Get the App
          </a>
          <Link
            to="/login"
            className="bg-gradient-to-br from-red to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-95 transition"
          >
            Launch App
          </Link>
        </div>
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-navy px-5 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-white/85 py-1"
            >
              {l.label}
            </a>
          ))}
          <a href="#get-app" onClick={() => setOpen(false)} className="text-sm text-white/85 py-1">
            Get the App
          </a>
          <Link
            to="/login"
            className="bg-gradient-to-br from-red to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold text-center"
          >
            Launch App
          </Link>
        </div>
      )}
    </nav>
  )
}
