const path = require('path');
// const chalk = require("chalk");
// const log = console.log;

function prompt() {

}

module.exports = function (opts) {

  opts.target = opts.target || './src/components';

  return async function (next) {
    let templateDir = path.resolve(__dirname, '../template');
    // 提示输入控制器名称
    let arg1 = await this.inquirer.prompt({
      type: 'input',
      name: 'controller',
      message: '请输入控制器名称:',
    });
    if (!arg1.controller) {
      this.console.error(controller);
    }
    this.console.log(this.utils.toCamelCase(arg1.controller));

    // 提示是否生成 page、service、mock 示例文件
    let args = await this.inquirer.prompt(
      [{
        type: 'confirm',
        name: 'page',
        message: '生成page?'
      }, {
        type: 'confirm',
        name: 'service',
        message: '生成service?'
      },
      {
        type: 'confirm',
        name: 'mock',
        message: '生成mock?',
      },]
    );
    this.console.log(args);
    // await this.exec([
    //   {
    //     name: 'copy',
    //     filter: true,
    //     override: false,
    //     files: {
    //       // 控制器
    //       [opts.target + '/${answers.name}/(0)']: `${templateDir}/*.*`,
    //       // service
    //       // 容器
    //     }
    //   }
    // ]);
    next();
  };

};