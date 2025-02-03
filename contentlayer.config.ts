import {
  defineDocumentType,
  ComputedFields,
  makeSource,
} from 'contentlayer2/source-files'
// import readingTime from 'reading-time'
// Remark packages
import remarkGfm from 'remark-gfm'
// // Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import { remarkImgToJsx } from '@/lib/mdx-plugins/remark-img-to-jsx'
import { remarkCodeTitles } from '@/lib/mdx-plugins/remark-code-title'

const computedFields: ComputedFields = {
  // readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
}

export const Writing = defineDocumentType(() => ({
  name: 'Writing',
  filePathPattern: 'writing/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string' },
  },
  computedFields,
}))

export const Work = defineDocumentType(() => ({
  name: 'Work',
  filePathPattern: 'work/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string', required: true },
  },
  computedFields,
}))

export const Projects = defineDocumentType(() => ({
  name: 'Projects',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string', required: true },
    url: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' } },
  },
  computedFields,
}))

export const Misc = defineDocumentType(() => ({
  name: 'Misc',
  filePathPattern: 'misc/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    image: { type: 'string' },
    description: { type: 'string' },
  },
  computedFields,
}))

export const Slides = defineDocumentType(() => ({
  name: 'Slides',
  filePathPattern: 'slides/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    image: { type: 'string' },
    description: { type: 'string' },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Writing, Work, Misc, Projects, Slides],
  mdx: {
    remarkPlugins: [remarkGfm, remarkImgToJsx, remarkCodeTitles],
    rehypePlugins: [
      rehypeAutolinkHeadings,
      rehypeSlug,
      [rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }],
    ],
  },
  // contentDirExclude: ['slides'], // Exclude the 'slides' folder from processing
})
