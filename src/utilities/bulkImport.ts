import { glob } from 'glob'
import path from 'path'

const cwd = process.cwd()

export default async function (pattern: string): Promise<Array<Function>> {
  const filePaths = await glob(pattern, {
    cwd: cwd,
    absolute: true,
  })

  const promises = filePaths.map(async filePath => {
    try {
      const importPath = filePath
        .replace(/\//g, path.sep)
        .replace(cwd, '')

      const file = await import(importPath)

      return file.default
    } catch (error) {
      console.log(`Something went wrong in ${filePath}`)
      throw error
    }
  })

  const imports = await Promise.all(promises)

  return imports
}
