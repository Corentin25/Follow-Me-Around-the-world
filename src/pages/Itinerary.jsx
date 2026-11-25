import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DayList from '../components/itinerary/DayList.jsx'
import EmptyItinerary from '../components/itinerary/EmptyItinerary.jsx'
import ItineraryMap from '../components/itinerary/ItineraryMap.jsx'
import Logo from '../components/layout/Logo.jsx'
import Button from '../components/ui/Button.jsx'
import Chip from '../components/ui/Chip.jsx'
import Icon from '../components/ui/Icon.jsx'
import PageTitle from '../components/ui/PageTitle.jsx'
import { usePageSetup } from '../hooks/usePageSetup.js'
import { useToast } from '../hooks/useToast.js'
import { useTrip } from '../hooks/useTrip.js'
import { cx } from '../lib/cx.js'
import { pluralize } from '../lib/format.js'
import { allVibes } from '../lib/vibes.js'
import styles from './Itinerary.module.css'

const HINT = 'Survole une étape pour la repérer sur la carte, glisse un jour par sa poignée pour le déplacer.'

export default function Itinerary() {
  const { state, dispatch } = useTrip()
  const headingRef = usePageSetup(`Itinéraire ${state.itinerary.ville}`)
  const { showToast } = useToast()
  const navigate = useNavigate()
  const days = state.itinerary.jours

  const [openDayId, setOpenDayId] = useState(() => days[0]?.id ?? null)
  const [hoverStepId, setHoverStepId] = useState(null)
  const [popDayId, setPopDayId] = useState(null)
  const timers = useRef([])
  const listRef = useRef(null)

  const focusInList = (selector) =>
    requestAnimationFrame(() => listRef.current?.querySelector(selector)?.focus())

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))

  const toggleDay = (id) => setOpenDayId((current) => (current === id ? null : id))

  const moveDay = (from, to) => {
    const moved = days[from]
    if (!moved || to < 0 || to >= days.length || from === to) return
    dispatch({ type: 'REORDER_DAYS', from, to })
    setPopDayId(moved.id)
    later(() => setPopDayId(null), 900)
  }

  const deleteDay = (id) => {
    const index = days.findIndex((d) => d.id === id)
    if (index < 0) return
    const remaining = days.filter((d) => d.id !== id)
    const nextId = remaining.length ? remaining[Math.min(index, remaining.length - 1)].id : null
    dispatch({ type: 'DELETE_DAY', id })
    if (openDayId === id) setOpenDayId(nextId)
    setHoverStepId(null)
    focusInList(nextId ? `[data-day="${nextId}"] [data-toggle]` : '[data-empty-action]')
    showToast('Jour supprimé — les numéros se sont ajustés', {
      onUndo: () => {
        dispatch({ type: 'UNDO_DELETE' })
        setOpenDayId(id)
        focusInList(`[data-day="${id}"] [data-toggle]`)
        showToast('Jour rétabli', { duration: 2200 })
      },
    })
  }

  const newTrip = () => {
    dispatch({ type: 'RESET_TRIP' })
    navigate('/')
  }

  const download = () => {
    showToast('Préparation du PDF…', { duration: 1800 })
    later(() => {
      showToast('Itinéraire prêt à imprimer', { duration: 3200 })
      later(() => window.print(), 150)
    }, 900)
  }

  const vibes = allVibes(state.form).join(', ')
  const recapParts = [pluralize(days.length, 'jour'), `${state.form.radius} km`, vibes].filter(Boolean)

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Logo size={22} className={styles.logo} />
        <div className={styles.actions}>
          <Button size="sm" onClick={newTrip}>
            <Icon name="plus" /> Nouvel itinéraire
          </Button>
          <Button size="sm" onClick={download}>
            <Icon name="download" /> Télécharger l'itinéraire
          </Button>
        </div>
      </header>

      <div className={styles.content}>
        <section ref={listRef} className={styles.list}>
          <div className={styles.summary}>
            <PageTitle ref={headingRef} text={state.itinerary.ville} className={styles.title} />
            <Chip static className={cx(styles.chip, 'rise d2')}>
              {pluralize(days.length, 'jour')}
            </Chip>
            {vibes && (
              <Chip static className={cx(styles.chip, 'rise d2')}>
                {vibes}
              </Chip>
            )}
            <Chip static className={cx(styles.chip, 'rise d2')}>
              dans un rayon de {state.form.radius} km
            </Chip>
          </div>
          <p className={cx(styles.recap, 'rise d2')}>
            {recapParts.map((part, i) => (
              <Fragment key={i}>
                {i > 0 && <span className={styles.recapDot}> · </span>}
                <span className={styles.recapItem}>{part}</span>
              </Fragment>
            ))}
          </p>
          <p className={cx('hint', styles.hint, 'rise d3')}>
            {state.demo ? `Aperçu avec des données d'exemple. ${HINT}` : HINT}
          </p>

          {days.length > 0 ? (
            <DayList
              days={days}
              openDayId={openDayId}
              popDayId={popDayId}
              hoverStepId={hoverStepId}
              onToggle={toggleDay}
              onMove={moveDay}
              onDelete={deleteDay}
              onHover={setHoverStepId}
            />
          ) : (
            <EmptyItinerary onNewTrip={newTrip} />
          )}
        </section>

        <aside className={cx(styles.aside, 'rise d3')} aria-label="Carte de l'itinéraire">
          <ItineraryMap
            days={days}
            openDayId={openDayId}
            hoverStepId={hoverStepId}
            onHover={setHoverStepId}
            onOpenDay={setOpenDayId}
          />
        </aside>
      </div>
    </main>
  )
}
