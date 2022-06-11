/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

// const { capitalize } = require('../_utils/textTransform')

module.exports = {
  description: 'Generate a Middlewares',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Middleware Name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    }

    // snippet: promptTemplate
  ],

  actions: (data) => {
    const pathTemplate = './middlewares/templates'

    const files = [
      {
        data: {},
        path: '../../shared/middlewares/{{name}}',
        name: 'index.ts',
        template: 'middleware.hbs',
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
      }

      action.push(createFile)
    })

    // Message
    const message = () => `Middleware ${data.moduleName} created`
    action.push(message)

    return action
  }
}
