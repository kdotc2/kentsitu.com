/* eslint-disable @typescript-eslint/no-explicit-any */
import { toc } from 'mdast-util-toc'
import { remark } from 'remark'
import { visit } from 'unist-util-visit'

const textTypes = ['text', 'emphasis', 'strong', 'inlineCode']

function flattenNode(node: any): string {
  const p: string[] = []
  visit(node, (node: any) => {
    if (!textTypes.includes(node.type)) return
    p.push(node.value)
  })
  return p.join('')
}

interface Item {
  title: string
  url: string
  items?: Item[]
}

interface Items {
  items?: Item[]
}

function getItems(node: any, current: Item | Items = { items: [] }): Items {
  if (!node) {
    return { items: [] }
  }

  if (node.type === 'paragraph') {
    visit(node, (item: any) => {
      console.log('Processing item:', item) // Log the structure of `item` to debug

      // Only process links
      if (item.type === 'link') {
        if (item.url) {
          // Ensure we're assigning `url` and `title` to an `Item`
          ;(current as Item).url = item.url
          ;(current as Item).title = flattenNode(node)
        } else {
          console.warn('Link item does not have a URL:', item) // Warn if URL is missing
        }
      }

      // If it's a text node, assign it to the title
      if (item.type === 'text') {
        ;(current as Item).title = flattenNode(node)
      }
    })

    return current as Items
  }

  if (node.type === 'list') {
    current.items = node.children.map((i: any) => getItems(i, { items: [] }))
    return current as Items
  } else if (node.type === 'listItem') {
    const heading = getItems(node.children[0], { items: [] })

    if (node.children.length > 1) {
      getItems(node.children[1], heading)
    }

    return heading as Item
  }

  return { items: [] }
}

const getToc = () => (node: any, file: any) => {
  const table = toc(node)
  const items = getItems(table.map, { items: [] })
  file.data = items // Assign the correct structure to `file.data`
}

export type TableOfContents = Items

export async function getTableOfContents(
  content: string
): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content)
  return result.data as TableOfContents
}
