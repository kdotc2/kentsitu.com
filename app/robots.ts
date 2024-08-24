import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://kentsitu.com/sitemap.xml',
    host: 'https://kentsitu.com',
  }
}
