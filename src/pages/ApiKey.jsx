import { useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import Icon from '../components/ui/Icon.jsx'
import IconButton from '../components/ui/IconButton.jsx'
import PageTitle from '../components/ui/PageTitle.jsx'
import RememberSwitch from '../components/ui/RememberSwitch.jsx'
import TextField from '../components/ui/TextField.jsx'
import TitleDivider from '../components/ui/TitleDivider.jsx'
import { cx } from '../lib/cx.js'
import { usePageSetup } from '../hooks/usePageSetup.js'
import { useTrip } from '../hooks/useTrip.js'
import { getApiKeyError } from '../lib/validation.js'
import { saveApiKey, setRemember } from '../services/storage.js'
import styles from './ApiKey.module.css'

const STEPS = [
  <>
    Rends-toi sur{' '}
    <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">
      Google AI Studio
    </a>
  </>,
  'Connecte-toi avec ton compte Google',
  'Clique sur « Clé API » puis « Créer une clé API »',
  'Une fois créée, copie/colle ta clé directement dans le champ suivant',
]

const REMEMBER_NOTES = {
  on: "Ta clé restera enregistrée dans ce navigateur. Évite de l'activer sur un ordinateur partagé.",
  off: "Ta clé sera oubliée dès que tu fermes l'onglet.",
}

export default function ApiKey() {
  const headingRef = usePageSetup('Clé API')
  const { state, dispatch } = useTrip()
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const errorId = useId()

  const [keyInput, setKeyInput] = useState(state.apiKey)
  const [showKey, setShowKey] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e) => {
    setKeyInput(e.target.value)
    if (error) setError('')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const message = getApiKeyError(keyInput)
    if (message) {
      setError(message)
      inputRef.current?.focus()
      return
    }
    const apiKey = keyInput.trim()
    saveApiKey(apiKey, state.remember)
    dispatch({ type: 'SET_API_KEY', apiKey })
    navigate('/voyage')
  }

  const onToggleRemember = (remember) => {
    dispatch({ type: 'SET_REMEMBER', remember })
    setRemember(remember, state.apiKey)
  }

  const startDemo = () => {
    dispatch({ type: 'START_DEMO' })
    navigate('/voyage')
  }

  return (
    <form className={styles.page} onSubmit={onSubmit} noValidate>
      <PageTitle ref={headingRef} text="Quand on veut voyager, il faut son passeport !" />
      <TitleDivider />
      <p className={cx(styles.intro, 'rise d2')}>
        Afin de pouvoir pleinement profiter de l'application, tu devras tout d'abord renseigner ta propre clé API.
        Pour cela, rien de plus simple :
      </p>

      <GlassCard as="ol" className={cx(styles.steps, 'rise d3')}>
        {STEPS.map((text, i) => (
          <li key={i} className={styles.step}>
            <span className={styles.num} aria-hidden="true">
              {i + 1}
            </span>
            <span>{text}</span>
          </li>
        ))}
      </GlassCard>

      <div className={cx(styles.fieldBlock, 'rise d4')}>
        <label htmlFor="apikey" className={styles.label}>
          Ta clé API Gemini
        </label>
        <TextField
          ref={inputRef}
          id="apikey"
          icon="lock"
          type={showKey ? 'text' : 'password'}
          placeholder="Coller la clé API"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          maxLength={100}
          value={keyInput}
          onChange={onChange}
          invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          trailing={
            <IconButton
              icon={showKey ? 'eyeOff' : 'eye'}
              label={showKey ? 'Masquer la clé' : 'Afficher la clé'}
              onClick={() => setShowKey((v) => !v)}
            />
          }
        />
        {error && (
          <p id={errorId} className="err" role="alert">
            {error}
          </p>
        )}
      </div>

      <RememberSwitch
        className="rise d5"
        checked={state.remember}
        onChange={onToggleRemember}
        label="Garder ma clé sur cet appareil"
        note={state.remember ? REMEMBER_NOTES.on : REMEMBER_NOTES.off}
      />

      <div className={cx(styles.actions, 'rise d6')}>
        <Button type="submit" variant="hero">
          J'ai mon passeport ! <Icon name="arrowRight" />
        </Button>
        <Button variant="link" onClick={startDemo}>
          Explorer en mode démo
        </Button>
      </div>
    </form>
  )
}
