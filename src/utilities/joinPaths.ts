export default function (...paths) {
  return paths.join('/').replace(/\/+/g, '/')
}
