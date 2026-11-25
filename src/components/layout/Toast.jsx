import styles from './Toast.module.css'

export default function Toast({ toast, onUndo, onPause, onResume }) {
  const onBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) onResume()
  }

  return (
    <div role="status" aria-live="polite">
      {toast && (
        <div
          key={toast.id}
          className={styles.toast}
          onMouseEnter={onPause}
          onMouseLeave={onResume}
          onFocus={onPause}
          onBlur={onBlur}
        >
          <span>{toast.message}</span>
          {toast.onUndo && (
            <button
              type="button"
              className={styles.undo}
              onClick={onUndo}
              title="Annuler (Ctrl + Z)"
              aria-keyshortcuts="Control+Z Meta+Z"
            >
              Annuler
            </button>
          )}
        </div>
      )}
    </div>
  )
}
