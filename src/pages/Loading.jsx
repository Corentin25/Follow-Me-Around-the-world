import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingOrbit from '../components/loading/LoadingOrbit.jsx'
import Button from '../components/ui/Button.jsx'
import { usePageSetup } from '../hooks/usePageSetup.js'
import { useTrip } from '../hooks/useTrip.js'
import { isAbortError, wait } from '../lib/async.js'
import { cx } from '../lib/cx.js'
import { fetchItinerary } from '../services/itinerary.js'
import styles from './Loading.module.css'

const MESSAGES = [
  'Je dépoussière la boussole…',
  'Je repère les meilleures adresses…',
  'Je trace ta route, jour après jour…',
  'Dernières vérifications avant le décollage…',
]
const MESSAGE_INTERVAL_MS = 1700
const DEMO_DURATION_MS = MESSAGES.length * MESSAGE_INTERVAL_MS
const MIN_DURATION_MS = 2500
const GENERIC_ERROR = "Oups, je n'ai pas réussi à préparer ton itinéraire. Réessaie dans un instant."

export default function Loading() {
  const headingRef = usePageSetup('Chargement')
  const { state, dispatch } = useTrip()
  const navigate = useNavigate()
  const [messageIndex, setMessageIndex] = useState(0)
  const controller = useRef(null)
  const { demo, apiKey, form } = state

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, MESSAGES.length - 1))
    }, MESSAGE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const abort = new AbortController()
    controller.current = abort
    const startedAt = Date.now()
    const minDuration = demo ? DEMO_DURATION_MS : MIN_DURATION_MS
    dispatch({ type: 'REQUEST_START' })

    fetchItinerary({ demo, apiKey, form }, { signal: abort.signal })
      .then(async (itinerary) => {
        await wait(minDuration - (Date.now() - startedAt), abort.signal)
        dispatch({ type: 'SET_ITINERARY', itinerary })
        navigate('/itineraire', { replace: true })
      })
      .catch((error) => {
        if (isAbortError(error)) return
        dispatch({ type: 'REQUEST_ERROR', message: error?.message || GENERIC_ERROR })
        navigate('/voyage', { replace: true, state: { step: 4 } })
      })

    return () => abort.abort()
  }, [demo, apiKey, form, dispatch, navigate])

  const cancel = () => {
    controller.current?.abort()
    dispatch({ type: 'REQUEST_CANCEL' })
    navigate('/voyage', { replace: true, state: { step: 4 } })
  }

  const progress = ((messageIndex + 1) / MESSAGES.length) * 100

  return (
    <section className={styles.page} aria-live="polite" aria-busy="true">
      <h1 ref={headingRef} tabIndex={-1} className="visually-hidden">
        Préparation de ton itinéraire
      </h1>
      <LoadingOrbit />
      <div className={styles.messages}>
        {MESSAGES.map((text, i) => (
          <p key={text} className={cx(styles.message, i === messageIndex && styles.on)} aria-hidden={i !== messageIndex}>
            {text}
          </p>
        ))}
      </div>
      <div className={styles.bar} aria-hidden="true">
        <div className={styles.barFill} style={{ width: `${progress}%` }} />
      </div>
      <Button variant="link" onClick={cancel}>
        Annuler
      </Button>
    </section>
  )
}
