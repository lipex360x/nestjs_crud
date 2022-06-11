/* eslint-disable */
const { pascalCase, camelCase } = require('../../_utils/textTransform')
const fs = require('../../_utils/fileSystem')

module.exports = {
  description: 'Create a TypeORM Module',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'Module Name:',
       // default: 'teste',
      validate: value => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'tableName',
      message: 'Table Name:',
       // default: 'testes',
      validate: value => {
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
          return 'Value is required'
        }
        return true
      }
    },

    // ##### Create UseCase #####
    {
      type: 'confirm',
      name: 'createUseCase',
      message: 'Generate UseCase?',
      default: false
    },

    {
      when: function (response) {
        if (response.createUseCase) return true
      },
      type: 'input',
      name: 'useCaseName',
      message: 'UseCase Name',
       // default: 'teste',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      when: function (response) {
        if (response.createUseCase) return true
      },
      type: 'input',
      name: 'actionName',
      message: 'Action Name',
       // default: 'teste',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    }
  ],

  actions: (data) => {
    const pathTemplate = './modules/typeorm/templates'
    const generatePath = `../../modules/${camelCase(data.moduleName)}`
    const pascalTableName = pascalCase(data.tableName)

    const files = () => {
      const arrayFiles = []

      // Routes
      arrayFiles.push({
        data: {},
        path: `${generatePath}/infra/routes`,
        name: '{{camelCase useCaseName}}.routes.ts',
        template: 'routes.hbs',
        force: false
      })

      // Entity
      arrayFiles.push({
        data: {},
        path: `${generatePath}/infra/typeorm/entities`,
        name: '{{pascalCase entityName}}.entity.ts',
        template: 'entity.hbs',
        force: false
      })
      
      // Mapper
      arrayFiles.push({
        data: {},
        path: `${generatePath}/mapper`,
        name: '{{pascalCase entityName}}.map.ts',
        template: 'mapper.hbs',
        force: false
      })

      // Repository
      arrayFiles.push({
        data: { pascalTableName },
        path: `${generatePath}/infra/typeorm/repositories`,
        name: `${pascalTableName}.repository.ts`,
        template: 'repository.hbs',
        force: false
      })

      // FakeRepository
      arrayFiles.push({
        data: { pascalTableName },
        path: `${generatePath}/repositories/fakes`,
        name: `Fake${pascalTableName}.repository.ts`,
        template: 'fakeRepository.hbs',
        force: false
      })

      // Interface
      arrayFiles.push({
        data: { pascalTableName },
        path: `${generatePath}/repositories/interfaces`,
        name: `I${pascalTableName}.interface.ts`,
        template: 'interfaceRepository.hbs',
        force: false
      })

      // Container
      arrayFiles.push({
        data: { pascalTableName },
        path: `${generatePath}/repositories/containers`,
        name: `${pascalTableName}.container.ts`,
        template: 'container.hbs',
        force: false
      })

      if (data.createUseCase) {
        // Controller
        arrayFiles.push({
          data: {},
          path: `${generatePath}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}`,
          name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.controller.ts',
          template: 'controller.hbs',
          force: false
        })

        // Service
        arrayFiles.push({
          data: { pascalTableName },
          path: `${generatePath}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}`,
          name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.service.ts',
          template: 'service.hbs',
          force: false
        })

        // Tests
        arrayFiles.push({
          data: { pascalTableName },
          path: `${generatePath}/useCases/{{pascalCase useCaseName}}/{{pascalCase actionName}}`,
          name: '{{pascalCase useCaseName}}{{pascalCase actionName}}.spec.ts',
          template: 'service.spec.hbs',
          force: false
        })
      }

      // Repository Index
      const moduleName = camelCase(data.moduleName)
      const repositoryFolder = fs(`./src/modules/${moduleName}/repositories/`, 'folder')
      const repositoryIndex = fs(`./src/modules/${moduleName}/repositories/`, 'file')

      if (repositoryFolder.length === 0 || repositoryIndex.length === 0) {
        arrayFiles.push({
          data: { pascalTableName },
          path: `${generatePath}/repositories`,
          name: 'index.ts',
          template: 'indexContainer.hbs',
          force: false
        })
      }

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
        force: !!file.force
        // force: true
      }

      action.push(createFile)
    })

    // Message
    const message = () => `Module ${data.moduleName} created`
    action.push(message)

    return action
  }
}
