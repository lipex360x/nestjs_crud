const spawn = require('spawn-commands')

module.exports = (modules) => {
  const packages = ['add']

  modules.map((module) => {
    packages.push(module)
    return module
  })

  spawn({ cmd: 'yarn', args: packages }, (error) => {
    if (error) console.log(error)
  })
}
