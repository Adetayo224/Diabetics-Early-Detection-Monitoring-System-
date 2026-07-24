import { useState } from 'react'
import { Users, Plug } from 'lucide-react'
import { PageHeader } from '../components/layout/AppShell.jsx'
import { Card } from '../components/ui/Card.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'
import { SolePanel } from '../components/dashboard/SolePanel.jsx'
import { ComparisonCard } from '../components/dashboard/ComparisonCard.jsx'
import { TempChart } from '../components/dashboard/TempChart.jsx'
import { PressureChart } from '../components/dashboard/PressureChart.jsx'
import { RiskCard } from '../components/dashboard/RiskCard.jsx'
import { StatusBar } from '../components/dashboard/StatusBar.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { useReadings } from '../hooks/useReadings.js'
import { useViewingPair } from '../hooks/useViewingPair.jsx'
import { calcRisk } from '../lib/risk.js'

export default function Overview() {
  const { role, pairId: myPair } = useAuth()
  const { viewingPair } = useViewingPair()
  const pairId = role === 'doctor' ? viewingPair : myPair
  const { left, right, latestLeft, latestRight, loading } = useReadings(pairId)

  if (role === 'doctor' && !viewingPair) {
    return (
      <>
        <PageHeader title="Doctor Dashboard" subtitle="No patient selected" />
        <Card>
          <EmptyState
            icon={Users}
            title="Pick a patient"
            description="Go to Patients in the sidebar and click a patient to view their live sole data."
          />
        </Card>
      </>
    )
  }
  if (role === 'patient' && !myPair) {
    return (
      <>
        <PageHeader title="Patient Dashboard" subtitle="No device paired" />
        <Card>
          <EmptyState
            icon={Plug}
            title="No sole pair on file"
            description="No Sole Pair ID found on your account. Please contact support or re-register with your device Pair ID."
          />
        </Card>
      </>
    )
  }

  const risk = calcRisk(latestLeft, latestRight)
  const hd = latestLeft && latestRight ? Math.abs((latestLeft.hallux_temp || 0) - (latestRight.hallux_temp || 0)) : 0
  const ed = latestLeft && latestRight ? Math.abs((latestLeft.heel_temp || 0) - (latestRight.heel_temp || 0)) : 0
  const mx = Math.max(hd, ed)
  const tone = mx > 2.2 ? 'danger' : mx > 1.5 ? 'warn' : 'normal'
  const chip = mx > 2.2 ? 'High Asymmetry Alert' : mx > 1.5 ? 'Caution: Monitor Closely' : 'Normal Range'

  return (
    <>
      <PageHeader
        title={role === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}
        subtitle={loading ? 'Loading…' : `Last updated: ${new Date().toLocaleTimeString()}`}
      />

      <StatusBar
        pairId={pairId}
        subtitle={role === 'doctor' ? 'Viewing patient' : 'Both soles'}
        tone={tone}
        chipLabel={chip}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <SolePanel side="L" pairId={pairId} reading={latestLeft} loading={loading && !latestLeft} />
        <SolePanel side="R" pairId={pairId} reading={latestRight} loading={loading && !latestRight} />
      </div>

      <ComparisonCard left={latestLeft} right={latestRight} />

      <Card
        title="Temperature Trend — L-Hallux · L-Heel · R-Hallux · R-Heel"
        className="mb-5"
      >
        {left.length || right.length ? (
          <TempChart left={left} right={right} />
        ) : (
          <div className="h-[220px] flex items-center justify-center text-muted-2 text-sm">
            Waiting for sensor stream…
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Pressure Load — Left & Right">
          {left.length || right.length ? (
            <PressureChart left={left} right={right} />
          ) : (
            <div className="h-[180px] flex items-center justify-center text-muted-2 text-sm">
              Waiting for sensor stream…
            </div>
          )}
        </Card>
        <RiskCard risk={risk} />
      </div>
    </>
  )
}
