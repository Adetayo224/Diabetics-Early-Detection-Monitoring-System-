import { useState } from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import { Logo } from '../components/layout/Logo.jsx'
import { AuthMessage } from '../components/ui/AuthMessage.jsx'
import { GetTheApp } from '../components/marketing/GetTheApp.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const { signIn, user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/app/overview'

  if (!authLoading && user) return <Navigate to={from} replace />


  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try {
      await signIn(email.trim(), password)
      navigate(from, { replace: true })
    } catch (e) {
      setErr(e.message || 'Login failed. Check your credentials.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-white"
      style={{
        backgroundImage:
          'radial-gradient(circle at 15% 20%, rgba(21,101,192,0.08) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(230,57,70,0.06) 0%, transparent 45%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden shadow-sm">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue to-red" />

          <div className="flex flex-col items-center mb-8">
            <Logo size={48} withWordmark={false} tone="light" />
            <h1 className="mt-4 text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-muted text-sm mt-1">Smart Sole Monitoring Platform</p>
          </div>

          {err && <AuthMessage tone="error">{err}</AuthMessage>}

          <form onSubmit={onSubmit} className="space-y-4">
            <Field
              label="Email Address"
              icon={Mail}
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="your@email.com"
              required
            />
            <Field
              label="Password"
              icon={Lock}
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Your password"
              required
            />

            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#E63946] text-white font-semibold hover:bg-[#c1121f] transition disabled:opacity-50 shadow-sm"
            >
              {busy ? 'Signing in…' : (<>Sign In <ArrowRight size={16} /></>)}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            No account?{' '}
            <Link to="/register" className="text-[#E63946] hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>

        <div className="mt-6">
          <GetTheApp compact variant="light" />
        </div>
      </motion.div>
    </div>
  )
}

function Field({ label, icon: Icon, value, onChange, ...rest }) {
  return (
    <div>
      <label className="block text-[0.72rem] uppercase tracking-[0.08em] text-muted mb-2 font-medium">
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" />
        <input
          {...rest}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-muted-2 focus:outline-none focus:border-blue-500 transition"
        />
      </div>
    </div>
  )
}
