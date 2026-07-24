import { PageHeader } from '../components/layout/AppShell.jsx'
import { Card } from '../components/ui/Card.jsx'
import { SolePanel } from '../components/dashboard/SolePanel.jsx'
import { TempChart } from '../components/dashboard/TempChart.jsx'
import { PressureChart } from '../components/dashboard/PressureChart.jsx'
import { StatusBar } from '../components/dashboard/StatusBar.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { useViewingPair } from '../hooks/useViewingPair.jsx'
import { useReadings } from '../hooks/useReadings.js'

export default function LiveMonitor() {
  const { role, pairId: myPair } = useAuth()
  const { viewingPair } = useViewingPair()
  const pairId = role === 'doctor' ? viewingPair : myPair
  const { left, right, latestLeft, latestRight, loading } = useReadings(pairId)

  const hd = latestLeft && latestRight ? Math.abs((latestLeft.hallux_temp || 0) - (latestRight.hallux_temp || 0)) : 0
  const ed = latestLeft && latestRight ? Math.abs((latestLeft.heel_temp || 0) - (latestRight.heel_temp || 0)) : 0
  const mx = Math.max(hd, ed)
  const tone = mx > 2.2 ? 'danger' : mx > 1.5 ? 'warn' : 'normal'
  const chip = mx > 2.2 ? 'High Alert' : mx > 1.5 ? 'Monitor' : 'Normal'

  return (
    <>
      <PageHeader title="Live Monitor" subtitle="Real-time sensor stream" />
      <StatusBar pairId={pairId || '—'} subtitle="streaming live" tone={tone} chipLabel={chip} cadence="3s" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <SolePanel side="L" pairId={pairId} reading={latestLeft} big loading={loading && !latestLeft} />
        <SolePanel side="R" pairId={pairId} reading={latestRight} big loading={loading && !latestRight} />
      </div>
      <Card title="Live Temperature Stream" className="mb-5">
        {left.length || right.length ? (
          <TempChart left={left} right={right} />
        ) : (
          <div className="h-[220px] flex items-center justify-center text-muted-2 text-sm">
            Waiting for sensor stream…
          </div>
        )}
      </Card>
      <Card title="Live Pressure Stream">
        {left.length || right.length ? (
          <PressureChart left={left} right={right} />
        ) : (
          <div className="h-[180px] flex items-center justify-center text-muted-2 text-sm">
            Waiting for sensor stream…
          </div>
        )}
      </Card>
    </>
  )
}
