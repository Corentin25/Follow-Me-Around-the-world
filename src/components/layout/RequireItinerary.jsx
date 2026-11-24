import { Navigate } from 'react-router-dom'
import { useTrip } from '../../hooks/useTrip.js'

export default function RequireItinerary({ children }) {
  const { state } = useTrip()
  if (!state.itinerary) return <Navigate to="/" replace />
  return children
}
