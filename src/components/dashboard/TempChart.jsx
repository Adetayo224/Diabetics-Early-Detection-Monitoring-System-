import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const grid = 'rgba(15,23,42,0.08)'
const tick = { fill: '#64748b', fontSize: 10 }

function mergeSeries(left, right) {
  const n = Math.max(left.length, right.length)
  const out = []
  for (let i = 0; i < n; i++) {
    const l = left[i]
    const r = right[i]
    const ts = new Date((l || r).timestamp).toLocaleTimeString([], {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    })
    out.push({
      t: ts,
      lHallux: l?.hallux_temp ?? null,
      lHeel: l?.heel_temp ?? null,
      rHallux: r?.hallux_temp ?? null,
      rHeel: r?.heel_temp ?? null,
    })
  }
  return out
}

export function TempChart({ left, right, height = 220 }) {
  const data = mergeSeries(left, right)
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={grid} vertical={false} />
        <XAxis dataKey="t" tick={tick} axisLine={false} tickLine={false} minTickGap={30} />
        <YAxis
          tick={tick}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v.toFixed(1)}°C`}
          domain={['auto', 'auto']}
        />
        <Tooltip
          contentStyle={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            fontSize: 12,
            color: '#0f172a',
          }}
          labelStyle={{ color: '#475569' }}
        />
        <Legend wrapperStyle={{ fontSize: 11, color: '#475569' }} iconType="circle" />
        <Line type="monotone" dataKey="lHallux" name="L-Hallux" stroke="#60a5fa" dot={false} strokeWidth={2} isAnimationActive={false} />
        <Line type="monotone" dataKey="lHeel" name="L-Heel" stroke="#f87171" dot={false} strokeWidth={2} isAnimationActive={false} />
        <Line type="monotone" dataKey="rHallux" name="R-Hallux" stroke="#a78bfa" dot={false} strokeWidth={2} strokeDasharray="5 3" isAnimationActive={false} />
        <Line type="monotone" dataKey="rHeel" name="R-Heel" stroke="#fb923c" dot={false} strokeWidth={2} strokeDasharray="5 3" isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
