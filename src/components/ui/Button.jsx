export function Button({ variant = 'primary', className = '', children, ...rest }) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed'
  const sizes = 'px-4 py-2.5 text-sm'
  const variants = {
    primary: 'text-white bg-gradient-to-br from-blue-500 to-blue-600 hover:opacity-90',
    danger: 'text-red-300 bg-red/10 border border-red/25 hover:bg-red/20',
    ghost: 'text-muted hover:text-white hover:bg-surface-2',
    outline: 'text-white border border-white/15 hover:bg-white/5',
  }
  return (
    <button className={`${base} ${sizes} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
