/* eslint-disable */
const { capitalize, pascalCase, camelCase } = require('../_utils/textTransform')
const get = require('../_utils/fileSystem')

const modules = get('./src/modules', 'folder')

module.exports = {
  description: 'Generate a useCases (TypeORM)',

  prompts: [
    {
      type: 'list',
      name: 'moduleName',
      message: 'Select a Module',
      choices: modules
    },

    {
      type: 'input',
      name: 'tableName',
      message: 'Table Name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'entityName',
      message: 'Entity Name:',
      // default: 'teste',
      validate: value => {
        if (!value) {
          return 'Name is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'useCaseName',
      message: 'UseCase Name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'actionName',
      message: 'Action Name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    }

  ],

  actions: (data) => {
    const pascalTableName = pascalCase(data.tableName)
    const generatePath = `../../modules/${camelCase(data.moduleName)}`
    const pathTemplate = './modules/typeorm/templates'

    const files = [
      // Controller
      {
        data: {},
        path: `${generatePath}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}`,
        name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.controller.ts',
        template: 'controller.hbs',
        force: false
      },

      // Service
      {
        data: { pascalTableName },
        path: `${generatePath}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}`,
        name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.service.ts',
        template: 'service.hbs',
        force: false
      },

      // Tests
      {
        data: { pascalTableName },
        path: `${generatePath}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}`,
        name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.spec.ts',
        template: 'service.spec.hbs',
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
        // force: true
      }

      action.push(createFile)
    })

    // Message
    const message = () => (`UseCase ${capitalize(data.moduleName)}/${capitalize(data.useCaseName)}/${capitalize(data.actionName)} created`)
    action.push(message)

    return action
  }
}
