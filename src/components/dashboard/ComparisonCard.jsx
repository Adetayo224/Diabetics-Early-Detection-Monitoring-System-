import { Card } from '../ui/Card.jsx'
import { fmtTemp } from '../../lib/risk.js'

export function ComparisonCard({ left, right }) {
  const rows = [
    { label: 'Hallux Temperature', l: left?.hallux_temp, r: right?.hallux_temp },
    { label: 'Heel Temperature', l: left?.heel_temp, r: right?.heel_temp },
  ]
  return (
    <Card title="Left vs Right Comparison" className="mb-5">
      <div className="space-y-2">
        {rows.map(({ label, l, r }) => {
          const diff = l != null && r != null ? Math.abs(l - r) : null
          const tone =
            diff == null ? 'muted'
              : diff > 2.2 ? 'bad'
              : diff > 1.5 ? 'warn'
              : 'ok'
          const toneCls = {
            ok: 'bg-emerald-500/15 text-emerald-400',
            warn: 'bg-amber-500/15 text-amber-400',
            bad: 'bg-red/15 text-red-300',
            muted: 'bg-white/[0.05] text-muted',
          }[tone]
          return (
            <div key={label} className="flex items-center gap-4 py-3 px-4 bg-surface-2 rounded-xl">
              <span className="flex-1 text-sm text-muted">{label}</span>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-mono text-blue-400 min-w-[68px] text-right">{fmtTemp(l)}</span>
                <span className="text-muted-2 text-xs">vs</span>
                <span className="font-mono text-purple-400 min-w-[68px]">{fmtTemp(r)}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${toneCls}`}>
                  {diff != null ? `${diff.toFixed(2)}°C` : '--'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
