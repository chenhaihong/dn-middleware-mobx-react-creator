// 创建控制器模板文件
const path = require('path');
const helper = require('./helper');

/**
 * 创建 controller 模板文件
 * @param {Object} ctx 上下文
 * @param {Object} opts 配置文件上配置的参数集合
 * @returns null
 */
module.exports = async function (ctx, opts) {
  // 模板目录
  let templateDir = path.resolve(__dirname, '../template');
  ctx.user_inputs = {};

  // 提示输入控制器名称
  let _input = await ctx.inquirer.prompt({
    type: 'input',
    name: 'controller_name',
    message: '输入 controller 名称:'
  });
  if (!helper.is_valid_name(_input.controller_name)) {
    ctx.console.error('名称不合法！');
    ctx.console.info(('名称只能包含字母、数字、下划线、中横线，且首字符为字母。'));
    return;
  }

  // 将控制器名称加入到 user_inputs 对象
  ctx.user_inputs.controller_name = helper.first_up(ctx.utils.toCamelCase(_input.controller_name));

  // 提示是否生成 page、service、mock 模板文件
  let _input_more = await ctx.inquirer.prompt([
    {
      type: 'confirm',
      name: 'is_page',
      message: '生成 page 模板?'
    },
    {
      type: 'confirm',
      name: 'is_service',
      message: '生成 service 模板?'
    },
    {
      type: 'confirm',
      name: 'is_mock',
      message: '生成 mock 模板?'
    }
  ]);

  const exec_params = [];

  // 加入生成controller模板参数
  exec_params.push({
    name: 'copy',
    filter: true,
    override: false,
    files: {
      [opts.controller_target + '/${user_inputs.controller_name}Controller.js']: `${templateDir}/controller/index.js.tp`
    }
  });

  // 加入生成page模板参数
  if (_input_more.is_page) {
    ctx.user_inputs.page_name = ctx.user_inputs.controller_name;
    exec_params.push({
      name: 'copy',
      filter: true,
      override: false,
      files: {
        [opts.page_target + '/${user_inputs.page_name}/index.js']: `${templateDir}/page/index.js.tp`,
        [opts.page_target + '/${user_inputs.page_name}/index.less']: `${templateDir}/page/index.less.tp`
      }
    });
  }

  // 加入生成service模板参数
  if (_input_more.is_service) {
    ctx.user_inputs.service_name = ctx.user_inputs.controller_name;
    exec_params.push({
      name: 'copy',
      filter: true,
      override: false,
      files: {
        [opts.service_target + '/${user_inputs.service_name}Service.js']: `${templateDir}/service/service.js.tp`
      }
    });
  }

  // 加入生成mock模板参数
  if (_input_more.is_mock) {
    ctx.user_inputs.mock_name = ctx.user_inputs.controller_name;
    exec_params.push({
      name: 'copy',
      filter: true,
      override: false,
      files: {
        [opts.mock_target + '/req/${user_inputs.mock_name}.js']: `${templateDir}/mock/index.js.tp`,
        [opts.mock_target + '/res/${user_inputs.mock_name}/users.json']: `${templateDir}/mock/users.json.tp`
      }
    });
  }

  // 拷贝模板文件
  await ctx.exec(exec_params);
};