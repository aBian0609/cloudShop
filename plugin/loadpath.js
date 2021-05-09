const path = require('path')
const fs = require('fs')
const replaceExt = require('replace-ext')
var minidir = null

function _inflateEntries (entries = [], entry) {
  const configFile = replaceExt(entry, '.json')
  const content = fs.readFileSync(configFile, 'utf8')
  const config = JSON.parse(content)
  const items = config.pages
  if (typeof items === 'object') {
    Object.values(items).forEach(item => {
      inflateEntries(entries, item)
    })
  }
}

function inflateEntries (entries, entry) {
  entry = path.resolve(minidir, entry)
  if (entry != null && !entries.includes(entry)) {
    replaceExt(entry, '.js')
    entries.push(entry)
    _inflateEntries(entries, entry)
  }
}

class loadpath {
  constructor () {
    this.entries = []
  }

  init (options) {
    minidir = path.resolve('./src/miniprogram')
    inflateEntries(this.entries, options.src)
    const output = {}
    this.entries.map(item => {
      output[replaceExt(path.relative(minidir, item), '')] = item
    })
    return output
  }
}
module.exports = loadpath