import styles from './LoadingOrbit.module.css'

const ORBIT_TEXT = 'Around the World ! Around the World ! '

const ORBIT_CHARS = [...ORBIT_TEXT]
  .map((ch, i) => ({ ch, angle: (i * 360) / ORBIT_TEXT.length }))
  .filter(({ ch }) => ch !== ' ')

export default function LoadingOrbit() {
  return (
    <div className={styles.wrap} role="img" aria-label="Follow Me – Around the world, chargement en cours">
      <div className={styles.orbit} aria-hidden="true">
        {ORBIT_CHARS.map(({ ch, angle }) => (
          <span
            key={angle}
            className={styles.char}
            style={{ transform: `rotate(${angle.toFixed(2)}deg) translateY(-140px)` }}
          >
            {ch}
          </span>
        ))}
      </div>
      <div className={styles.ringDashed} aria-hidden="true" />
      <div className={styles.ringPulse} aria-hidden="true" />
      <div className={styles.core} aria-hidden="true">
        <span className={styles.follow}>FOLLOW</span>
        <span className={styles.me}>ME</span>
      </div>
    </div>
  )
}
