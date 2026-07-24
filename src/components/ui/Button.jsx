export function Button({ variant = 'primary', className = '', children, ...rest }) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed'
  const sizes = 'px-4 py-2.5 text-sm'
  const variants = {
    primary: 'text-white bg-[#E63946] hover:bg-[#c1121f] shadow-sm',
    danger: 'text-red-600 bg-red-50 border border-red-200 hover:bg-red-100',
    ghost: 'text-muted hover:text-slate-900 hover:bg-slate-100',
    outline: 'text-slate-900 border border-slate-300 hover:bg-slate-50',
  }
  return (
    <button className={`${base} ${sizes} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
