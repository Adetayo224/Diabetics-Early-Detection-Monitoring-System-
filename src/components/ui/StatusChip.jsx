import { CheckCircle2, AlertTriangle, Zap } from 'lucide-react'

export function StatusChip({ tone = 'normal', children }) {
  const map = {
    normal: {
      cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      Icon: CheckCircle2,
    },
    warn: {
      cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      Icon: Zap,
    },
    danger: {
      cls: 'bg-red/10 text-red-300 border-red/25 animate-pulse',
      Icon: AlertTriangle,
    },
  }
  const { cls, Icon } = map[tone] || map.normal
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}
    >
      <Icon size={14} />
      {children}
    </span>
  )
}
