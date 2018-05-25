const GUI = require('./GUI');
const Asker = require('./Akser');
const Creator = require('./Creator');

// global.opts = null;
// global.context = null;
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
  // global.opts = opts;

  return async function (next) {
    // 声明全局变量
    // global.context = this;
    // 存放用户输入值的对象
    this.user_inputs = {};

    // opts.gui = true;
    if (opts.gui) {
      new GUI(this, opts).start();
      return;
    }

    try {
      await new Asker(this, opts).inquire();
      await new Creator(this, opts).create();
    } catch (error) {
      this.console.error(error.message);
      process.exit(1);
    }

    next();
  };

};