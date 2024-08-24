import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/work/', '/projects/', '/writing/'], // Combine disallow paths into an array
      },
    ],
    sitemap: 'https://kentsitu.com/sitemap.xml',
    host: 'https://kentsitu.com',
  }
}
