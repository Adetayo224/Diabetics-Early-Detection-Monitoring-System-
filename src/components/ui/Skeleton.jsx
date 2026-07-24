export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-white/[0.06] rounded ${className}`}
      aria-hidden="true"
    />
  )
}
