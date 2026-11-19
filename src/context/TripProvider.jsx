import { useMemo, useReducer } from 'react'
import { isKeyRemembered, loadApiKey } from '../services/storage.js'
import { TripContext } from './TripContext.js'
import { createInitialState, tripReducer } from './tripReducer.js'

export default function TripProvider({ children }) {
  const [state, dispatch] = useReducer(tripReducer, undefined, () =>
    createInitialState({ apiKey: loadApiKey(), remember: isKeyRemembered() }),
  )
  const value = useMemo(() => ({ state, dispatch }), [state])
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}
