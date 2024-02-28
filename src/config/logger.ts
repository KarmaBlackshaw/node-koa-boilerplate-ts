import SimpleNodeLogger from 'simple-node-logger'

export default _options => {
  const options = Object.assign({
    logDirectory: './src/storage/logs',
    fileNamePattern: '<DATE>.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
  }, _options)

  return SimpleNodeLogger.createRollingFileLogger(options)
}
