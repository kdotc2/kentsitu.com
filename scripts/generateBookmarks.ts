import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import bookmarkItems from '@/content/bookmarks/bookmarkItems'
dotenv.config()

const metascraperUrl = process.env.NEXT_PUBLIC_API_URL

if (!metascraperUrl) {
  console.error('NEXT_PUBLIC_API_URL environment variable is not defined')
  process.exit(1)
}

type MetaData = {
  title: string
  description: string
  url: string
}

async function getMetadata(link: string): Promise<MetaData | null> {
  try {
    const res = await fetch(`${metascraperUrl}/api?url=https://${link}`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.error(`Failed to fetch metadata for ${link}:`, error)
    return null
  }
}

async function generateBookmarks() {
  try {
    console.warn('Starting metadata fetch...')
    const metadata = await Promise.all(
      bookmarkItems.map(async (url) => {
        const data = await getMetadata(url)
        return data
      })
    )

    const validMetadata = metadata.filter(
      (bookmark) => bookmark !== null
    ) as MetaData[]
    console.warn('Valid metadata:', validMetadata)

    if (validMetadata.length === 0) {
      throw new Error('No valid metadata was fetched')
    }

    // Save the metadata to a JSON file
    const outputPath = path.join(process.cwd(), 'content', 'bookmarks.json')
    fs.writeFileSync(outputPath, JSON.stringify(validMetadata, null, 2))

    console.warn('Bookmarks metadata generated successfully!')
  } catch (error) {
    console.error('Failed to generate bookmarks metadata:', error)
  }
}

generateBookmarks()
