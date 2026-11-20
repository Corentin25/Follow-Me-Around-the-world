import { Navigate } from 'react-router-dom'
import { useTrip } from '../../hooks/useTrip.js'

export default function RequireTripAccess({ children }) {
  const { state } = useTrip()
  if (!state.apiKey && !state.demo) return <Navigate to="/cle" replace />
  return children
}
