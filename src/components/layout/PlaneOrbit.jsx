import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import { PLANE_PATH } from '../ui/iconPaths.jsx'
import styles from './PlaneOrbit.module.css'

const ORBIT =
  'M20 380 A468 360 0 0 1 488 20 A468 360 0 0 1 956 380 A468 360 0 0 1 488 740 A468 360 0 0 1 20 380 Z'

const TRAIL = [
  { begin: '-1.35s', className: styles.t1 },
  { begin: '-0.9s', className: styles.t2 },
  { begin: '-0.45s', className: styles.t3 },
]

function Plane() {
  return (
    <g transform="translate(-13 -13) scale(1.08) rotate(45 12 12)">
      <path d={PLANE_PATH} className={styles.planeShape} />
    </g>
  )
}

export default function PlaneOrbit() {
  const reduced = usePrefersReducedMotion()
  return (
    <div className={styles.track} aria-hidden="true">
      <svg viewBox="0 0 976 760" className={styles.svg}>
        <path d={ORBIT} className={styles.ellipse} />
        {reduced ? (
          <g className={styles.plane} transform="translate(488 20)">
            <Plane />
          </g>
        ) : (
          <>
            {TRAIL.map((dot) => (
              <circle key={dot.begin} r="3.2" className={dot.className}>
                <animateMotion dur="28s" begin={dot.begin} repeatCount="indefinite" path={ORBIT} />
              </circle>
            ))}
            <g className={styles.plane}>
              <animateMotion dur="28s" repeatCount="indefinite" rotate="auto" path={ORBIT} />
              <Plane />
            </g>
          </>
        )}
      </svg>
    </div>
  )
}
