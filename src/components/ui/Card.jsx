export function Card({ className = '', children, title, action }) {
  return (
    <div className={`bg-white border border-slate-200 rounded-card p-5 shadow-sm ${className}`}>
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
