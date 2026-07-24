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
} from 'lucide-react'
import { Navbar } from '../components/marketing/Navbar.jsx'
import { GetTheApp, StoreBadge } from '../components/marketing/GetTheApp.jsx'

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

const STEPS = [
  { Icon: Footprints, title: 'Step 1: Wear', body: 'Slip on our comfortable shoe inserts with embedded temperature sensors that monitor your foot health in real-time.' },
  { Icon: Activity, title: 'Step 2: Monitor', body: 'Advanced sensors continuously measure foot temperature at critical pressure points, detecting early signs of inflammation.' },
  { Icon: BellRing, title: 'Step 3: Alert', body: 'When temperature differences exceed 2.2°C between feet, you and your doctor receive instant alerts for early intervention.' },
  { Icon: Pill, title: 'Step 4: Prevent', body: 'Early detection allows doctors to initiate preventive treatment before ulcers develop, reducing amputation risk by up to 85%.' },
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
    bio: 'Professor of Medicine/Consultant Endocrinologist, Diabetes & Metabolism with expertise in diabetes complications, including prevention of foot ulcers. Over a decade of leadership as Head, Endocrinology, Diabetes & Metabolism Unit at LAUTECH Teaching Hospital and LAUTECH. Founder of the Save A Limb in Diabetes (SALID) Initiative and mDiabetes Initiative.',
    linkedin: 'https://linkedin.com/in/michael-olamoyegun',
  },
  {
    name: 'Prof. Tesleem Babatunde Asafa',
    role: 'Professor of Mechanical Engineering',
    img: 'https://i.imgur.com/UtBaQP4.jpeg',
    bio: 'Professor of Mechanical Engineering at LAUTECH. Holds B.Tech, MSc, and PhD degrees with expertise in manufacturing, system design, and materials development. Widely published, awarded, and a mentor to hackathon-winning students.',
  },
  {
    name: 'Saka Adetayo Muhammed',
    role: 'Embedded Hardware Engineer',
    img: 'https://i.imgur.com/3KuT9G8.jpeg',
    bio: 'Mechanical Engineering graduate specializing in embedded systems, IoT solutions, and robotics. Multiple award-winning innovator with notable achievements in various engineering competitions.',
    linkedin: 'https://linkedin.com/in/adetayo-saka-573312238',
  },
  {
    name: 'Bello Abdullahi',
    role: 'Embedded Software Engineer',
    img: 'https://i.imgur.com/7nJlv80.jpeg',
    bio: '400-level Electronic and Mechanical Engineering student skilled in embedded programming, microcontrollers, and IoT integration. Experienced in firmware development and multidisciplinary engineering projects.',
  },
]

function SectionTitle({ children, subtitle }) {
  return (
    <motion.div {...fade} className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{children}</h2>
      <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-red to-amber-400" />
      {subtitle && <p className="text-muted mt-4 max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  )
}

export default function Landing() {
  const { user, loading } = useAuth()
  if (!loading && user) return <Navigate to="/app/overview" replace />

  return (
    <div className="min-h-screen bg-navy text-white">
      <Navbar />

      {/* HERO */}
      <section
        id="home"
        className="pt-32 pb-24 px-6 relative overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 20% 40%, rgba(21,101,192,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(230,57,70,0.28) 0%, transparent 50%), #0a1628',
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-white/80 mb-6">
              <Footprints size={14} />
              Smart Sole Platform · LAUTECH
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">Diamon</h1>
            <p className="text-xl md:text-2xl italic text-amber-300 mb-4">
              Walking Towards Hope… Preventing Amputations Before They Begin.
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Revolutionary early detection system for diabetic foot complications using smart temperature monitoring technology.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-red to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:opacity-95 transition"
              >
                Launch App <ArrowRight size={16} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/[0.05] transition"
              >
                See How It Works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6 max-w-6xl mx-auto">
        <SectionTitle>How It Works</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              {...fade}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-surface border border-white/[0.07] rounded-2xl p-6 text-center hover:-translate-y-1 hover:border-blue-500/40 transition"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue/15 text-blue-400 mb-4">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="py-20 px-6 max-w-6xl mx-auto">
        <SectionTitle>Our Impact & Benefits</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {IMPACT.map(({ num, body }) => (
            <motion.div
              key={num}
              {...fade}
              className="rounded-2xl p-8 text-center text-white bg-gradient-to-br from-red to-red-600"
            >
              <div className="text-5xl font-bold mb-2">{num}</div>
              <p className="text-white/90">{body}</p>
            </motion.div>
          ))}
        </div>
        <h3 className="text-center text-xl font-semibold mb-6">Life-Changing Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map(({ Icon, title, body }) => (
            <motion.div
              key={title}
              {...fade}
              className="bg-surface border border-white/[0.07] rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 text-red-300 mb-2">
                <Icon size={18} />
                <h4 className="font-semibold text-white">{title}</h4>
              </div>
              <p className="text-sm text-muted">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <SectionTitle>The Problem We're Solving</SectionTitle>
        <motion.div
          {...fade}
          className="bg-surface border-l-4 border-red rounded-2xl p-8"
        >
          <div className="flex items-center gap-2 text-red-300 mb-3">
            <AlertTriangle size={22} />
            <h3 className="text-xl font-semibold text-white">A Silent Crisis in Nigeria</h3>
          </div>
          <p className="text-muted leading-relaxed mb-4">
            Over 589 million people globally live with diabetes, with 81% in low- and middle-income countries.
            In Nigeria alone, over 12 million adults are affected, making diabetes the leading cause of limb
            amputation after road traffic accidents.
          </p>
          <p className="text-white font-semibold mb-2">The Current Reality:</p>
          <ul className="list-disc list-inside text-muted space-y-1 mb-4">
            <li>6.3% of people with diabetes undergo foot amputation annually (7.2% in Africa)</li>
            <li>Diabetic foot ulcers account for 1 in 4 diabetes hospital admissions</li>
            <li>35.4% of DFU patients undergo amputation during hospitalization</li>
            <li>20.5% die during hospitalization</li>
          </ul>
          <p className="text-white font-semibold mb-2">Why Current Methods Fail:</p>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li>Annual foot exams are too infrequent to catch early changes</li>
            <li>Pre-ulcerative inflammation goes undetected until it's too late</li>
            <li>No affordable, accessible daily monitoring solution exists</li>
            <li>By the time symptoms appear, significant damage has occurred</li>
          </ul>
          <p className="mt-6 font-semibold text-red-300 text-lg">
            Diamon changes this. We catch the problem before it starts.
          </p>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <SectionTitle>Key Features</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ Icon, title, body }) => (
            <motion.div
              key={title}
              {...fade}
              className="bg-surface border border-white/[0.07] rounded-2xl p-6 hover:-translate-y-1 transition"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue/15 text-blue-400 mb-4">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GET THE APP */}
      <GetTheApp id="get-app" />

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0f1e3a] to-navy">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>What People Are Saying</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                {...fade}
                transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
                className="bg-white/[0.05] backdrop-blur border border-white/[0.1] rounded-2xl p-6"
              >
                <p className="italic text-white/85 leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-amber-300 font-semibold text-sm">— {t.by}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-20 px-6 max-w-6xl mx-auto">
        <SectionTitle>Meet Our Team</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((m) => (
            <motion.div
              key={m.name}
              {...fade}
              className="bg-surface border border-white/[0.07] rounded-2xl overflow-hidden hover:-translate-y-1 transition"
            >
              <div className="h-56 bg-surface-2 overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-white">{m.name}</h3>
                <p className="text-red-300 text-sm font-semibold mt-0.5">{m.role}</p>
                <p className="text-sm text-muted leading-relaxed mt-3">{m.bio}</p>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-400 text-sm mt-3 hover:underline"
                  >
                    <Linkedin size={14} /> LinkedIn
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Have questions or want to learn more about Diamon? We'd love to hear from you.">
            Get In Touch
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ContactCard Icon={Mail} title="Email" lines={['info@diamon.health', 'support@diamon.health']} btn="Send Email" href="mailto:info@diamon.health" />
            <ContactCard Icon={Phone} title="Phone" lines={['+234 800 123 4567', '+234 800 987 6543']} btn="Call Now" href="tel:+2348001234567" />
            <ContactCard Icon={MapPin} title="Location" lines={['LAUTECH,', 'Ogbomoso, Nigeria']} btn="View Map" href="https://goo.gl/maps/XXXX" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.07] bg-navy py-8 px-6 text-center text-sm text-muted">
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
      className="bg-surface border border-white/[0.07] rounded-2xl p-6 text-center hover:-translate-y-1 hover:border-blue-500/40 transition"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue/15 text-blue-400 mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {lines.map((l) => (
        <p key={l} className="text-sm text-muted">{l}</p>
      ))}
      <a
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        className="inline-block mt-4 bg-gradient-to-br from-red to-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-95 transition"
      >
        {btn}
      </a>
    </motion.div>
  )
}
