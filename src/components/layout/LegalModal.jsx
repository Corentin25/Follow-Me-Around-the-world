import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import IconButton from '../ui/IconButton.jsx'
import styles from './LegalModal.module.css'

export default function LegalModal({ onClose }) {
  const closeRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    closeRef.current?.focus()
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return createPortal(
    <div className={styles.scrim} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.head}>
          <h2 id={titleId} className={styles.title}>
            Mentions légales
          </h2>
          <IconButton ref={closeRef} icon="close" label="Fermer" onClick={onClose} />
        </div>
        <p>
          <b>Éditeur :</b> Corentin — projet personnel, non commercial.
        </p>
        <p>
          <b>Hébergement :</b> GitHub Pages (GitHub, Inc.).
        </p>
        <p>
          <b>Données :</b> Follow Me ne possède aucun serveur et ne collecte aucune donnée personnelle. Ta clé API
          reste dans ton navigateur et n'est transmise qu'à l'API Google Gemini.
        </p>
        <p>
          <b>Cartographie :</b> © les contributeurs d'OpenStreetMap.
        </p>
        <p>
          <b>Contenu généré par IA :</b> les itinéraires sont des suggestions, à vérifier avant ton départ (horaires,
          fermetures).
        </p>
      </div>
    </div>,
    document.body,
  )
}
