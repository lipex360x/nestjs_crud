const crypto = require('crypto')

const capitalize = (word) => {
  const lower = word.toLowerCase()

  return word.charAt(0).toUpperCase() + lower.slice(1)
}

const pascalCase = (word) => {
  return word.replace(/([-_ ]\w)/g, text => text[1].toUpperCase())
}

const camelCase = (word) => {
  return word.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2, offset) {
    if (p2) return p2.toUpperCase()
    return p1.toLowerCase()
  })
}

const snakeCase = (string) => {
  return string.replace(/\d+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_')
}

const generateId = (size = 20) => {
  return crypto.randomBytes(size).toString('hex')
}

const sanitize = (text) => {
  text = text.replace(/\uFEFF/g, '')
    .replace(/[&\\/\\#,+()$~%!.„'":*‚^_¤?<>|@ª{«»§}©®™ ]/g, '')

  const accentsMap = {
    a: 'á|à|ã|â|À|Á|Ã|Â',
    e: 'é|è|ê|É|È|Ê|ë|Ë',
    i: 'í|ì|î|Í|Ì|Î|ï|Ï',
    o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
    u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
    c: 'ç|Ç',
    n: 'ñ|Ñ'
  }

  return Object.keys(accentsMap).reduce((acc, cur) => acc.replace(new RegExp(accentsMap[cur], 'g'), cur), text)
}

module.exports = {
  capitalize,
  pascalCase,
  camelCase,
  snakeCase,
  generateId,
  sanitize
}
