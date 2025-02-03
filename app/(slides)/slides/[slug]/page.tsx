import { allSlides } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import {
  generateStaticParamsForContent,
  getContentBySlug,
} from '@/lib/utils/contentUtils'
import { SlugContentLayout } from '@/components/layouts/PageLayout'

export const generateStaticParams = async () =>
  generateStaticParamsForContent(allSlides)

export function splitSlides(content: string): string[] {
  return content.split(/\n\s*---\s*\n/g) // Split at horizontal rules (---)
}

export default async function SlidesLayout({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getContentBySlug(slug, allSlides)

  if (!post || post.draft) {
    notFound()
  }

  const slides = splitSlides(post.body.raw) // Split the slides
  console.log(slides)

  return <SlugContentLayout post={post} showHeader={false} className="p-0" />
}

// const SlideDeck = ({ slides }: { slides: string[] }) => {
//   return (
//     <div className="w-full max-w-3xl mx-auto">
//       {slides.map((slide, index) => (
//         <div key={index} className="slide">
//           <SlugContentLayout post={slide} />
//         </div>
//       ))}
//     </div>
//   )
// }
