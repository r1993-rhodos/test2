const DEFAULT_KEY = 'todoist-green-state-v1'

export function loadState<T>(key: string = DEFAULT_KEY): T | undefined {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return undefined
    return JSON.parse(raw) as T
  } catch (error) {
    return undefined
  }
}

export function saveState(state: unknown, key: string = DEFAULT_KEY) {
  try {
    localStorage.setItem(key, JSON.stringify(state))
  } catch (error) {
    // ignore write errors
  }
}