import { Card } from '../ui/Card.jsx'
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react'

const toneMap = {
  green: {
    Icon: ShieldCheck,
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-50',
    color: 'text-emerald-700',
    val: 'text-emerald-600',
  },
  amber: {
    Icon: Shield,
    border: 'border-l-amber-500',
    bg: 'bg-amber-50',
    color: 'text-amber-700',
    val: 'text-amber-600',
  },
  red: {
    Icon: ShieldAlert,
    border: 'border-l-[#E63946]',
    bg: 'bg-red-50',
    color: 'text-[#E63946]',
    val: 'text-[#E63946]',
  },
}

export function RiskCard({ risk }) {
  const t = toneMap[risk.tone] || toneMap.amber
  const { Icon } = t
  return (
    <Card title="AI Risk Assessment">
      <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 mb-3">
        <span className="text-sm text-muted">Current Risk Level</span>
        <span className={`font-mono font-semibold text-xl ${t.val}`}>{risk.level}</span>
      </div>
      <div className={`border-l-2 rounded-r-lg p-4 ${t.border} ${t.bg}`}>
        <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2 ${t.color}`}>
          <Icon size={14} />
          Risk: {risk.level}
        </div>
        <p className="text-sm text-muted leading-relaxed">
          <strong className="text-slate-900">Recommendation:</strong>
          <br />
          {risk.rec}
        </p>
        <p className="mt-3 text-xs text-muted-2">
          Monitors left–right temperature asymmetry. Alert threshold: 2.2°C differential between soles sustained over time.
        </p>
      </div>
    </Card>
  )
}
