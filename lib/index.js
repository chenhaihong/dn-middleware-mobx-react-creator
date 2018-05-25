const GUI = require('./app');
const createComponent = require('./createComponent');
const createController = require('./createController');
const createMock = require('./createMock');
const createModel = require('./createModel');
const createPage = require('./createPage');
const createService = require('./createService');

global.opts = null;
global.context = null;

module.exports = function (opts) {
  // 生成模板文件后，存放的路径
  opts.component_target = opts.component_target || './src/app/views/components';
  opts.controller_target = opts.controller_target || './src/app/controllers';
  opts.mock_target = opts.mock_target || './mock';
  opts.model_target = opts.model_target || './src/app/models';
  opts.page_target = opts.page_target || './src/app/views/pages';
  opts.service_target = opts.service_target || './src/app/services';
  // gui
  opts.gui = opts.gui || false; // 默认不开启 gui
  opts.gui_port;                // gui 端口

  // 声明全局变量
  global.opts = opts;

  return async function (next) {
    // 声明全局变量
    global.context = this;

    opts.gui = true;
    if (opts.gui) {
      new GUI(this, opts).start();
      return;
    }

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
      message: '选择一个模板：',
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