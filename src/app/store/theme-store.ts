import { create } from 'zustand'

import { applyThemeMode, getStoredThemeMode } from '#/app/config/theme'
import type { ThemeMode } from '#/app/config/theme'

interface ThemeStore {
  mode: ThemeMode
  initialize: () => void
  setMode: (mode: ThemeMode) => void
  cycleMode: () => void
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  mode: 'auto',
  initialize: () => {
    const mode = getStoredThemeMode()
    applyThemeMode(mode)
    set({ mode })
  },
  setMode: (mode) => {
    applyThemeMode(mode)
    set({ mode })
  },
  cycleMode: () => {
    const current = get().mode
    const nextMode: ThemeMode =
      current === 'light' ? 'dark' : current === 'dark' ? 'auto' : 'light'

    get().setMode(nextMode)
  },
}))
