import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

import QueryProvider from '#/app/providers/QueryProvider'

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <Toaster richColors position="top-right" />
    </QueryProvider>
  )
}
