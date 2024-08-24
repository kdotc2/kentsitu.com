import { MetadataRoute } from 'next'
import { allProjects } from 'contentlayer/generated'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://kentsitu.com'

  const routes = [
    '',
    'work',
    'projects',
    'writing',
    'bookmarks',
    'snippets',
    'changelog',
    'about',
  ].map((route) => ({
    url: `https://kentsistu.com/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes]
}
