import { StatusChip } from '../ui/StatusChip.jsx'

export function StatusBar({ pairId, subtitle, tone = 'normal', chipLabel, cadence }) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-5 py-3 bg-surface border border-white/[0.07] rounded-card mb-5">
      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981] pulse-dot" />
      <span className="text-sm text-muted">
        <strong className="text-white">{pairId}</strong>
        {subtitle && <span className="ml-2 text-muted-2">· {subtitle}</span>}
      </span>
      <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-emerald-400 uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
        Live {cadence && `· ${cadence}`}
      </span>
      <div className="ml-auto">
        <StatusChip tone={tone}>{chipLabel}</StatusChip>
      </div>
    </div>
  )
}
