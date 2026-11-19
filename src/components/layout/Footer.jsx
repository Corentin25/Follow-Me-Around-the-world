import { useCallback, useRef, useState } from 'react'
import Button from '../ui/Button.jsx'
import styles from './Footer.module.css'
import LegalModal from './LegalModal.jsx'

export default function Footer() {
  const [legalOpen, setLegalOpen] = useState(false)
  const openerRef = useRef(null)

  const closeLegal = useCallback(() => {
    setLegalOpen(false)
    openerRef.current?.focus()
  }, [])

  return (
    <footer className={styles.footer}>
      <Button variant="link" ref={openerRef} className={styles.legal} onClick={() => setLegalOpen(true)}>
        Mentions légales
      </Button>
      <span className={styles.sep} aria-hidden="true" />
      <span className={styles.copy}>© FollowMe-Around-the-world!</span>
      {legalOpen && <LegalModal onClose={closeLegal} />}
    </footer>
  )
}
