// 创建控制器模板文件
const path = require('path');
const helper = require('./helper');

/**
 * 创建控制器模板文件
 * @param {Object} ctx 上下文
 * @param {Object} opts 配置文件上配置的参数集合
 */
module.exports = async function (ctx, opts) {
  // 模板目录
  let templateDir = path.resolve(__dirname, '../template');
  ctx.user_inputs = {};

  // 提示输入控制器名称
  let input_ctrl = await ctx.inquirer.prompt({
    type: 'input',
    name: 'controller',
    message: '输入控制器名称',
  });
  if (!helper.is_valid_name(input_ctrl.controller)) {
    ctx.console.error('控制器名称错误！');
    ctx.console.info(('控制器名称只能包含字母、下划线、数字，且首字符为字母。'));
    return;
  }

  // 将控制器名称加入到 user_inputs 对象
  ctx.user_inputs.controller = helper.first_up(this.utils.toCamelCase(input_ctrl.controller));

  // 提示是否生成 page、service、mock 示例文件
  let input_more = await ctx.inquirer.prompt([
    {
      type: 'confirm',
      name: 'page',
      message: '生成 page 模板?'
    },
    {
      type: 'confirm',
      name: 'service',
      message: '生成 service 模板?'
    },
    {
      type: 'confirm',
      name: 'mock',
      message: '生成 mock 模板?',
    },
  ]);

  ctx.user_inputs.page = input_more.page;
  ctx.user_inputs.service = input_more.service;
  ctx.user_inputs.mock = input_more.mock;

  this.console.log(this.user_inputs);

  // TOOD 拷贝模板文件
  // await ctx.exec([
  //   {
  //     name: 'copy',
  //     filter: true,
  //     override: false,
  //     files: {
  //       // 控制器
  //       [opts.target + '/${answers.name}/(0)']: `${templateDir}/*.*`,
  //       // page
  //       // service
  //       // mock
  //     }
  //   }
  // ]);
};