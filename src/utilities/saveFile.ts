// libs
import bluebird from 'bluebird'
import _ from 'lodash'
import { copyFile } from 'fs'
import path from 'path'

import joinPaths from '~/utilities/joinPaths'
import makeUniq from '~/utilities/makeUniq'

// constants
import env from '~/constants/env'

// node core
const copyFileAsync = bluebird.promisify(copyFile)

export default async (file, config = {}) => {
  try {
    const options = _.defaults(config, {
      destination: env.STATIC_ASSET_PATH,
    })

    const directory = joinPaths(options.destination)

    const extension = _.toLower(path.extname(file.name))

    const name = _.toLower(`${makeUniq()}${extension}`)

    const fileDirectory = joinPaths(directory, name)

    await copyFileAsync(file.path, fileDirectory)

    return name
  } catch (error) {
    console.log(error)
    throw error
  }
}
