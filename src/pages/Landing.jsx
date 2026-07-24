import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth.jsx'
import {
  Footprints,
  Activity,
  BellRing,
  Pill,
  Hospital,
  Wallet,
  PersonStanding,
  Smartphone,
  Thermometer,
  Cloud,
  BatteryCharging,
  Stethoscope,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { Navbar } from '../components/marketing/Navbar.jsx'
import { GetTheApp } from '../components/marketing/GetTheApp.jsx'

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

const STEPS = [
  { Icon: Footprints, title: 'Wear', body: 'Slip on our comfortable shoe inserts with embedded temperature sensors that monitor your foot health in real-time.' },
  { Icon: Activity, title: 'Monitor', body: 'Advanced sensors continuously measure foot temperature at critical pressure points, detecting early signs of inflammation.' },
  { Icon: BellRing, title: 'Alert', body: 'When temperature differences exceed 2.2°C between feet, you and your doctor receive instant alerts for early intervention.' },
  { Icon: Pill, title: 'Prevent', body: 'Early detection allows doctors to initiate preventive treatment before ulcers develop, reducing amputation risk by up to 85%.' },
]

const IMPACT = [
  { num: '85%', body: 'Reduction in ulcer recurrence with daily temperature monitoring' },
  { num: '12M+', body: 'Adults living with diabetes in Nigeria who need this solution' },
  { num: '35%', body: 'Of diabetic patients in Africa undergo foot amputation annually' },
]

const BENEFITS = [
  { Icon: Hospital, title: 'Early Detection', body: 'Catch problems before they become serious, preventing costly hospitalizations.' },
  { Icon: Wallet, title: 'Cost Savings', body: 'Affordable prevention is cheaper than treatment. Save thousands in medical costs.' },
  { Icon: PersonStanding, title: 'Maintain Mobility', body: 'Keep your independence and quality of life by preventing amputations.' },
  { Icon: Smartphone, title: 'Remote Monitoring', body: 'Your doctor can monitor your foot health from anywhere, anytime.' },
]

const FEATURES = [
  { Icon: Thermometer, title: 'Non-Contact Monitoring', body: 'Infrared temperature sensors measure skin temperature without direct contact, preventing pressure-related complications.' },
  { Icon: Smartphone, title: 'Mobile App Integration', body: 'View real-time data, track trends, and receive alerts directly on your smartphone.' },
  { Icon: Cloud, title: 'Cloud-Based System', body: 'Secure data storage and remote access for both patients and healthcare providers.' },
  { Icon: Wallet, title: 'Affordable Solution', body: 'Designed specifically for low- and middle-income settings without compromising on quality.' },
  { Icon: BatteryCharging, title: 'Long Battery Life', body: 'Rechargeable battery system provides continuous monitoring throughout the day.' },
  { Icon: Stethoscope, title: 'Doctor Dashboard', body: 'Healthcare providers can monitor multiple patients and respond to alerts promptly.' },
]

const TESTIMONIALS = [
  { text: 'This is exactly what Nigeria needs! My father lost his leg to diabetes complications. If we had this technology then, his life would be completely different today. This will save countless lives.', by: 'Healthcare Professional, Lagos' },
  { text: 'As someone living with diabetes, the constant worry about foot complications keeps me up at night. Having a device that can warn me before problems start would give me so much peace of mind. This is revolutionary!', by: 'Diabetic Patient, Ibadan' },
  { text: 'The approach is brilliant—catching inflammation before ulcers form. Evidence shows temperature monitoring works, but it\'s never been accessible here. Making it affordable for Nigerian patients is game-changing.', by: 'Endocrinologist, Abuja' },
  { text: 'I\'ve seen too many patients come in with advanced ulcers that could have been prevented. A tool like this for daily monitoring would transform diabetes care in our community. We desperately need this.', by: 'Diabetes Nurse Educator, Port Harcourt' },
  { text: 'The combination of IoT technology and medical expertise is impressive. This addresses a real gap in preventive care. I\'m excited to see how this will reduce amputation rates in Nigeria.', by: 'Medical Technology Researcher, LAUTECH' },
  { text: 'Finally, a solution designed for our context! Not a foreign device adapted for Africa, but built from the ground up for Nigerian patients. The impact on public health could be enormous.', by: 'Public Health Official, Ministry of Health' },
]

const TEAM = [
  {
    name: 'Prof. Michael Adeyemi Olamoyegun',
    role: 'Team Lead',
    img: 'https://i.imgur.com/bmuXl4n.jpeg',
    bio: 'Professor of Medicine/Consultant Endocrinologist, Diabetes & Metabolism. Founder of the Save A Limb in Diabetes (SALID) and mDiabetes initiatives at LAUTECH.',
    linkedin: 'https://linkedin.com/in/michael-olamoyegun',
  },
  {
    name: 'Prof. Tesleem Babatunde Asafa',
    role: 'Professor of Mechanical Engineering',
    img: 'https://i.imgur.com/UtBaQP4.jpeg',
    bio: 'Professor of Mechanical Engineering at LAUTECH. Expertise in manufacturing, system design, and materials development.',
  },
  {
    name: 'Saka Adetayo Muhammed',
    role: 'Embedded Hardware Engineer',
    img: 'https://i.imgur.com/3KuT9G8.jpeg',
    bio: 'Mechanical Engineering graduate specializing in embedded systems, IoT solutions, and robotics.',
    linkedin: 'https://linkedin.com/in/adetayo-saka-573312238',
  },
  {
    name: 'Bello Abdullahi',
    role: 'Embedded Software Engineer',
    img: 'https://i.imgur.com/7nJlv80.jpeg',
    bio: 'Electronic and Mechanical Engineering student skilled in embedded programming, microcontrollers, and IoT integration.',
  },
]

function SectionTitle({ children, subtitle, kicker }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      {kicker && (
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E63946] mb-3">
          {kicker}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
        {children}
      </h2>
      {subtitle && <p className="mt-3 text-slate-600 text-base leading-relaxed">{subtitle}</p>}
    </div>
  )
}

export default function Landing() {
  const { user, loading } = useAuth()
  if (!loading && user) return <Navigate to="/app/overview" replace />

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar />

      {/* HERO */}
      <section
        id="home"
        className="pt-32 pb-24 px-6 relative overflow-hidden bg-white"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 20%, rgba(21,101,192,0.10) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(230,57,70,0.08) 0%, transparent 45%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage:
                'radial-gradient(ellipse at center, black 40%, transparent 75%)',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600 font-medium mb-8">
              <ShieldCheck size={13} className="text-[#E63946]" />
              Smart Sole Platform · LAUTECH
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-5 text-slate-900">
              Preventing amputations,<br />
              <span className="text-[#E63946]">before they begin.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-9 leading-relaxed">
              Diamon is an early-detection platform for diabetic foot complications. Smart soles monitor
              temperature and pressure continuously, so patients and doctors can act days before an ulcer forms.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-[#E63946] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#c1121f] transition shadow-sm"
              >
                Launch App <ArrowRight size={16} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 border border-slate-300 text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-slate-50 transition"
              >
                See How It Works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto">
        <SectionTitle kicker="How it works" subtitle="Four simple steps between putting the soles on and preventing a hospital visit.">
          From wearing to preventing
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              {...fade}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-sm transition"
            >
              <div className="absolute top-6 right-6 text-xs font-mono text-slate-400">
                0{i + 1}
              </div>
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 text-white mb-5">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="py-24 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <SectionTitle kicker="Impact" subtitle="The problem is measurable — so is the difference monitoring can make.">
            Why this matters
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {IMPACT.map(({ num, body }) => (
              <motion.div
                key={num}
                {...fade}
                className="bg-white border border-slate-200 rounded-2xl p-8 text-center"
              >
                <div className="text-5xl font-semibold text-[#E63946] mb-2 tracking-tight">
                  {num}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="text-center text-lg font-semibold text-slate-900 mb-6">
            Life-changing benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map(({ Icon, title, body }) => (
              <motion.div
                key={title}
                {...fade}
                className="bg-white border border-slate-200 rounded-xl p-5"
              >
                <Icon size={18} className="text-slate-500 mb-3" />
                <h4 className="font-semibold text-slate-900 text-sm mb-1.5">{title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle kicker="The problem" subtitle="Why diabetic foot ulcers keep causing amputations — and what current care misses.">
            A silent crisis
          </SectionTitle>
          <motion.div
            {...fade}
            className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10"
          >
            <div className="flex items-center gap-2 text-[#E63946] mb-4">
              <AlertTriangle size={20} />
              <h3 className="text-lg font-semibold text-slate-900">Diabetes in Nigeria</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6">
              Over 589 million people globally live with diabetes, with 81% in low- and middle-income countries.
              In Nigeria alone, over 12 million adults are affected, making diabetes the leading cause of limb
              amputation after road traffic accidents.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-slate-900 font-semibold mb-3">The current reality</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-[#E63946]">•</span> 6.3% of people with diabetes undergo foot amputation annually (7.2% in Africa)</li>
                  <li className="flex gap-2"><span className="text-[#E63946]">•</span> Diabetic foot ulcers account for 1 in 4 diabetes hospital admissions</li>
                  <li className="flex gap-2"><span className="text-[#E63946]">•</span> 35.4% of DFU patients undergo amputation during hospitalization</li>
                  <li className="flex gap-2"><span className="text-[#E63946]">•</span> 20.5% die during hospitalization</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-900 font-semibold mb-3">Why current methods fail</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-[#E63946]">•</span> Annual foot exams are too infrequent to catch early changes</li>
                  <li className="flex gap-2"><span className="text-[#E63946]">•</span> Pre-ulcerative inflammation goes undetected until it's too late</li>
                  <li className="flex gap-2"><span className="text-[#E63946]">•</span> No affordable, accessible daily monitoring solution exists</li>
                  <li className="flex gap-2"><span className="text-[#E63946]">•</span> By the time symptoms appear, significant damage has occurred</li>
                </ul>
              </div>
            </div>

            <p className="mt-8 pt-6 border-t border-slate-200 font-semibold text-slate-900">
              Diamon changes this. <span className="text-[#E63946]">We catch the problem before it starts.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <SectionTitle kicker="Features" subtitle="Purpose-built for daily use in low- and middle-income care settings.">
            Built for real care, real budgets
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ Icon, title, body }) => (
              <motion.div
                key={title}
                {...fade}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-sm hover:border-slate-300 transition"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 text-slate-900 mb-4">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GET THE APP */}
      <section id="get-app" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle kicker="Get the app" subtitle="Available soon on iOS and Android. Sign up on the web today and we'll notify you when the mobile apps go live.">
            Take Diamon anywhere
          </SectionTitle>
          <GetTheApp variant="light" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E63946] mb-3">
              What people are saying
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Voices from the ground
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                {...fade}
                transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
              >
                <p className="italic text-black leading-relaxed mb-4 text-sm font-medium">"{t.text}"</p>
                <p className="text-[#E63946] font-semibold text-xs">— {t.by}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle kicker="Team" subtitle="Clinicians and engineers building this together at LAUTECH, Ogbomoso.">
            The people behind Diamon
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TEAM.map((m) => (
              <motion.div
                key={m.name}
                {...fade}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-80 bg-slate-100 overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-semibold text-slate-900 text-xl md:text-2xl">{m.name}</h3>
                  <p className="text-[#E63946] text-sm font-semibold mt-1.5">{m.role}</p>
                  <p className="text-base text-slate-600 leading-relaxed mt-4">{m.bio}</p>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 text-sm mt-5 font-medium transition"
                    >
                      <Linkedin size={16} /> LinkedIn
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <SectionTitle kicker="Contact" subtitle="Have questions or want to learn more about Diamon? We'd love to hear from you.">
            Get in touch
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ContactCard Icon={Mail} title="Email" lines={['info@diamon.health', 'support@diamon.health']} btn="Send Email" href="mailto:info@diamon.health" />
            <ContactCard Icon={Phone} title="Phone" lines={['+234 800 123 4567', '+234 800 987 6543']} btn="Call Now" href="tel:+2348001234567" />
            <ContactCard Icon={MapPin} title="Location" lines={['LAUTECH,', 'Ogbomoso, Nigeria']} btn="View Map" href="https://goo.gl/maps/XXXX" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-10 px-6 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Diamon — Saving Limbs, Restoring Lives.</p>
        <p className="mt-1">Built for a healthier Nigeria.</p>
      </footer>
    </div>
  )
}

function ContactCard({ Icon, title, lines, btn, href }) {
  return (
    <motion.div
      {...fade}
      className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-sm hover:border-slate-300 transition"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white mb-4">
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-3">{title}</h3>
      {lines.map((l) => (
        <p key={l} className="text-sm text-slate-600">{l}</p>
      ))}
      <a
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        className="inline-block mt-5 bg-[#E63946] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#c1121f] transition"
      >
        {btn}
      </a>
    </motion.div>
  )
}
