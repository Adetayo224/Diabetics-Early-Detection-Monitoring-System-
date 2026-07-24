import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Activity,
  Users,
  Calendar,
  User,
  LogOut,
} from 'lucide-react'
import { Logo } from './Logo.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'

const baseNav = [
  { to: '/app/overview', label: 'Overview', icon: LayoutDashboard },
  { to: '/app/live', label: 'Live Monitor', icon: Activity },
]
const doctorExtra = { to: '/app/patients', label: 'Patients', icon: Users }
const tailNav = [
  { to: '/app/calendar', label: 'Calendar', icon: Calendar },
  { to: '/app/profile', label: 'Profile', icon: User },
]

export function Sidebar() {
  const { user, role, signOut } = useAuth()
  const items = [...baseNav, ...(role === 'doctor' ? [doctorExtra] : []), ...tailNav]

  return (
    <aside className="w-60 bg-surface border-r border-white/[0.07] fixed h-screen flex flex-col z-40">
      <div className="px-5 pt-6 pb-5 border-b border-white/[0.07]">
        <Logo />
        <span
          className={`inline-block mt-3 px-3 py-1 rounded-full text-[0.7rem] font-medium border ${
            role === 'doctor'
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              : 'bg-blue/15 text-blue-400 border-blue/30'
          }`}
        >
          {role === 'doctor' ? 'Doctor' : 'Patient'}
        </span>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue/15 text-blue-400'
                      : 'text-muted hover:bg-surface-2 hover:text-white'
                  }`
                }
              >
                <Icon size={18} strokeWidth={2} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-5 py-4 border-t border-white/[0.07]">
        <div className="text-xs text-muted-2 truncate mb-2">{user?.email}</div>
        <button
          onClick={signOut}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red/10 border border-red/20 text-red-300 hover:bg-red/20 text-sm font-medium transition"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
