import styles from './Toast.module.css'

export default function Toast({ toast, onDismiss }) {
  const undo = () => {
    onDismiss()
    toast.onUndo()
  }
  return (
    <div role="status" aria-live="polite">
      {toast && (
        <div key={toast.id} className={styles.toast}>
          <span>{toast.message}</span>
          {toast.onUndo && (
            <button type="button" className={styles.undo} onClick={undo}>
              Annuler
            </button>
          )}
        </div>
      )}
    </div>
  )
}
