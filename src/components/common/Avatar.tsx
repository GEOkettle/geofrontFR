import type * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '#/shared/lib/utils'

const avatarVariants = cva(
  'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'size-6',
        sm: 'size-7',
        md: 'size-8',
        lg: 'size-10',
        xl: 'size-16',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const avatarImageVariants = cva('block h-full w-full rounded-full object-cover')

const avatarFallbackVariants = cva(
  'flex items-center justify-center rounded-full bg-gray-100 font-semibold uppercase text-gray-500 dark:bg-gray-700',
  {
    variants: {
      size: {
        xs: 'size-6 text-[10px]',
        sm: 'size-7 text-[10px]',
        md: 'size-8 text-xs',
        lg: 'size-10 text-sm',
        xl: 'size-16 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const avatarDotVariants = cva(
  'absolute rounded-full border-2 border-white dark:border-gray-900',
  {
    variants: {
      tone: {
        success: 'bg-green-500',
        danger: 'bg-red-500',
        gray: 'bg-gray-400',
      },
      size: {
        xs: 'right-0 top-0 size-2',
        sm: 'right-0 top-0 size-2.5',
        md: 'right-0 top-0 size-2.5',
        lg: 'right-0 top-0 size-3',
        xl: 'right-1 top-0 size-3',
      },
    },
    defaultVariants: {
      tone: 'success',
      size: 'md',
    },
  },
)

const avatarGroupVariants = cva('flex -ml-0.5', {
  variants: {
    size: {
      xs: '-space-x-3',
      sm: '-space-x-3',
      md: '-space-x-3',
      lg: '-space-x-4',
      xl: '-space-x-7',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>['size']>
type AvatarTone = NonNullable<VariantProps<typeof avatarDotVariants>['tone']>

type AvatarProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> &
  VariantProps<typeof avatarVariants> & {
    alt: string
    src?: string
    initials?: string
    statusTone?: AvatarTone
  }

function Avatar({
  alt,
  className,
  initials,
  size = 'md',
  src,
  statusTone,
  ...props
}: AvatarProps) {
  return (
    <div className={cn('relative', className)} {...props}>
      {src ? (
        <img
          className={cn(avatarVariants({ size }), avatarImageVariants())}
          src={src}
          alt={alt}
        />
      ) : (
        <div className={cn(avatarFallbackVariants({ size }))}>
          {initials ?? alt.slice(0, 2)}
        </div>
      )}
      {statusTone ? (
        <span className={cn(avatarDotVariants({ tone: statusTone, size }))} />
      ) : null}
    </div>
  )
}

type AvatarGroupItem = {
  alt: string
  initials?: string
  src?: string
}

type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof avatarGroupVariants> & {
    items: AvatarGroupItem[]
  }

function AvatarGroup({
  className,
  items,
  size = 'md',
  ...props
}: AvatarGroupProps) {
  return (
    <div className={cn(avatarGroupVariants({ size, className }))} {...props}>
      {items.map((item, index) => (
        <div
          key={`${item.alt}-${index}`}
          className="box-content rounded-full border-2 border-white dark:border-gray-900"
        >
          <Avatar
            alt={item.alt}
            src={item.src}
            initials={item.initials}
            size={size as AvatarSize}
          />
        </div>
      ))}
    </div>
  )
}

export { Avatar, AvatarGroup }
