const path = require('path');
const helper = require('./helper');

/**
 * 创建 service 模板文件
 * @param {Object} ctx 上下文
 * @param {Object} opts 配置文件上配置的参数集合
 */
module.exports = async function (ctx, opts) {
  // 生成模板文件后，存放的路径
  opts.service_target = opts.service_target || './src/app/services';
  // 模板目录
  let templateDir = path.resolve(__dirname, '../template');
  // 存放用户输入值的对象
  ctx.user_inputs = {};

  // 提示输入
  let _input = await ctx.inquirer.prompt({
    type: 'input',
    name: 'service_name',
    message: '输入 service 名称:'
  });
  // 验证名称合法性
  if (!helper.is_valid_name(_input.service_name)) {
    ctx.console.error('名称不合法！');
    ctx.console.info(('名称只能包含字母、数字、下划线、中横线，且首字符为字母。'));
    return;
  }

  // 转驼峰 => 首字母大写
  ctx.user_inputs.service_name = helper.first_up(ctx.utils.toCamelCase(_input.service_name));

  // 拷贝模板文件
  await ctx.exec([
    {
      name: 'copy',
      filter: true,
      override: false,
      files: {
        [opts.service_target + '/${user_inputs.service_name}Service.js']: `${templateDir}/service/service.js.tp`
      }
    }
  ]);

};