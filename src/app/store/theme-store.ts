import { create } from 'zustand'

import {
  applyThemeMode,
  getStoredThemeMode,
  type ThemeMode,
} from '#/app/config/theme'

interface ThemeStore {
  mode: ThemeMode
  initialize: () => void
  cycleMode: () => void
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  mode: 'auto',
  initialize: () => {
    const mode = getStoredThemeMode()
    applyThemeMode(mode)
    set({ mode })
  },
  cycleMode: () => {
    const current = get().mode
    const nextMode: ThemeMode =
      current === 'light' ? 'dark' : current === 'dark' ? 'auto' : 'light'

    applyThemeMode(nextMode)
    set({ mode: nextMode })
  },
}))
