/* eslint-disable */
const fs = require('fs')

module.exports = (path, type) => {
  try { fs.readdirSync(path) } catch { return [] }

  return fs.readdirSync(path, {
    withFileTypes: true
  }).reduce((a, c) => {
    switch (type) {
      case 'folder':
        c.isDirectory() && a.push(c.name)
        break
      case 'file':
        c.isFile() && a.push(c.name)
        break
      default:
        a.push(c.name)
    }
    return a
  }, [])
}
