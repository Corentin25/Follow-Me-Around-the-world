import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import PageTitle from '../components/ui/PageTitle.jsx'
import TitleDivider from '../components/ui/TitleDivider.jsx'
import { usePageSetup } from '../hooks/usePageSetup.js'
import { useTrip } from '../hooks/useTrip.js'
import styles from './Home.module.css'

export default function Home() {
  const headingRef = usePageSetup('')
  const { state } = useTrip()
  const navigate = useNavigate()

  const start = () => navigate(state.apiKey || state.demo ? '/voyage' : '/cle')

  return (
    <section className={styles.home}>
      <PageTitle ref={headingRef} text="Bienvenue voyageur !" />
      <TitleDivider />
      <p className={`${styles.text} rise d3`}>
        L'aventure t'appelle et tu es prêt à sortir de ta zone de confort ? C'est parfait ! <br />Mais si passer des heures à
        organiser ton périple ou déchiffrer une carte à l'autre bout du monde te donne des sueurs froides… alors pas de
        panique.
      </p>
      <p className={`${styles.text} rise d4`}>
        Laisse l'IA gérer la boussole, prépare ta valise et…
      </p>
      <div className={`${styles.cta} rise d5`}>
        <Button variant="hero" onClick={start}>
          Suis-moi ! <Icon name="arrowRight" />
        </Button>
      </div>
    </section>
  )
}
