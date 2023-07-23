import fs from 'fs'
import path from 'path'
import glob from 'glob'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { bundleMDX } from 'mdx-bundler'
import rehypeSlug from 'rehype-slug'

import type { Frontmatter } from 'types/type'

const ROOT_PATH = process.cwd()
export const DATA_PATH = path.join(ROOT_PATH, 'data')

// the front matter and content of all mdx files based on `docsPaths`
export const getAllFrontmatter = (fromPath: string) => {
  const PATH = path.join(DATA_PATH, fromPath)
  const paths = glob.sync(`${PATH}/**/*.mdx`)

  return paths
    .map(filePath => {
      const source = fs.readFileSync(path.join(filePath), 'utf8')
      const { data, content } = matter(source)

      return {
        ...(data as Frontmatter),
        slug: filePath.replace(`${DATA_PATH}/`, '').replace('.mdx', ''),
        readingTime: readingTime(content),
      } as Frontmatter
    })
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt as string)) -
        Number(new Date(a.publishedAt as string))
    )
}

export const getMdxBySlug = async (basePath: string, slug: string) => {
  const source = fs.readFileSync(
    path.join(DATA_PATH, basePath, `${slug}.mdx`),
    'utf8'
  )
  const { frontmatter, code } = await bundleMDX({
    source,
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [...(options.remarkPlugins ?? [])]
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeSlug]

      return options
    },
  })

  return {
    frontmatter: {
      ...(frontmatter as Frontmatter),
      slug,
      readingTime: readingTime(code),
    } as Frontmatter,
    code,
  }
}

export function getAllVersionsFromPath(fromPath: string) {
  const PATH = path.join(DATA_PATH, fromPath)
  if (!fs.existsSync(PATH)) return []
  return fs
    .readdirSync(PATH)
    .map(fileName => fileName.replace('.mdx', ''))
    .reverse()
}
