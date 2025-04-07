import { cn } from '@/lib/utils'
import NextImage, { ImageProps } from 'next/image'

const Image = ({ alt, ...rest }: ImageProps) => (
  <NextImage
    {...rest}
    alt={alt}
    className={cn(
      alt.includes('page') && 'rounded-xl border',
      (alt.includes('screen') || alt.includes('animation')) && 'border'
    )}
  />
)

export default Image
