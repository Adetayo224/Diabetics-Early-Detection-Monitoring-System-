export function Logo({ size = 32, withWordmark = true, className = '' }) {
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
        <span className="text-white font-semibold tracking-tight text-lg">Diamon</span>
      )}
    </div>
  )
}
