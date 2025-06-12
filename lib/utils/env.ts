const isPreview = process.env.VERCEL_ENV === 'preview'
export const isProduction = process.env.VERCEL_ENV === 'production'

export const env = process.env.VERCEL_ENV || process.env.NODE_ENV

export function getPublicUrl() {
  if (isProduction) {
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      throw new Error('NEXT_PUBLIC_SITE_URL must be set in production')
    }
    const publicUrl = `https://cdn.${process.env.NEXT_PUBLIC_SITE_URL.replace(
      /^(https?:\/\/)?/,
      ''
    )}`
    return publicUrl
  }

  if (isPreview && process.env.VERCEL_URL) {
    return process.env.NEXT_PUBLIC_R2_PUBLIC_URL || ''
  }

  return process.env.NEXT_PUBLIC_R2_PUBLIC_URL || ''
}
