import { Thermometer, Flame, Gauge } from 'lucide-react'
import { Skeleton } from '../ui/Skeleton.jsx'
import { fmtTemp, fmtPct } from '../../lib/risk.js'

export function SolePanel({ side, pairId, reading, big = false, loading }) {
  const isLeft = side === 'L'
  const accent = isLeft ? 'text-blue-600' : 'text-purple-600'
  const badgeCls = isLeft
    ? 'bg-blue-50 text-blue-700 border-blue-200'
    : 'bg-purple-50 text-purple-700 border-purple-200'
  const size = big ? 'text-3xl' : 'text-2xl'
  const pressure = reading?.pressure
  const pct = pressure != null ? Math.min(parseFloat(pressure), 100) : 0
  const pressureColor =
    pct < 25 ? 'bg-emerald-500'
      : pct < 60 ? 'bg-blue-500'
      : pct < 85 ? 'bg-amber-500' : 'bg-red'

  return (
    <div className="bg-white border border-slate-200 rounded-card overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-3">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${badgeCls}`}
        >
          {pairId}-{side}
        </span>
        <span className="text-sm font-semibold">{isLeft ? 'Left Sole' : 'Right Sole'}</span>
      </div>
      <div className="p-5 grid grid-cols-2 gap-3">
        <Metric icon={Thermometer} label="Hallux Temp">
          {loading ? <Skeleton className="h-8 w-20" /> : (
            <span className={`font-mono font-semibold ${size} ${accent}`}>
              {fmtTemp(reading?.hallux_temp)}
            </span>
          )}
        </Metric>
        <Metric icon={Flame} label="Heel Temp">
          {loading ? <Skeleton className="h-8 w-20" /> : (
            <span className={`font-mono font-semibold ${size} text-[#E63946]`}>
              {fmtTemp(reading?.heel_temp)}
            </span>
          )}
        </Metric>
        <div className="col-span-2 bg-slate-50 rounded-xl p-3.5">
          <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-wider text-muted-2 mb-2">
            <Gauge size={12} />
            Pressure Load
          </div>
          <div className="flex items-center gap-3">
            <span className={`font-mono font-semibold ${big ? 'text-2xl' : 'text-xl'} text-emerald-600 min-w-[52px]`}>
              {fmtPct(reading?.pressure)}
            </span>
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${pressureColor}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-mono text-amber-600 min-w-[56px] text-right">
              {reading?.pressure_level || '--'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Metric({ icon: Icon, label, children }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3.5">
      <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-wider text-muted-2 mb-2">
        <Icon size={12} />
        {label}
      </div>
      {children}
    </div>
  )
}
