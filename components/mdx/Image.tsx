import { cn } from '@/lib/utils'
import NextImage, { ImageProps } from 'next/image'

const publicUrl =
  process.env.NEXT_PUBLIC_CDN_URL ??
  process.env.NEXT_PUBLIC_R2_PUBLIC_URL ??
  'http://localhost:3000'

const Image = ({ alt, src, ...rest }: ImageProps) => {
  const fullSrc =
    typeof src === 'string' && !src.startsWith('http')
      ? `${publicUrl.replace(/\/$/, '')}/${src.replace(/^\//, '')}`
      : src

  return (
    <NextImage
      {...rest}
      alt={alt}
      className={cn(
        alt.includes('page') && 'rounded-lg border',
        (alt.includes('screen') || alt.includes('animation')) && 'border'
      )}
      src={fullSrc}
    />
  )
}

export default Image
