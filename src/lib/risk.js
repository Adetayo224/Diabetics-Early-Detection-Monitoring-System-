export function calcRisk(left, right) {
  if (!left && !right) {
    return {
      level: 'Unknown',
      tone: 'amber',
      rec: 'Waiting for sensor data…',
    }
  }
  const hd = left && right ? Math.abs((left.hallux_temp || 0) - (right.hallux_temp || 0)) : 0
  const ed = left && right ? Math.abs((left.heel_temp || 0) - (right.heel_temp || 0)) : 0
  const mx = Math.max(hd, ed)
  if (mx > 2.2) {
    return {
      level: 'High',
      tone: 'red',
      rec: 'Significant temperature asymmetry between left and right soles. Contact your doctor immediately — may indicate early inflammation or circulatory issue.',
    }
  }
  if (mx > 1.5) {
    return {
      level: 'Medium',
      tone: 'amber',
      rec: 'Slight variation observed. Increase monitoring frequency. Avoid prolonged standing and schedule a check-up within 48 hours.',
    }
  }
  return {
    level: 'Low',
    tone: 'green',
    rec: 'Readings across both soles are stable and symmetrical. Continue daily monitoring and maintain your current routine.',
  }
}

export function fmtTemp(v) {
  return v != null ? `${parseFloat(v).toFixed(2)}°C` : '--'
}
export function fmtPct(v) {
  return v != null ? `${parseFloat(v).toFixed(0)}%` : '--'
}
