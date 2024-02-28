import { accessSync, constants } from 'fs'

export default directory => {
  try {
    accessSync(directory, constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}
