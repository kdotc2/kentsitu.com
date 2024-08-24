import { MetadataRoute } from 'next'
import { allProjects, allWorks, allWritings } from 'contentlayer/generated'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://kentsitu.com'

  const projectRoutes = allProjects.map((post) => ({
    url: `${siteUrl}/projects/${post.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    // lastModified: post.lastmod || post.date,
  }))

  const workRoutes = allWorks.map((post) => ({
    url: `${siteUrl}/work/${post.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    // lastModified: post.lastmod || post.date,
  }))

  const writingRoutes = allWritings.map((post) => ({
    url: `${siteUrl}/writing/${post.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    // lastModified: post.lastmod || post.date,
  }))

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

  return [...routes, ...projectRoutes, ...workRoutes, ...writingRoutes]
}
