export function Logo({ size = 32, withWordmark = true, tone = 'dark', className = '' }) {
  const textColor = tone === 'light' ? 'text-slate-900' : 'text-white'
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo.png"
        alt="Diamon"
        width={size}
        height={size}
        className="rounded-lg object-contain"
        style={{ width: size, height: size }}
      />
      {withWordmark && (
        <span className={`${textColor} font-semibold tracking-tight text-lg`}>Diamon</span>
      )}
    </div>
  )
}
