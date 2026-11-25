import { Outlet, useLocation } from 'react-router-dom'
import { cx } from '../../lib/cx.js'
import Logo from './Logo.jsx'
import PlaneOrbit from './PlaneOrbit.jsx'
import styles from './CenteredLayout.module.css'

const LOGO_SIZES = { '/': 46, '/cle': 34, '/voyage': 34 }

export default function CenteredLayout() {
  const { pathname } = useLocation()
  const logoSize = LOGO_SIZES[pathname]
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        {pathname === '/' && <PlaneOrbit />}
        {logoSize && <Logo size={logoSize} className={cx(styles.logo, pathname === '/' && styles.homeLogo)} />}
        <Outlet />
      </div>
    </main>
  )
}
