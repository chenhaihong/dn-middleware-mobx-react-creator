// 创建模型模板文件
const path = require('path');
const helper = require('./helper');

/**
 * 创建模型模板文件
 * @param {Object} ctx 上下文
 * @param {Object} opts 配置文件上配置的参数集合
 */
module.exports = async function (ctx, opts) {
  // opts.model_target = opts.model_target || './src/app/models';

  // 临时目存放录
  opts.model_target = path.resolve(__dirname, '../build');

  // 模板目录
  let templateDir = path.resolve(__dirname, '../template');
  ctx.user_inputs = {};

  // 提示输入模型名称
  let input_model = await ctx.inquirer.prompt({
    type: 'input',
    name: 'model',
    message: '输入模型名称',
  });
  if (!helper.is_valid_name(input_model.model)) {
    ctx.console.error('模型名称错误！');
    ctx.console.info(('名称只能包含字母、数字、下划线、中横线，且首字符为字母。'));
    return;
  }

  ctx.user_inputs.model = helper.first_up(ctx.utils.toCamelCase(input_model.model));

  console.log(ctx.user_inputs);

  // 拷贝模板文件
  await ctx.exec([
    {
      name: 'copy',
      filter: true,
      override: false,
      files: {
        [opts.model_target + '/${user_inputs.model}.js']: `${templateDir}/model/model.js.tp`,
      }
    }
  ]);

};