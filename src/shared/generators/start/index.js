const { generateId, camelCase } = require('../_utils/textTransform')

module.exports = {
  description: 'Start Project (Just once)',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Environment',
      choices: () => [
        { name: 'Develop', value: 'ts' },
        { name: 'Production', value: 'js' }
      ]
    },

    {
      type: 'input',
      name: 'projectName',
      message: 'Project Name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'apiPort',
      message: 'API Port',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'dbUser',
      message: 'Postgres user name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'dbPass',
      message: 'Postgres password',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    },

    {
      type: 'input',
      name: 'dbTable',
      message: 'Postgres database name',
      validate: (value) => {
        if (!value) {
          return 'Value is required'
        }
        return true
      }
    }
  ],

  actions: (data) => {
    const pathTemplate = './start/templates'
    const generatePath = '../../..'

    const files = () => {
      const arrayFiles = []
      // env
      arrayFiles.push({
        data: {
          jwtToken: generateId(16),
          jwtExpires: '60m',
          refreshToken: generateId(12),
          refreshExpires: '7d',
          projectMail: `noreply@${camelCase(data.projectName)}.com`
        },
        path: generatePath,
        name: '.env',
        template: 'env.{{type}}.hbs',
        force: true
      })

      arrayFiles.push({
        data: {},
        path: `${generatePath}`,
        name: 'docker-compose.yml',
        template: 'docker-compose.hbs',
        force: true
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
        force: !!file.force
        // force: true
      }

      action.push(createFile)
    })

    // Message
    const message = () => 'APP Startup files created'
    action.push(message)

    return action
  }
}
