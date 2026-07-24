import { createContext, useContext, useState, useCallback } from 'react'
import { useAuth } from './useAuth.jsx'

const Ctx = createContext(null)

export function ViewingPairProvider({ children }) {
  const { pairId } = useAuth()
  const [viewingPair, setViewingPair] = useState(pairId)

  const setPair = useCallback((v) => setViewingPair(v), [])

  return (
    <Ctx.Provider value={{ viewingPair: viewingPair || pairId, setPair }}>
      {children}
    </Ctx.Provider>
  )
}

export function useViewingPair() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useViewingPair must be used within ViewingPairProvider')
  return ctx
}
