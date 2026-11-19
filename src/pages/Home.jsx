import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import { usePageSetup } from '../hooks/usePageSetup.js'
import { useTrip } from '../hooks/useTrip.js'
import styles from './Home.module.css'

const TITLE = 'Bienvenue voyageur !'

export default function Home() {
  const headingRef = usePageSetup('')
  const { state } = useTrip()
  const navigate = useNavigate()

  const start = () => navigate(state.apiKey || state.demo ? '/voyage' : '/cle')

  return (
    <section className={styles.home}>
      <h1 ref={headingRef} tabIndex={-1} className={styles.title} aria-label={TITLE}>
        {TITLE.split('').map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={styles.letter}
            style={{ animationDelay: `${(0.2 + i * 0.05).toFixed(2)}s` }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </h1>
      <div className={styles.divider} aria-hidden="true" />
      <p className={`${styles.text} rise d3`}>
        L'aventure t'appelle et tu es prêt à sortir de ta zone de confort ? C'est parfait ! <br />Mais si passer des heures à
        organiser ton périple ou déchiffrer une carte à l'autre bout du monde te donne des sueurs froides… alors pas de
        panique.
      </p>
      <p className={`${styles.text} rise d4`}>
        Laisse l'IA gérer la boussole, prépare ta valise et…
      </p>
      <div className={`${styles.cta} rise d5`}>
        <Button variant="hero" size="lg" onClick={start}>
          Suis-moi !
          <span className={styles.arrow}>
            <Icon name="arrowRight" />
          </span>
        </Button>
      </div>
    </section>
  )
}
