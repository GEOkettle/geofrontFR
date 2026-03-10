import { create } from 'zustand'

import type { ExampleFilterValues } from '#/features/example/schemas/exampleFilterSchema'

interface ExampleFilterStore extends ExampleFilterValues {
  setSearchTerm: (searchTerm: string) => void
  setStatus: (status: ExampleFilterValues['status']) => void
  reset: () => void
}

const initialState: ExampleFilterValues = {
  searchTerm: '',
  status: 'all',
}

export const useExampleFilterStore = create<ExampleFilterStore>((set) => ({
  ...initialState,
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setStatus: (status) => set({ status }),
  reset: () => set(initialState),
}))
