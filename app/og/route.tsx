/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || 'Kent Situ'
  const description =
    searchParams.get('description') ||
    'Product Designer. Crafting product experiences through design and code.'
  const truncatedDescription =
    description.length > 120 ? description.slice(0, 120) + '...' : description

  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <div tw="flex bg-gray-50 h-full w-full p-20 justify-between flex-col">
          <div tw="flex">
            <img
              alt={'og icon'}
              src="https://kentsitu.com/static/favicons/apple-touch-icon.png"
              width={50}
              height={50}
            />
          </div>
          <div tw="flex w-full flex-col">
            <div tw="flex flex-col text-left py-2">
              <h2 tw="text-5xl font-bold text-gray-800">{title}</h2>
              <div tw="text-2xl text-gray-400">{truncatedDescription}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
