import { CheckCircle2, AlertTriangle, Zap } from 'lucide-react'

export function StatusChip({ tone = 'normal', children }) {
  const map = {
    normal: {
      cls: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      Icon: CheckCircle2,
    },
    warn: {
      cls: 'bg-amber-50 text-amber-700 border-amber-200',
      Icon: Zap,
    },
    danger: {
      cls: 'bg-red-50 text-[#E63946] border-red-200 animate-pulse',
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
