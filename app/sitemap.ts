import { MetadataRoute } from 'next'
import { allProjects, allWorks, allWritings, allMiscs } from 'contentlayer/generated'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://kentsitu.com'

  const projectRoutes = allProjects
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/projects/${post.slug}`,
      lastModified: post.lastmod || post.date,
    }))

  const workRoutes = allWorks
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/work/${post.slug}`,
      lastModified: post.lastmod || post.date,
    }))

  const writingRoutes = allWritings
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/writing/${post.slug}`,
      lastModified: post.lastmod || post.date,
    }))

  const miscsRoutes = allMiscs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.slug}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'work', 'projects', 'writing'].map((route) => ({
    url: `https://kentsistu.com/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...projectRoutes, ...workRoutes, ...writingRoutes, ...miscsRoutes]
}
