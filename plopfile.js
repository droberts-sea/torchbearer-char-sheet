module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'stateless functional React component',
    prompts: [{
      type: 'input',
      name: 'directory',
      default: 'src/components/',
      message: 'where should we put this component',
      filter: (directory) => {
        if (!directory.endsWith('/')) {
          directory += '/';
        }
        if (directory.startsWith('src/components/') ||
          directory.startsWith('./src/components/')) {
          return directory;
        } else if (directory.startsWith('components/')) {
          return 'src/' + directory;
        } else {
          return 'src/components/' + directory;
        }
      }
    }, {
      type: 'input',
      name: 'name',
      message: 'component name'
    }],
    actions: [{
      type: 'add',
      path: '{{directory}}{{pascalCase name}}.js',
      templateFile: 'plop_templates/component.js.hbs'
    }, {
      type: 'add',
      path: '{{directory}}styles/{{pascalCase name}}.css',
    }]
  })
};