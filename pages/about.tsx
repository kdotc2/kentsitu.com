// import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { InferGetStaticPropsType } from 'next'
import { allExtras } from 'contentlayer/generated'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { MDXComponents } from '@/components/MDXComponents'

const DEFAULT_LAYOUT = 'AboutLayout'

export const getStaticProps = async () => {
  const extra = allExtras.find((p) => p.slug === 'about')
  return { props: { extra } }
}

export default function About({ extra }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MDXLayoutRenderer
      layout={extra.layout || DEFAULT_LAYOUT}
      content={extra}
      MDXComponents={MDXComponents}
    />
  )
}
