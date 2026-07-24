import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const grid = 'rgba(255,255,255,0.04)'
const tick = { fill: '#6b7280', fontSize: 10 }

function mergeSeries(left, right) {
  const n = Math.max(left.length, right.length)
  const out = []
  for (let i = 0; i < n; i++) {
    const l = left[i]
    const r = right[i]
    const ts = new Date((l || r).timestamp).toLocaleTimeString([], {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    })
    out.push({ t: ts, left: l?.pressure ?? null, right: r?.pressure ?? null })
  }
  return out
}

export function PressureChart({ left, right, height = 180 }) {
  const data = mergeSeries(left, right)
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={grid} vertical={false} />
        <XAxis dataKey="t" tick={tick} axisLine={false} tickLine={false} minTickGap={30} />
        <YAxis
          tick={tick}
          axisLine={false}
          tickLine={false}
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={{
            background: '#1f2937',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8,
            fontSize: 12,
          }}
          labelStyle={{ color: '#9ca3af' }}
        />
        <Legend wrapperStyle={{ fontSize: 11, color: '#9ca3af' }} iconType="circle" />
        <Area type="monotone" dataKey="left" name="Left" stroke="#60a5fa" fill="url(#gLeft)" strokeWidth={2} isAnimationActive={false} />
        <Area type="monotone" dataKey="right" name="Right" stroke="#a78bfa" fill="url(#gRight)" strokeWidth={2} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
