import type { ReactNode } from 'react'

export function DemoSurface({
  title,
  children,
  gradient,
}: {
  title: string
  children: ReactNode
  gradient: string
}) {
  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 text-white"
      style={{ backgroundImage: gradient }}
    >
      <div className="w-full max-w-2xl rounded-xl border-8 border-black/10 bg-black/50 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-4 text-2xl">{title}</h1>
        {children}
      </div>
    </div>
  )
}
