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
    <aside className="w-60 bg-white border-r border-slate-200 fixed h-screen flex flex-col z-40">
      <div className="px-5 pt-6 pb-5 border-b border-slate-200">
        <Logo tone="light" />
        <span
          className={`inline-block mt-3 px-3 py-1 rounded-full text-[0.7rem] font-medium border ${
            role === 'doctor'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-blue-50 text-blue-700 border-blue-200'
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
                      ? 'bg-red-50 text-[#E63946]'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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

      <div className="px-5 py-4 border-t border-slate-200">
        <div className="text-xs text-muted-2 truncate mb-2">{user?.email}</div>
        <button
          onClick={signOut}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 border border-red-200 text-[#E63946] hover:bg-red-100 text-sm font-medium transition"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
