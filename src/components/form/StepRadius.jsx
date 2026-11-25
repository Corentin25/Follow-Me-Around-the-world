import { RADIUS_MAX, RADIUS_MIN, RADIUS_PRESETS, RADIUS_STEP } from '../../lib/tripOptions.js'
import Chip from '../ui/Chip.jsx'
import StepPanel from './StepPanel.jsx'
import styles from './StepRadius.module.css'

export default function StepRadius({ radius, onChange, headingRef, dir }) {
  const pct = (((radius - RADIUS_MIN) / (RADIUS_MAX - RADIUS_MIN)) * 100).toFixed(1)

  return (
    <StepPanel
      title={"3 — Tu es prêt à t'éloigner jusqu'à quelle distance ?"}
      htmlFor="radius"
      headingRef={headingRef}
      dir={dir}
    >
      <div className={styles.value}>
        <span className={styles.bigNum}>{radius}</span>
        <span className={styles.unit}>km</span>
      </div>
      <input
        id="radius"
        type="range"
        className={styles.range}
        min={RADIUS_MIN}
        max={RADIUS_MAX}
        step={RADIUS_STEP}
        value={radius}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Ton rayon en kilomètres"
        aria-valuetext={`${radius} km`}
        style={{ background: `linear-gradient(90deg, var(--accent) ${pct}%, var(--surface) ${pct}%)` }}
      />
      <div className={styles.chips}>
        {RADIUS_PRESETS.map(({ km, label }) => (
          <Chip key={km} on={radius === km} aria-pressed={radius === km} onClick={() => onChange(km)}>
            {label} · {km} km
          </Chip>
        ))}
      </div>
    </StepPanel>
  )
}
