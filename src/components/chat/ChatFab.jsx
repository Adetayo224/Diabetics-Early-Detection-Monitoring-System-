import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, X, Send } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.jsx'
import { useViewingPair } from '../../hooks/useViewingPair.jsx'
import { useReadings } from '../../hooks/useReadings.js'
import { calcRisk, fmtTemp, fmtPct } from '../../lib/risk.js'

function replyFor(msg, { latestLeft, latestRight, pairId }) {
  const m = msg.toLowerCase()
  const L = latestLeft, R = latestRight
  if (m.includes('temp') || m.includes('temperature'))
    return `Left — Hallux: ${fmtTemp(L?.hallux_temp)}, Heel: ${fmtTemp(L?.heel_temp)}. Right — Hallux: ${fmtTemp(R?.hallux_temp)}, Heel: ${fmtTemp(R?.heel_temp)}. Asymmetry >2.2°C sustained for hours signals early inflammation.`
  if (m.includes('pressure'))
    return `Left: ${fmtPct(L?.pressure)} (${L?.pressure_level || '--'}). Right: ${fmtPct(R?.pressure)} (${R?.pressure_level || '--'}). Uneven load combined with temperature asymmetry is a strong early ulceration signal.`
  if (m.includes('left'))
    return `Left sole (${pairId || '?'}-L): Hallux ${fmtTemp(L?.hallux_temp)}, Heel ${fmtTemp(L?.heel_temp)}, Pressure ${fmtPct(L?.pressure)}.`
  if (m.includes('right'))
    return `Right sole (${pairId || '?'}-R): Hallux ${fmtTemp(R?.hallux_temp)}, Heel ${fmtTemp(R?.heel_temp)}, Pressure ${fmtPct(R?.pressure)}.`
  if (m.includes('risk') || m.includes('danger')) {
    const r = calcRisk(L, R)
    return `Risk: ${r.level}. ${r.rec}`
  }
  if (m.includes('ulcer'))
    return 'Diabetic foot ulcers develop from undetected inflammation. Dual-sensor monitoring catches temperature rises before visible damage, reducing amputation risk significantly.'
  if (m.includes('hi') || m.includes('hello'))
    return 'Hello! Ask me about left or right sole readings, risk level, pressure, or diabetes foot care.'
  return 'I can help with temperature, pressure, risk assessment, and foot care. Try "what is my left sole temperature?" or "what is my risk level?"'
}

export function ChatFab() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([
    { who: 'bot', text: 'Hi! Ask me about your foot health readings, risk levels, or diabetes care tips.' },
  ])
  const [input, setInput] = useState('')
  const { role, pairId: myPair } = useAuth()
  const { viewingPair } = useViewingPair()
  const pairId = role === 'doctor' ? viewingPair : myPair
  const { latestLeft, latestRight } = useReadings(pairId)

  const send = () => {
    const t = input.trim()
    if (!t) return
    setMsgs((m) => [...m, { who: 'user', text: t }])
    setInput('')
    setTimeout(() => {
      const answer = replyFor(t, { latestLeft, latestRight, pairId })
      setMsgs((m) => [...m, { who: 'bot', text: answer }])
    }, 500)
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-7 right-7 w-14 h-14 rounded-full bg-gradient-to-br from-red to-red-600 flex items-center justify-center shadow-[0_4px_20px_rgba(230,57,70,0.4)] hover:scale-110 transition z-50"
        aria-label="AI health assistant"
      >
        <Bot size={22} className="text-white" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-24 right-7 w-[340px] max-w-[calc(100%-2rem)] h-[480px] bg-surface border border-white/[0.07] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col z-50"
          >
            <div className="px-4 py-3 border-b border-white/[0.07] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-red-300" />
                <h4 className="text-sm font-semibold">AI Health Assistant</h4>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-2 hover:text-white transition"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    m.who === 'user'
                      ? 'bg-blue-500 text-white self-end'
                      : 'bg-surface-2 self-start'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/[0.07] flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask anything…"
                className="flex-1 bg-surface-2 border border-white/[0.07] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition"
              />
              <button
                onClick={send}
                className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition"
                aria-label="Send"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
