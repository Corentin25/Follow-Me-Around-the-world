import { useContext } from 'react'
import { TripContext } from '../context/TripContext.js'

export function useTrip() {
  const ctx = useContext(TripContext)
  if (!ctx) throw new Error('useTrip() doit être utilisé à l’intérieur de <TripProvider>.')
  return ctx
}
