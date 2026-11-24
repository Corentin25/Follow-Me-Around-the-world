import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import { usePageSetup } from '../hooks/usePageSetup.js'
import { cx } from '../lib/cx.js'
import styles from './NotFound.module.css'

const TITLE = 'Erreur 404'

export default function NotFound() {
  const headingRef = usePageSetup('Page introuvable')
  const navigate = useNavigate()

  return (
    <section className={styles.page}>
      <div className={cx(styles.lost, 'rise d1')} aria-hidden="true">
        <span className={styles.float}>
          <Icon name="plane" className={styles.plane} />
        </span>
      </div>
      <h1 ref={headingRef} tabIndex={-1} className={cx(styles.title, 'rise d1')} data-t={TITLE}>
        {TITLE}
      </h1>
      <p className={cx(styles.text, 'rise d2')}>
        Il semblerait que cette page n'existe pas. Notre avion a dû prendre un mauvais virage au-dessus de
        l'Atlantique.
      </p>
      <div className={cx(styles.cta, 'rise d3')}>
        <Button variant="hero" onClick={() => navigate('/')}>
          Revenir à l'accueil <Icon name="arrowRight" />
        </Button>
      </div>
    </section>
  )
}
