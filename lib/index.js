const createComponent = require('./createComponent');
const createController = require('./createController');
const createMock = require('./createMock');
const createModel = require('./createModel');
const createPage = require('./createPage');
const createService = require('./createService');

module.exports = function (opts) {

  return async function (next) {
    let choices = [
      'component',
      'controller',
      'mock',
      'model',
      'page',
      'service'
    ];
    choices = choices.map((item, idx) => {
      return `${idx + 1}.${item}`;
    });
    const user_input = await this.inquirer.prompt({
      type: 'list',
      name: 'target_type',
      message: '选择模板',
      choices
    });

    // '1.component' => 'component'
    switch (user_input.target_type.split('.')[1]) {
      case 'component':
        await createComponent(this, opts);
        break;
      case 'controller':
        await createController(this, opts);
        break;
      case 'mock':
        await createMock(this, opts);
        break;
      case 'model':
        await createModel(this, opts);
        break;
      case 'page':
        await createPage(this, opts);
        break;
      case 'service':
        await createService(this, opts);
        break;
    }

    next();
  };

};