
import compress from 'koa-compress'
import * as zlib from 'zlib'

export default () => compress({
  filter: contentType => /text/i.test(contentType),
  threshold: 2048,
  gzip: {
    flush: zlib.constants.Z_SYNC_FLUSH,
  },
  deflate: {
    flush: zlib.constants.Z_SYNC_FLUSH,
  },
  br: false, // disable brotli
})
