import axios from 'axios'

const baseApi = (() => {
  const instance = axios.create()

  return instance
})()

export default {
  baseApi,
}
