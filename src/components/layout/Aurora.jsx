import styles from './Aurora.module.css'

const STARS = Array.from({ length: 46 }, (_, i) => {
  const size = 1 + (i % 3 === 0 ? 1 : 0)
  return {
    left: `${((i * 37.7 + 11) % 100).toFixed(1)}%`,
    top: `${((i * 53.3 + i * i * 3.1) % 100).toFixed(1)}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${((i % 9) * 0.6).toFixed(1)}s`,
  }
})

export default function Aurora() {
  return (
    <>
      <div className={styles.aurora} aria-hidden="true" />
      <div className={styles.stars} aria-hidden="true">
        {STARS.map((style, i) => (
          <i key={i} className={styles.star} style={style} />
        ))}
      </div>
    </>
  )
}
