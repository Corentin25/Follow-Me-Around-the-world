import 'leaflet/dist/leaflet.css'
import { AttributionControl, MapContainer, Polyline, TileLayer } from 'react-leaflet'
import { cx } from '../../lib/cx.js'
import styles from './ItineraryMap.module.css'
import MapFitter from './MapFitter.jsx'
import StepMarker from './StepMarker.jsx'

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">les contributeurs d’OpenStreetMap</a>'

export default function ItineraryMap({ days, openDayId, hoverStepId, onHover, onOpenDay, className }) {
  const first = days[0]?.etapes[0]
  const center = first ? [first.latitude, first.longitude] : [20, 0]
  const routes = [...days].sort((a, b) => Number(a.id === openDayId) - Number(b.id === openDayId))

  return (
    <div className={cx(styles.card, className)}>
      <MapContainer
        center={center}
        zoom={first ? 13 : 2}
        scrollWheelZoom={false}
        attributionControl={false}
        className={styles.map}
      >
        <TileLayer url={TILE_URL} attribution={ATTRIBUTION} maxZoom={19} />
        <AttributionControl position="bottomright" prefix={false} />
        {routes.map((day) => {
          const open = day.id === openDayId
          return (
            <Polyline
              key={`${day.id}-${open}`}
              positions={day.etapes.map((s) => [s.latitude, s.longitude])}
              pathOptions={{
                className: cx(styles.route, open && styles.flow),
                weight: open ? 2.5 : 1.5,
                opacity: open ? 0.95 : 0.25,
                dashArray: open ? '6 6' : '2 8',
                lineCap: 'round',
                lineJoin: 'round',
                interactive: false,
              }}
            />
          )
        })}
        {days.flatMap((day) =>
          day.etapes.map((step, k) => (
            <StepMarker
              key={step.id}
              step={step}
              number={k + 1}
              open={day.id === openDayId}
              hot={hoverStepId === step.id}
              onHover={onHover}
              onSelect={() => {
                onOpenDay(day.id)
                onHover(step.id)
              }}
            />
          )),
        )}
        <MapFitter days={days} openDayId={openDayId} />
      </MapContainer>
    </div>
  )
}
