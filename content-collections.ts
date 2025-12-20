import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
// Remark packages
import remarkGfm from 'remark-gfm'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import { remarkImgToJsx } from '@/lib/mdx-plugins/remark-img-to-jsx'
import { remarkCodeTitles } from '@/lib/mdx-plugins/remark-code-title'
import { z } from 'zod'

const Writing = defineCollection({
  name: 'Writing',
  directory: 'content/writing',
  include: '*.mdx',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    lastmod: z.string().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm, remarkImgToJsx, remarkCodeTitles],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }],
      ],
    })

    return {
      ...document,
      mdx,
      slug: document._meta.path,
    }
  },
})

const Work = defineCollection({
  name: 'Work',
  directory: 'content/work',
  include: '*.mdx',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    lastmod: z.string().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    image: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm, remarkImgToJsx, remarkCodeTitles],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }],
      ],
    })

    return {
      ...document,
      mdx,
      slug: document._meta.path,
    }
  },
})

const Projects = defineCollection({
  name: 'Projects',
  directory: 'content/projects',
  include: '*.mdx',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    lastmod: z.string().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    image: z.string(),
    url: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm, remarkImgToJsx, remarkCodeTitles],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }],
      ],
    })

    return {
      ...document,
      mdx,
      slug: document._meta.path,
    }
  },
})

export default defineConfig({
  collections: [Writing, Work, Projects],
})
