export function AuthMessage({ tone = 'error', children }) {
  const cls =
    tone === 'success'
      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
      : 'bg-red-50 border-red-200 text-[#E63946]'
  return (
    <div className={`text-sm rounded-lg px-3 py-2.5 border mb-4 ${cls}`}>
      {children}
    </div>
  )
}
