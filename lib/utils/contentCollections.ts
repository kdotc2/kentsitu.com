/* eslint-disable  @typescript-eslint/no-explicit-any */
// 1. Update imports to the new generated location
import type { Writing, Work, Project } from 'content-collections'

// Define a union type for all document types
export type DocumentTypes = Writing | Work | Project

export function dateSortDesc(a: string | Date, b: string | Date) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function sortedWritingPost(allWritings: Writing[]) {
  return allWritings.sort((a, b) => dateSortDesc(a.date, b.date))
}

export function sortedWorkPost(allWorks: Work[]) {
  return allWorks.sort((a, b) => dateSortDesc(a.date, b.date))
}

// 2. Note: Use 'Project' (singular) as defined in your index.d.ts
export function sortedProjectsPost(allProjects: Project[]) {
  return allProjects.sort((a, b) => dateSortDesc(a.date, b.date))
}

type ConvertUndefined<T> = OrNull<{
  [K in keyof T as undefined extends T[K] ? K : never]-?: T[K]
}>
type OrNull<T> = { [K in keyof T]: Exclude<T[K], undefined> | null }
type PickRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
}
type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>

export const pick = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[]
): ConvertPick<{ [K in Keys]: Obj[K] }> => {
  return keys.reduce((acc, key) => {
    acc[key] = (obj as any)[key] ?? null
    return acc
  }, {} as any)
}

export const omit = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[]
): Omit<Obj, Keys> => {
  const result = Object.assign({}, obj)
  keys.forEach((key) => {
    delete (result as any)[key]
  })
  return result
}

/**
 * 3. Updated CoreContent logic
 * Content Collections uses '_meta' for internal data.
 * If you used the 'transform' function from the previous step, your MDX
 * is stored in 'mdx' instead of 'body'.
 */
export type CoreContent<T> = Omit<T, 'mdx' | '_meta'>

export function coreContent<T extends DocumentTypes>(content: T) {
  return omit(content, ['mdx', '_meta'] as any) as CoreContent<T>
}

export function allCoreContent<T extends DocumentTypes>(contents: T[]) {
  return contents.map((c) => coreContent(c))
}
