export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="text-center py-12 px-6">
      {Icon && (
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-50 text-muted mb-4">
          <Icon size={26} strokeWidth={1.5} />
        </div>
      )}
      {title && <h3 className="text-base font-medium text-slate-900 mb-1">{title}</h3>}
      {description && <p className="text-sm text-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
