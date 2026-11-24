import L from 'leaflet'
import { useEffect, useRef } from 'react'
import { Marker, Tooltip } from 'react-leaflet'
import { cx } from '../../lib/cx.js'
import styles from './ItineraryMap.module.css'

const iconCache = new Map()

function getIcon(number, open, hot) {
  const key = `${number}-${open}-${hot}`
  if (!iconCache.has(key)) {
    iconCache.set(
      key,
      L.divIcon({
        className: cx(styles.marker, open && styles.markerOn, hot && styles.markerHot),
        html: `<span class="${styles.pin}"><b>${Number(number)}</b></span>`,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      }),
    )
  }
  return iconCache.get(key)
}

export default function StepMarker({ step, number, open, hot, onHover, onSelect }) {
  const markerRef = useRef(null)
  const label = `Étape ${number} : ${step.lieu}`

  useEffect(() => {
    const element = markerRef.current?.getElement()
    if (!element) return undefined
    element.setAttribute('aria-label', label)
    const onFocus = () => onHover(step.id)
    const onBlur = () => onHover(null)
    element.addEventListener('focus', onFocus)
    element.addEventListener('blur', onBlur)
    return () => {
      element.removeEventListener('focus', onFocus)
      element.removeEventListener('blur', onBlur)
    }
  }, [label, step.id, onHover])

  return (
    <Marker
      ref={markerRef}
      position={[step.latitude, step.longitude]}
      icon={getIcon(number, open, hot)}
      keyboard
      zIndexOffset={hot ? 1000 : open ? 500 : 0}
      eventHandlers={{
        mouseover: () => onHover(step.id),
        mouseout: () => onHover(null),
        click: onSelect,
      }}
    >
      {hot && (
        <Tooltip permanent direction="top" offset={[0, -24]} className={styles.tip}>
          {step.lieu}
        </Tooltip>
      )}
    </Marker>
  )
}
