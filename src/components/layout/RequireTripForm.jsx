import { Navigate } from 'react-router-dom'
import { useTrip } from '../../hooks/useTrip.js'

export default function RequireTripForm({ children }) {
  const { state } = useTrip()
  if (!state.form.destination.trim()) return <Navigate to="/" replace />
  return children
}
