import { MAX_CUSTOM_VIBES, MAX_VIBE_LENGTH, VIBE_SUGGESTIONS } from '../../lib/tripOptions.js'
import Chip from '../ui/Chip.jsx'
import IconButton from '../ui/IconButton.jsx'
import TextField from '../ui/TextField.jsx'
import StepPanel from './StepPanel.jsx'
import styles from './StepVibe.module.css'

export default function StepVibe({ form, text, onText, onToggle, onAdd, onRemove, recap, headingRef, dir }) {
  const full = form.customVibes.length >= MAX_CUSTOM_VIBES
  const canAdd = text.trim().length > 0 && !full

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (canAdd) onAdd()
    }
  }

  return (
    <StepPanel title="4 — Quelle sera la « vibe » de ton séjour ?" htmlFor="vibe" headingRef={headingRef} dir={dir}>
      <div className={styles.chips}>
        {VIBE_SUGGESTIONS.map((name) => {
          const on = form.vibes.includes(name)
          return (
            <Chip key={name} on={on} aria-pressed={on} onClick={() => onToggle(name)}>
              {name}
            </Chip>
          )
        })}
      </div>
      <div className={styles.custom}>
        <TextField
          id="vibe"
          type="text"
          maxLength={MAX_VIBE_LENGTH}
          placeholder={
            full ? `Tu as atteint la limite de ${MAX_CUSTOM_VIBES} mots.` : 'Ex : Gastronomie, Détente, Visite historique…'
          }
          autoComplete="off"
          disabled={full}
          value={full ? '' : text}
          onChange={(e) => onText(e.target.value)}
          onKeyDown={onKeyDown}
          trailing={
            <IconButton icon="plus" label="Ajouter ce mot" iconClassName={styles.addIcon} disabled={!canAdd} onClick={onAdd} />
          }
        />
        {form.customVibes.length > 0 ? (
          <div className={styles.words} role="group" aria-label="Tes vibes personnalisées">
            {form.customVibes.map((word) => (
              <Chip key={word} on pop small onRemove={() => onRemove(word)} removeLabel={`Retirer ${word}`}>
                {word}
              </Chip>
            ))}
          </div>
        ) : (
          <p className="hint">Appuie sur Entrée pour ajouter ton mot à la liste, autant de fois que tu veux.</p>
        )}
      </div>
      <p className={`hint ${styles.recap}`}>{recap}</p>
    </StepPanel>
  )
}
