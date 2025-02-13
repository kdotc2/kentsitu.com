import { PageLayout } from '@/components/layouts/PageLayout'
import { Metadata } from 'next'
import Bookmarks from '@/components/layouts/BookmarksLayout'

const metainfo = {
  title: 'Bookmarks',
  description: 'A space to save inspiring portfolios and useful links.',
}

export const metadata: Metadata = {
  title: metainfo.title,
  description: metainfo.description,
}

export default async function BookmarksLayout() {
  return (
    <PageLayout title={metainfo.title} description={metainfo.description}>
      <Bookmarks />
    </PageLayout>
  )
}
