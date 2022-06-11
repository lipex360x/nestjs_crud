const { exec } = require('child_process');

module.exports = {
  description: 'Create a Migration (TypeORM)',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Migration Type',
      choices: () => [
        { name: 'New Table', value: 'tableCreate' },
        { name: 'New FK Table (ManyToMany)', value: 'tableFkCreate' },
        { name: 'Add Column', value: 'columnAdd' },
        { name: 'Add FK Column', value: 'columnFkAdd' },
        { name: 'Drop Column', value: 'columnDrop' },
      ],
    },

    {
      type: 'input',
      name: 'name',
      // default: 'test',
      message: 'Migration Name:',
      validate: (value) => {
        if (!value) {
          return 'Name is required';
        }
        return true;
      },
    },

    {
      type: 'input',
      name: 'tableName',
      // default: 'test',
      message: 'Table Name:',
      validate: (value) => {
        if (!value) {
          return 'Table Name is required';
        }
        return true;
      },
    },

    {
      type: 'input',
      name: 'columnName',
      // default: 'test',
      message: 'Column Name:',
      validate: (value) => {
        if (!value) {
          return 'Column Name is required';
        }
        return true;
      },
    },

    {
      when: function (response) {
        const type = response.type;
        if (type === 'tableCreate' || type === 'columnAdd') return type;
      },
      type: 'list',
      name: 'columnType',
      message: 'Column Type:',
      choices: () => [
        { name: 'varchar', value: 'varchar' },
        { name: 'integer', value: 'integer' },
        { name: 'float', value: 'float' },
        { name: 'uuid', value: 'uuid' },
        { name: 'boolean', value: 'boolean' },
        { name: 'timestamp', value: 'timestamp with time zone' },
      ],
    },

    // ##### Foreign Key #####

    {
      when: function (response) {
        const type = response.type;
        if (type === 'tableFkCreate' || type === 'columnFkAdd') return type;
      },
      type: 'input',
      name: 'tableReference',
      message: 'Table Reference Name:',
      validate: (value) => {
        if (!value) {
          return 'Name is required';
        }
        return true;
      },
    },

    {
      when: function (response) {
        const type = response.type;
        if (type === 'tableFkCreate' || type === 'columnFkAdd') return type;
      },
      type: 'input',
      name: 'tableColumnReference',
      message: 'Table Column Reference Name:',
      default: 'id',
    },

    // ##### Create Module #####
    {
      when: function (response) {
        const type = response.type;
        if (type === 'tableCreate') return type;
      },
      type: 'confirm',
      name: 'createModule',
      message: 'Generate a Module?',
      default: false,
    },

    {
      when: function (response) {
        const type = response.type;
        if (type === 'tableCreate' && response.createModule) return type;
      },
      type: 'input',
      name: 'moduleName',
      message: 'Module Name:',
      // default: 'test',
      validate: (value) => {
        if (!value) {
          return 'Name is required';
        }
        return true;
      },
    },
  ],

  actions: (data) => {
    const files = () => {
      const arrayFiles = [];
      const migrationPath = '../../shared/infra/typeorm/migrations';

      // Migration
      arrayFiles.push({
        path: migrationPath,
        name: '{{timestamp}}-{{pascalCase name}}.ts',
        data: { timestamp: new Date().getTime() },
        template: `./migrations/templates/${data.type}.hbs`,
      });

      if (data.type === 'tableCreate' && data.createModule) {
        exec(`nest g res ${data.moduleName}`);
      }

      return arrayFiles;
    };

    // Create Files
    const action = [];

    files().forEach((file) => {
      const createFile = {
        type: 'add',
        path: `${file.path}/${file.name}`,
        data: file.data,
        templateFile: file.template,
        force: !!file.force,
        // force: true
      };

      action.push(createFile);
    });

    // Message
    const message = () => `Migration ${data.name} created`;
    action.push(message);

    return action;
  },
};
