import Button from '../ui/Button.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import styles from './EmptyItinerary.module.css'

export default function EmptyItinerary({ onNewTrip }) {
  return (
    <GlassCard className={styles.empty}>
      <p className={styles.title}>Ton itinéraire est vide</p>
      <p className="hint">Tu as supprimé tous les jours. Annule ou prépare un nouveau voyage.</p>
      <Button variant="hero" size="sm" data-empty-action onClick={onNewTrip}>
        Nouvel itinéraire
      </Button>
    </GlassCard>
  )
}
