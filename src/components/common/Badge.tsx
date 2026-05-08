import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '#/shared/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium text-center transition',
  {
    variants: {
      tone: {
        violet: 'bg-violet-500/20 text-violet-600',
        sky: 'bg-sky-500/20 text-sky-700',
        green: 'bg-green-500/20 text-green-700',
        yellow: 'bg-yellow-500/20 text-yellow-700',
        red: 'bg-red-500/20 text-red-700',
        blue: 'bg-blue-500/20 text-blue-600',
        gray: 'bg-gray-400/20 text-gray-500 dark:text-gray-400',
        dark: 'bg-gray-700 text-gray-100 dark:bg-gray-200 dark:text-gray-600',
      },
      size: {
        sm: 'px-2.5 py-1 text-xs',
        lg: 'px-2.5 py-1 text-sm',
      },
    },
    defaultVariants: {
      tone: 'gray',
      size: 'sm',
    },
  },
)

const metricBadgeVariants = cva('rounded-full px-1.5 text-sm font-medium', {
  variants: {
    tone: {
      green: 'bg-green-500/20 text-green-700',
      red: 'bg-red-500/20 text-red-700',
    },
  },
  defaultVariants: {
    tone: 'green',
  },
})

const selectableBadgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-xs font-medium leading-5 shadow-xs transition',
  {
    variants: {
      selected: {
        true: 'border-transparent bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-800',
        false:
          'border-gray-200 bg-white text-gray-500 hover:border-gray-300 dark:border-gray-700/60 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
)

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>

function Badge({
  className,
  tone = 'gray',
  size = 'sm',
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ tone, size, className }))} {...props} />
  )
}

type IconBadgeProps = BadgeProps & {
  icon: React.ReactNode
}

function IconBadge({
  className,
  icon,
  tone = 'dark',
  size = 'sm',
  children,
  ...props
}: IconBadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ tone, size }),
        'gap-1 px-2 py-0.5',
        className,
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </div>
  )
}

type MetricBadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof metricBadgeVariants>

function MetricBadge({
  className,
  tone = 'green',
  ...props
}: MetricBadgeProps) {
  return (
    <div className={cn(metricBadgeVariants({ tone, className }))} {...props} />
  )
}

type SelectableBadgeProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof selectableBadgeVariants>

function SelectableBadge({
  className,
  selected = false,
  type = 'button',
  ...props
}: SelectableBadgeProps) {
  return (
    <button
      type={type}
      aria-pressed={selected ?? false}
      className={cn(selectableBadgeVariants({ selected, className }))}
      {...props}
    />
  )
}

export { Badge, IconBadge, MetricBadge, SelectableBadge }
