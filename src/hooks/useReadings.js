import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const POLL_MS = 3000
const LIMIT = 30

export function useReadings(pairId) {
  const [left, setLeft] = useState([])
  const [right, setRight] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const timer = useRef(null)

  useEffect(() => {
    let cancelled = false
    if (!pairId) {
      setLeft([]); setRight([]); setLoading(false)
      return
    }
    setLoading(true)

    const fetchOnce = async () => {
      try {
        const { data, error } = await supabase
          .from('readings')
          .select('*')
          .in('sole_id', [`${pairId}-L`, `${pairId}-R`])
          .order('timestamp', { ascending: false })
          .limit(LIMIT * 2)
        if (error) throw error
        if (cancelled) return
        const rows = data || []
        setLeft(rows.filter((r) => r.sole_id === `${pairId}-L`).reverse().slice(-LIMIT))
        setRight(rows.filter((r) => r.sole_id === `${pairId}-R`).reverse().slice(-LIMIT))
        setError(null)
      } catch (e) {
        if (!cancelled) setError(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchOnce()
    timer.current = setInterval(fetchOnce, POLL_MS)
    return () => {
      cancelled = true
      clearInterval(timer.current)
    }
  }, [pairId])

  const latestLeft = left[left.length - 1] || null
  const latestRight = right[right.length - 1] || null

  return { left, right, latestLeft, latestRight, loading, error }
}
