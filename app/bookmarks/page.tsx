/* eslint-disable @next/next/no-img-element */
import LayoutHeader from '@components/LayoutHeader'
import Bookmarks from '@components/Bookmarks'
import { Metadata } from 'next'

const metainfo = {
  title: 'Bookmarks',
  description: 'A space to save inspiring portfolios and useful links.',
}

export const metadata: Metadata = {
  title: metainfo.title,
  description: metainfo.description,
}

export default function BookmarksLayout() {
  return (
    <>
      <div className="pb-16 pt-10">
        <LayoutHeader title={metainfo.title} description={metainfo.description} />
        <div className="-mx-6">
          <Bookmarks />
        </div>
      </div>
    </>
  )
}
