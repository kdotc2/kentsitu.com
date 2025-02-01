import { cn } from '@/lib/utils'
import NextImage, { ImageProps } from 'next/image'

const Image = ({ alt, ...rest }: ImageProps) => (
  <NextImage
    {...rest}
    alt={alt}
    className={cn(
      alt.includes('page') &&
        'rounded-lg border border-gray-200 dark:border-gray-700',
      (alt.includes('screen') || alt.includes('animation')) &&
        'border border-gray-200 dark:border-gray-700'
    )}
  />
)

export default Image
