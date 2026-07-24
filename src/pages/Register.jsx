import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Fingerprint, HeartPulse, Stethoscope, ArrowRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import { Logo } from '../components/layout/Logo.jsx'
import { AuthMessage } from '../components/ui/AuthMessage.jsx'

const PAIR_RE = /^DM-[A-Z0-9]{6}$/

export default function Register() {
  const [role, setRole] = useState('patient')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pairId, setPairId] = useState('')
  const [pass, setPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const [err, setErr] = useState('')
  const [ok, setOk] = useState('')
  const [busy, setBusy] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr(''); setOk('')
    if (pass !== confirm) return setErr('Passwords do not match.')
    const pid = pairId.trim().toUpperCase()
    if (role === 'patient') {
      if (!pid) return setErr('Pair ID is required for patients.')
      if (!PAIR_RE.test(pid))
        return setErr('Invalid Pair ID. Use format DM-XXXXXX (6 uppercase letters/digits).')
    }
    setBusy(true)
    try {
      const meta = { role, full_name: name.trim() }
      if (role === 'patient') meta.pair_id = pid
      const { user, session } = await signUp({ email: email.trim(), password: pass, meta })
      if (user && session) navigate('/app/overview', { replace: true })
      else setOk('Account created. Check your email to confirm, then sign in.')
    } catch (e) {
      setErr(e.message || 'Registration failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5"
      style={{
        background:
          'radial-gradient(ellipse at 20% 50%, rgba(21,101,192,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(230,57,70,0.12) 0%, transparent 50%), #0a1628',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-surface border border-white/[0.07] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue to-red" />

          <div className="flex flex-col items-center mb-6">
            <Logo size={48} withWordmark={false} />
            <h1 className="mt-4 text-2xl font-semibold tracking-tight">Create Account</h1>
            <p className="text-muted text-sm mt-1">Join the Diamon monitoring platform</p>
          </div>

          {err && <AuthMessage tone="error">{err}</AuthMessage>}
          {ok && <AuthMessage tone="success">{ok}</AuthMessage>}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-[0.72rem] uppercase tracking-[0.08em] text-muted mb-2 font-medium">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <RoleCard
                  active={role === 'patient'}
                  onClick={() => setRole('patient')}
                  Icon={HeartPulse}
                  label="Patient"
                  desc="Monitor my soles"
                />
                <RoleCard
                  active={role === 'doctor'}
                  onClick={() => setRole('doctor')}
                  Icon={Stethoscope}
                  label="Doctor"
                  desc="Manage patients"
                />
              </div>
            </div>

            <Field label="Full Name" icon={User} value={name} onChange={setName} required placeholder="Your full name" />
            <Field label="Email Address" icon={Mail} type="email" value={email} onChange={setEmail} required placeholder="your@email.com" />

            {role === 'patient' && (
              <div>
                <Field
                  label="Sole Pair ID"
                  icon={Fingerprint}
                  value={pairId}
                  onChange={(v) => setPairId(v.toUpperCase())}
                  maxLength={9}
                  placeholder="e.g. DM-A3F9K2"
                />
                <p className="text-xs font-mono text-muted-2 mt-1.5">
                  Format: DM-XXXXXX (6 alphanumeric chars)
                </p>
              </div>
            )}

            <Field label="Password" icon={Lock} type="password" value={pass} onChange={setPass} required minLength={6} placeholder="Minimum 6 characters" />
            <Field label="Confirm Password" icon={Lock} type="password" value={confirm} onChange={setConfirm} required placeholder="Repeat password" />

            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {busy ? 'Creating account…' : (<>Create Account <ArrowRight size={16} /></>)}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function RoleCard({ active, onClick, Icon, label, desc }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-3 rounded-xl border-2 transition ${
        active
          ? 'border-blue-500 bg-blue/15'
          : 'border-white/[0.07] bg-surface-2 hover:border-blue-500/60'
      }`}
    >
      <Icon size={20} className={active ? 'text-blue-400' : 'text-muted'} />
      <div className="mt-2 text-sm font-semibold">{label}</div>
      <div className="text-[0.7rem] text-muted-2">{desc}</div>
    </button>
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
          className="w-full pl-10 pr-3 py-2.5 bg-surface-2 border border-white/[0.07] rounded-lg text-white placeholder:text-muted-2 focus:outline-none focus:border-blue-500 transition"
        />
      </div>
    </div>
  )
}
