/* eslint-disable */
const { capitalize } = require('../_utils/textTransform')
const get = require('../_utils/fileSystem')

const modules = get('./src/modules', 'folder')

module.exports = {
  description: 'Create a Seed (TypeORM)',
  prompts: [
    {
      type: 'list',
      name: 'moduleName',
      message: 'Select a Module',
      choices: modules
    },

    {
      type: 'input',
      name: 'entity',
      message: 'Entity Name:',
      // default: 'teste',
      validate: (value) => {
        if (!value) return 'Name is required'

        return true
      }
    },

    {
      type: 'input',
      name: 'name',
      message: 'Seed Name:',
      // default: 'teste',
      validate: (value) => {
        if (!value) return 'Value is required'

        return true
      }
    }

  ],

  actions: (data) => {
    const pathTemplate = './seeds/templates'
    const generatePath = '../../shared/infra/typeorm/seeds'
    
    const files = () => {
      const arrayFiles = []

      arrayFiles.push({
        data: {},
        path: generatePath,
        name: '{{pascalCase name}}.ts',
        template: 'seed.hbs',
        force: false
      })

      return arrayFiles
    }
    
    // Create Files
    const action = []

    files().forEach(file => {
      const createFile = {
        type: 'add',
        path: `${file.path}/${file.name}`,
        data: file.data,
        templateFile: `${pathTemplate}/${file.template}`,
        force: !!file.force,
        // force: true
      }

      action.push(createFile)
    })

    // Message
    const message = () => `Seed ${capitalize(data.name)} created`
    action.push(message)

    return action
  }
}
