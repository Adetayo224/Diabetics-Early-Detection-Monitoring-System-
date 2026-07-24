export function AuthMessage({ tone = 'error', children }) {
  const cls =
    tone === 'success'
      ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
      : 'bg-red/10 border-red/25 text-red-300'
  return (
    <div className={`text-sm rounded-lg px-3 py-2.5 border mb-4 ${cls}`}>
      {children}
    </div>
  )
}
