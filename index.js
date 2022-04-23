/**
 * @typedef {import('hast').Root} Root
 * @typedef {string|undefined} prefix
 * @typedef Options
 *   Configuration.
 * @property {prefix} [prefix]
 *   How to create links.
 */

import Slugger from 'github-slugger'
import {hasProperty} from 'hast-util-has-property'
import {headingRank} from 'hast-util-heading-rank'
import {toString} from 'hast-util-to-string'
import {visit} from 'unist-util-visit'

const slugs = new Slugger()

/**
 * Plugin to add `id`s to headings.
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function rehypeSlug(options = {}) {
  return (tree) => {
    slugs.reset()
    const prefix = options?.prefix ? options.prefix : ''

    visit(tree, 'element', (node) => {
      if (headingRank(node) && node.properties && !hasProperty(node, 'id')) {
        const id = `${prefix}${toString(node)}`
        node.properties.id = slugs.slug(id)
      }
    })
  }
}
