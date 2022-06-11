/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

// const { capitalize } = require('../_utils/textTransform')

module.exports = {
  description: 'Generate a Provider',
  prompts: [
    {
      type: 'input',
      name: 'providerName',
      message: 'Provider Name',
      // default: 'hash',
      validate: (value) => {
        if (!value) return 'Value is required'

        return true
      }
    },

    {
      type: 'input',
      name: 'implementationName',
      message: 'Implementation Name',
      // default: 'bcrypt',
      validate: (value) => {
        if (!value) return 'Value is required'

        return true
      }
    }

    // snippet: plopPromptTemplate
  ],

  actions: (data) => {
    const pathTemplate = './providers/templates'

    const files = [
      {
        data: {},
        path: '../../shared/providers/{{pascalCase providerName}}Provider/interface',
        name: 'I{{pascalCase providerName}}.interface.ts',
        template: 'interface.hbs',
        force: false
      },

      {
        data: {},
        path: '../../shared/providers/{{pascalCase providerName}}Provider/implementations',
        name: '{{pascalCase implementationName}}.implementation.ts',
        template: 'implementation.hbs',
        force: false
      },

      {
        data: {},
        path: '../../shared/providers/{{pascalCase providerName}}Provider/fakes',
        name: 'Fake{{pascalCase providerName}}.provider.ts',
        template: 'fake.hbs',
        force: false
      },

      {
        data: {},
        path: '../../shared/providers/{{pascalCase providerName}}Provider/containers',
        name: '{{pascalCase providerName}}.container.ts',
        template: 'container.hbs',
        force: false
      }

      // snippet: plopFilesTemplate
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
    const message = () => (`Provider ${data.providerName} created`)
    action.push(message)

    return action
  }
}
