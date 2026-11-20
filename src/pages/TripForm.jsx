import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressRail from '../components/form/ProgressRail.jsx'
import StepDestination from '../components/form/StepDestination.jsx'
import StepDuration from '../components/form/StepDuration.jsx'
import StepRadius from '../components/form/StepRadius.jsx'
import StepVibe from '../components/form/StepVibe.jsx'
import Button from '../components/ui/Button.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import Icon from '../components/ui/Icon.jsx'
import PageTitle from '../components/ui/PageTitle.jsx'
import TitleDivider from '../components/ui/TitleDivider.jsx'
import { usePageSetup } from '../hooks/usePageSetup.js'
import { useTrip } from '../hooks/useTrip.js'
import { cx } from '../lib/cx.js'
import { formatRecap } from '../lib/format.js'
import { isStepValid } from '../lib/validation.js'
import { addVibe, removeCustomVibe, toggleVibe } from '../lib/vibes.js'
import styles from './TripForm.module.css'

const LAST_STEP = 4

export default function TripForm() {
  const headingRef = usePageSetup('Ton voyage')
  const { state, dispatch } = useTrip()
  const navigate = useNavigate()
  const form = state.form

  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [vibeText, setVibeText] = useState('')
  const stepHeadingRef = useRef(null)
  const shownStep = useRef(step)

  useEffect(() => {
    if (shownStep.current !== step) {
      shownStep.current = step
      stepHeadingRef.current?.focus({ preventScroll: true })
    }
  }, [step])

  const update = (patch) => dispatch({ type: 'SET_FORM', patch })
  const canContinue = isStepValid(step, form, vibeText)

  const goTo = (target) => {
    setDir(target > step ? 1 : -1)
    setStep(target)
  }

  const prev = () => (step === 1 ? navigate('/cle') : goTo(step - 1))
  const next = () => canContinue && goTo(step + 1)

  const addTypedVibe = () => {
    update(addVibe(form, vibeText))
    setVibeText('')
  }

  const launch = () => {
    if (!canContinue) return
    update({ ...addVibe(form, vibeText), destination: form.destination.trim() })
    setVibeText('')
    navigate('/chargement')
  }

  const panelProps = { headingRef: stepHeadingRef, dir }

  return (
    <section className={styles.page}>
      <div className={styles.head}>
        <PageTitle ref={headingRef} text="Bienvenue à bord !" />
        <TitleDivider />
        <p className={cx(styles.intro, 'rise d2')}>
          À présent, installe-toi confortablement dans ton siège, boucle ta ceinture, et laisse-moi te guider autour du
          monde :
        </p>
      </div>

      <ProgressRail step={step} className="rise d3" />

      <GlassCard className={cx(styles.card, 'rise d4')}>
        {step === 1 && (
          <StepDestination
            {...panelProps}
            value={form.destination}
            onChange={(destination) => update({ destination })}
            onEnter={next}
          />
        )}
        {step === 2 && <StepDuration {...panelProps} days={form.days} onChange={(days) => update({ days })} />}
        {step === 3 && <StepRadius {...panelProps} radius={form.radius} onChange={(radius) => update({ radius })} />}
        {step === 4 && (
          <StepVibe
            {...panelProps}
            form={form}
            text={vibeText}
            onText={setVibeText}
            onToggle={(name) => update({ vibes: toggleVibe(form.vibes, name) })}
            onAdd={addTypedVibe}
            onRemove={(word) => update({ customVibes: removeCustomVibe(form.customVibes, word) })}
            recap={formatRecap(form, vibeText)}
          />
        )}

        {state.status === 'error' && state.error && (
          <p className="err" role="alert">
            {state.error}
          </p>
        )}

        <div className={styles.nav}>
          <Button size="sm" onClick={prev}>
            <Icon name="arrowLeft" /> Précédent
          </Button>
          {step < LAST_STEP ? (
            <Button variant="hero" size="sm" disabled={!canContinue} onClick={next}>
              Suivant <Icon name="arrowRight" />
            </Button>
          ) : (
            <Button variant="hero" size="sm" disabled={!canContinue} onClick={launch}>
              C'est parti ! <Icon name="plane" />
            </Button>
          )}
        </div>
      </GlassCard>
    </section>
  )
}
