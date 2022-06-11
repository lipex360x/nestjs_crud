/* eslint-disable @typescript-eslint/no-unused-vars */
const { capitalize } = require('../_utils/textTransform')

module.exports = {
  description: 'Create Plop Generator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Generator Name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    }
  ],

  actions: (data) => {
    const generatorName = capitalize(data.name)
    const pathTemplate = './_generator/templates'

    const files = [
      {
        data: { generatorName },
        path: './{{lowerCase name}}',
        name: 'index.js',
        template: 'index.hbs',
        force: false
      },

      {
        data: {},
        path: './{{lowerCase name}}/templates',
        name: '{{lowerCase name}}.hbs',
        template: 'template.hbs',
        force: false
      }
    ]

    // Create Files
    const action = []

    files.forEach(file => {
      const createFile = {
        type: 'add',
        path: `${file.path}/${file.name}`,
        data: file.data,
        templateFile: `${pathTemplate}/${file.template}`,
        force: !!file.force
        // force: true
      }

      action.push(createFile)
    })

    // Message
    const message = () => (`Generator ${data.moduleName} created`)
    action.push(message)

    return action
  }
}
