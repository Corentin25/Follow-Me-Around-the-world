import { DAY_PRESETS, DAYS_MAX, DAYS_MIN } from '../../lib/tripOptions.js'
import Chip from '../ui/Chip.jsx'
import Icon from '../ui/Icon.jsx'
import StepPanel from './StepPanel.jsx'
import styles from './StepDuration.module.css'

export default function StepDuration({ days, onChange, headingRef, dir }) {
  return (
    <StepPanel title="2 — On part pour combien de dodos ?" headingRef={headingRef} dir={dir} centered>
      <div className={styles.counter}>
        <div className={styles.row}>
          <button
            type="button"
            className={styles.round}
            aria-label="Un jour de moins"
            disabled={days <= DAYS_MIN}
            onClick={() => onChange(Math.max(DAYS_MIN, days - 1))}
          >
            <Icon name="minus" className={styles.roundIcon} />
          </button>
          <div className={styles.bigNum} aria-live="polite">
            {days}
          </div>
          <button
            type="button"
            className={styles.round}
            aria-label="Un jour de plus"
            disabled={days >= DAYS_MAX}
            onClick={() => onChange(Math.min(DAYS_MAX, days + 1))}
          >
            <Icon name="plus" className={styles.roundIcon} />
          </button>
        </div>
        <div className={styles.unit}>{days > 1 ? 'jours' : 'jour'} sur place</div>
      </div>
      <div className={styles.chips}>
        {DAY_PRESETS.map((n) => (
          <Chip key={n} on={days === n} aria-pressed={days === n} onClick={() => onChange(n)}>
            {n} jours
          </Chip>
        ))}
      </div>
    </StepPanel>
  )
}
