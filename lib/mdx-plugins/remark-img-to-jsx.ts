import { Parent, Node, Literal } from 'unist'
import { visit } from 'unist-util-visit'
import { sync as sizeOf } from 'probe-image-size'
import fs from 'fs'

export type ImageNode = Parent & {
  url: string
  alt: string
  name: string
  attributes: (Literal & { name: string })[]
}

/**
 * Converts markdown image nodes to next/image jsx.
 */
export function remarkImgToJsx() {
  return (tree: Node) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node: Node): node is Parent => {
        const parentNode = node as Parent
        return (
          parentNode.type === 'paragraph' &&
          parentNode.children.some((n) => n.type === 'image')
        )
      },
      (node: Parent) => {
        const imageNodeIndex = node.children.findIndex(
          (n) => n.type === 'image'
        )
        const imageNode = node.children[imageNodeIndex] as ImageNode

        // only local files
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(
            fs.readFileSync(`${process.cwd()}/public${imageNode.url}`)
          )

          if (dimensions) {
            // Convert original node to next/image
            imageNode.type = 'mdxJsxFlowElement'
            imageNode.name = 'Image'
            imageNode.attributes = [
              { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
              { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
              {
                type: 'mdxJsxAttribute',
                name: 'width',
                value: dimensions.width,
              },
              {
                type: 'mdxJsxAttribute',
                name: 'height',
                value: dimensions.height,
              },
            ]
            // Change node type from p to div to avoid nesting error
            node.type = 'div'
            node.children[imageNodeIndex] = imageNode
          }
        }
      }
    )
  }
}
