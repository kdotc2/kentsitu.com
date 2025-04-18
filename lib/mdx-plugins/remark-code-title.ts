import { Parent } from 'unist'
import { visit } from 'unist-util-visit'

/**
 * Parses title from code block and inserts it as a sibling title node.
 */
export function remarkCodeTitles() {
  return (tree: Parent & { lang?: string }) =>
    visit(
      tree,
      'code',
      (node: Parent & { lang?: string }, index, parent: Parent) => {
        const nodeLang = node.lang || ''
        let language = ''
        let title = ''

        if (nodeLang.includes(':')) {
          language = nodeLang.slice(0, nodeLang.search(':'))
          title = nodeLang.slice(nodeLang.search(':') + 1)
        }

        if (!title) {
          return
        }

        const className = 'remark-code-title'

        const titleNode = {
          type: 'mdxJsxFlowElement',
          name: 'div',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'className', value: className },
          ],
          children: [{ type: 'text', value: title }],
          data: { _xdmExplicitJsx: true },
        }

        // Ensure index is a number before using it with splice
        if (
          index !== undefined &&
          parent.children &&
          Array.isArray(parent.children)
        ) {
          parent.children.splice(index, 0, titleNode)
        }

        // Ensure lang is updated for the node
        node.lang = language
      }
    )
}
