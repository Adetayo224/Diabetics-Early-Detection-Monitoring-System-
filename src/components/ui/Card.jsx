export function Card({ className = '', children, title, action }) {
  return (
    <div className={`bg-surface border border-white/[0.07] rounded-card p-5 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <div className="text-[0.72rem] font-medium text-muted-2 uppercase tracking-[0.08em]">
              {title}
            </div>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
