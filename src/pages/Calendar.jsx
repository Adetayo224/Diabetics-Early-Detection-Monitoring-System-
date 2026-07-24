import { PageHeader } from '../components/layout/AppShell.jsx'
import { Card } from '../components/ui/Card.jsx'
import { CalendarClock } from 'lucide-react'

const APPTS = [
  { title: 'Follow-up Check-up', sub: 'Routine monitoring review', date: 'May 20, 2026' },
  { title: 'Foot Examination', sub: 'Full diabetic foot screening', date: 'May 27, 2026' },
  { title: 'Device Calibration', sub: 'Smart sole service check', date: 'Jun 3, 2026' },
  { title: 'Lab Results Review', sub: 'HbA1c & CBC results', date: 'Jun 10, 2026' },
]

export default function Calendar() {
  return (
    <>
      <PageHeader title="Calendar" subtitle="Upcoming appointments" />
      <Card title="Upcoming Appointments">
        <div className="space-y-2">
          {APPTS.map((a) => (
            <div
              key={a.title}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <CalendarClock size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{a.title}</div>
                  <div className="text-xs text-muted-2 mt-0.5">{a.sub}</div>
                </div>
              </div>
              <span className="font-mono text-sm text-blue-700">{a.date}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
