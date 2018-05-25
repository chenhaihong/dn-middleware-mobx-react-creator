const path = require('path');
const helper = require('./helper');

/**
 * 创建 model 模板文件
 * @param {Object} ctx 上下文
 * @param {Object} opts 配置文件上配置的参数集合
 */
module.exports = async function (ctx, opts) {
  // 模板目录
  let templateDir = path.resolve(__dirname, '../template');
  ctx.user_inputs = {};

  // 提示输入模型名称
  let input_model = await ctx.inquirer.prompt({
    type: 'input',
    name: 'model_name',
    message: '输入 model 名称:'
  });
  if (!helper.is_valid_name(input_model.model_name)) {
    ctx.console.error('名称不合法！');
    ctx.console.info(('名称只能包含字母、数字、下划线、中横线，且首字符为字母。'));
    return;
  }

  // 转驼峰 => 首字母大写
  ctx.user_inputs.model_name = helper.first_up(ctx.utils.toCamelCase(input_model.model_name));

  // 拷贝模板文件
  await ctx.exec([
    {
      name: 'copy',
      filter: true,
      override: false,
      files: {
        [opts.model_target + '/${user_inputs.model_name}Model.js']: `${templateDir}/model/model.js.tp`
      }
    }
  ]);

};