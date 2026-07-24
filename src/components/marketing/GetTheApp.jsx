import { Apple, Play } from 'lucide-react'

export function StoreBadge({ store }) {
  if (store === 'apple') {
    return (
      <a
        href="#"
        className="inline-flex items-center gap-3 bg-slate-900 text-white rounded-xl px-4 py-2.5 hover:bg-black transition min-w-[180px]"
        aria-label="Download on the App Store"
      >
        <Apple size={26} strokeWidth={1.5} />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[0.65rem] text-white/70">Download on the</span>
          <span className="text-base font-semibold -mt-0.5">App Store</span>
        </span>
      </a>
    )
  }
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 bg-slate-900 text-white rounded-xl px-4 py-2.5 hover:bg-black transition min-w-[180px]"
      aria-label="Get it on Google Play"
    >
      <Play size={22} strokeWidth={1.5} fill="currentColor" />
      <span className="flex flex-col leading-tight text-left">
        <span className="text-[0.65rem] text-white/70">GET IT ON</span>
        <span className="text-base font-semibold -mt-0.5">Google Play</span>
      </span>
    </a>
  )
}

export function GetTheApp({ compact = false, variant = 'dark', id }) {
  if (compact) {
    const isLight = variant === 'light'
    return (
      <div
        className={`rounded-2xl p-5 text-center ${
          isLight
            ? 'bg-slate-50 border border-slate-200'
            : 'bg-surface/60 backdrop-blur border border-white/[0.07]'
        }`}
      >
        <p className={`text-sm mb-3 ${isLight ? 'text-slate-600' : 'text-muted'}`}>
          Get the Diamon app on your phone
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <StoreBadge store="apple" />
          <StoreBadge store="google" />
        </div>
      </div>
    )
  }

  // Full-width block. Two color variants.
  if (variant === 'light') {
    return (
      <div id={id} className="flex flex-wrap gap-3 justify-center">
        <StoreBadge store="apple" />
        <StoreBadge store="google" />
      </div>
    )
  }

  return (
    <section id={id} className="px-6 py-20 bg-gradient-to-br from-navy via-[#0f1e3a] to-navy">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          Get the Diamon App
        </h2>
        <p className="text-muted max-w-xl mx-auto mb-8">
          Real-time sole readings, alerts, and doctor-shared reports — right in your
          pocket. Available soon on iOS and Android.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <StoreBadge store="apple" />
          <StoreBadge store="google" />
        </div>
      </div>
    </section>
  )
}
