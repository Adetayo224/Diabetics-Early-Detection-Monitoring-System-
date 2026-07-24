import { PageHeader } from '../components/layout/AppShell.jsx'
import { Card } from '../components/ui/Card.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { useViewingPair } from '../hooks/useViewingPair.jsx'

function Row({ k, v, mono, color }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-surface-2 rounded-xl text-sm">
      <span className="text-muted">{k}</span>
      <span
        className={`font-medium ${mono ? 'font-mono' : ''}`}
        style={color ? { color } : undefined}
      >
        {v}
      </span>
    </div>
  )
}

export default function Profile() {
  const { user, role, pairId } = useAuth()
  const { viewingPair } = useViewingPair()
  const meta = user?.user_metadata || {}
  const name = meta.full_name || '—'
  const email = user?.email || '—'
  const pid = pairId || '—'

  return (
    <>
      <PageHeader title="Profile" subtitle="Account details" />
      <div className="max-w-xl">
        {role === 'patient' ? (
          <Card title="Patient Profile">
            <div className="space-y-2">
              <Row k="Full Name" v={name} />
              <Row k="Email" v={email} />
              <Row k="Sole Pair ID" v={pid} mono />
              <Row k="Left Sole" v={pid !== '—' ? `${pid}-L` : '—'} mono color="#60a5fa" />
              <Row k="Right Sole" v={pid !== '—' ? `${pid}-R` : '—'} mono color="#a78bfa" />
              <Row k="Role" v="Patient" />
              <Row k="Device Status" v="● Connected" color="#10b981" />
            </div>
          </Card>
        ) : (
          <Card title="Doctor Profile">
            <div className="space-y-2">
              <Row k="Full Name" v={name} />
              <Row k="Email" v={email} />
              <Row k="Role" v="Doctor" />
              <Row k="Specialization" v="Endocrinology & Diabetes Care" />
              <Row k="Currently Viewing" v={viewingPair || '—'} mono />
            </div>
          </Card>
        )}
      </div>
    </>
  )
}
