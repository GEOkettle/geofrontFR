import appLogo from '#/shared/assets/logo.png'
import { cn } from '#/shared/lib/utils'

const logoSizeClassMap = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-14 w-14',
  '2xl': 'h-16 w-16',
  '3xl': 'h-20 w-20',
} as const

type AppLogoProps = {
  className?: string
  imageClassName?: string
  size?: keyof typeof logoSizeClassMap
  alt?: string
}

function AppLogo({
  className,
  imageClassName,
  size = 'md',
  alt = 'App logo',
}: AppLogoProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        logoSizeClassMap[size],
        className,
      )}
    >
      <img
        src={appLogo}
        alt={alt}
        className={cn(
          'block h-full w-full rounded-full object-cover',
          imageClassName,
        )}
      />
    </span>
  )
}

export default AppLogo
