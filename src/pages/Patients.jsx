import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Inbox, AlertTriangle, Loader2, ChevronRight } from 'lucide-react'
import { PageHeader } from '../components/layout/AppShell.jsx'
import { Card } from '../components/ui/Card.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'
import { StatusChip } from '../components/ui/StatusChip.jsx'
import { supabase } from '../lib/supabase.js'
import { useViewingPair } from '../hooks/useViewingPair.jsx'

export default function Patients() {
  const [patients, setPatients] = useState(null)
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { setPair } = useViewingPair()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('readings')
          .select('sole_id,hallux_temp,heel_temp,pressure,pressure_level,timestamp')
          .order('timestamp', { ascending: false })
          .limit(600)
        if (error) throw error
        const map = {}
        ;(data || []).forEach((r) => {
          const pid = r.sole_id.replace(/-[LR]$/, '')
          if (!map[pid]) map[pid] = { pid, lastTs: r.timestamp, rows: [] }
          map[pid].rows.push(r)
        })
        setPatients(Object.values(map))
      } catch (e) {
        setErr(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const open = (pid) => {
    setPair(pid)
    navigate('/app/overview')
  }

  return (
    <>
      <PageHeader
        title="Patients"
        subtitle={
          loading ? 'Loading…' : patients ? `${patients.length} patient pair(s)` : ' '
        }
      />

      {loading && (
        <Card>
          <div className="flex flex-col items-center py-10 gap-3 text-muted">
            <Loader2 size={24} className="animate-spin" />
            <span className="text-sm">Fetching readings…</span>
          </div>
        </Card>
      )}

      {!loading && err && (
        <Card>
          <EmptyState
            icon={AlertTriangle}
            title="Couldn't load patients"
            description={err.message}
          />
        </Card>
      )}

      {!loading && patients && patients.length === 0 && (
        <Card>
          <EmptyState
            icon={Inbox}
            title="No readings yet"
            description="Once your patients' devices start streaming, they'll appear here."
          />
        </Card>
      )}

      {!loading && patients && patients.length > 0 && (
        <Card title="Active Patients — click a row to view live data">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[0.7rem] text-muted-2 uppercase tracking-wider">
                  <th className="text-left font-medium py-2.5 px-3 border-b border-slate-200">Pair ID</th>
                  <th className="text-left font-medium py-2.5 px-3 border-b border-slate-200">Last Reading</th>
                  <th className="text-left font-medium py-2.5 px-3 border-b border-slate-200">Hallux (L)</th>
                  <th className="text-left font-medium py-2.5 px-3 border-b border-slate-200">Pressure (L)</th>
                  <th className="text-left font-medium py-2.5 px-3 border-b border-slate-200">Status</th>
                  <th className="border-b border-slate-200" />
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => {
                  const lR = p.rows.find((r) => r.sole_id.endsWith('-L'))
                  const rR = p.rows.find((r) => r.sole_id.endsWith('-R'))
                  const diff = lR && rR ? Math.abs((lR.hallux_temp || 0) - (rR.hallux_temp || 0)) : null
                  const tone = diff == null ? 'normal' : diff > 2.2 ? 'danger' : diff > 1.5 ? 'warn' : 'normal'
                  const label = diff == null ? 'No pair' : diff > 2.2 ? 'Alert' : diff > 1.5 ? 'Monitor' : 'Stable'
                  return (
                    <tr
                      key={p.pid}
                      onClick={() => open(p.pid)}
                      className="cursor-pointer hover:bg-slate-50 transition"
                    >
                      <td className="py-3 px-3 border-b border-slate-200">
                        <strong className="font-mono">{p.pid}</strong>
                      </td>
                      <td className="py-3 px-3 border-b border-slate-200 text-muted text-xs">
                        {new Date(p.lastTs).toLocaleString()}
                      </td>
                      <td className="py-3 px-3 border-b border-slate-200 font-mono">
                        {lR?.hallux_temp != null ? `${parseFloat(lR.hallux_temp).toFixed(1)}°C` : '--'}
                      </td>
                      <td className="py-3 px-3 border-b border-slate-200 font-mono">
                        {lR?.pressure != null ? `${parseFloat(lR.pressure).toFixed(0)}%` : '--'}
                      </td>
                      <td className="py-3 px-3 border-b border-slate-200">
                        <StatusChip tone={tone}>{label}</StatusChip>
                      </td>
                      <td className="py-3 px-3 border-b border-slate-200 text-muted-2">
                        <ChevronRight size={16} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  )
}
