import { Apple, Play } from 'lucide-react'

export function StoreBadge({ store }) {
  if (store === 'apple') {
    return (
      <a
        href="#"
        className="inline-flex items-center gap-3 bg-black text-white rounded-xl px-4 py-2.5 border border-white/10 hover:border-white/25 transition min-w-[180px]"
        aria-label="Download on the App Store"
      >
        <Apple size={26} strokeWidth={1.5} />
        <span className="flex flex-col leading-tight">
          <span className="text-[0.65rem] text-white/70">Download on the</span>
          <span className="text-base font-semibold -mt-0.5">App Store</span>
        </span>
      </a>
    )
  }
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 bg-black text-white rounded-xl px-4 py-2.5 border border-white/10 hover:border-white/25 transition min-w-[180px]"
      aria-label="Get it on Google Play"
    >
      <Play size={22} strokeWidth={1.5} fill="currentColor" />
      <span className="flex flex-col leading-tight">
        <span className="text-[0.65rem] text-white/70">GET IT ON</span>
        <span className="text-base font-semibold -mt-0.5">Google Play</span>
      </span>
    </a>
  )
}

export function GetTheApp({ compact = false, id }) {
  if (compact) {
    return (
      <div className="bg-surface/60 backdrop-blur border border-white/[0.07] rounded-2xl p-5 text-center">
        <p className="text-sm text-muted mb-3">Get the Diamon app on your phone</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <StoreBadge store="apple" />
          <StoreBadge store="google" />
        </div>
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
