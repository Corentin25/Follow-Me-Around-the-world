import { CITY_SUGGESTIONS, MAX_DESTINATION_LENGTH } from '../../lib/tripOptions.js'
import Chip from '../ui/Chip.jsx'
import TextField from '../ui/TextField.jsx'
import StepPanel from './StepPanel.jsx'
import styles from './StepDestination.module.css'

export default function StepDestination({ value, onChange, onEnter, headingRef, dir }) {
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEnter()
    }
  }

  return (
    <StepPanel title="1 — Où est-ce qu'on t'emmène ?" htmlFor="city" headingRef={headingRef} dir={dir}>
      <TextField
        id="city"
        icon="pin"
        iconTone="accent"
        type="text"
        placeholder="Ta ville de destination"
        autoComplete="off"
        maxLength={MAX_DESTINATION_LENGTH}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className={styles.chips} role="group" aria-label="Idées de destinations">
        {CITY_SUGGESTIONS.map((city) => (
          <Chip key={city} on={value === city} aria-pressed={value === city} onClick={() => onChange(city)}>
            {city}
          </Chip>
        ))}
      </div>
    </StepPanel>
  )
}
