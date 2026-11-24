import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { isAbortError, wait } from './async.js'

describe('wait', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('se résout après le délai', async () => {
    const done = vi.fn()
    wait(1000).then(done)
    await vi.advanceTimersByTimeAsync(999)
    expect(done).not.toHaveBeenCalled()
    await vi.advanceTimersByTimeAsync(1)
    expect(done).toHaveBeenCalled()
  })

  it('est rejetée si on annule pendant l’attente', async () => {
    const controller = new AbortController()
    const promise = wait(1000, controller.signal)
    controller.abort()
    await expect(promise).rejects.toSatisfy(isAbortError)
  })

  it('est rejetée tout de suite si le signal est déjà annulé', async () => {
    const controller = new AbortController()
    controller.abort()
    await expect(wait(1000, controller.signal)).rejects.toSatisfy(isAbortError)
  })

  it('accepte un délai négatif comme 0', async () => {
    const done = vi.fn()
    wait(-50).then(done)
    await vi.advanceTimersByTimeAsync(0)
    expect(done).toHaveBeenCalled()
  })
})
