const helper = require('./helper');

let context = null; // 获取在入口中定义的上下文
let opts = null;    // 获取在入口中定义的配置参数

class Asker {
  constructor(ctx, options) {
    context = ctx;
    opts = options;
  }

  async inquire() {
    let type = await this.inquireType();
    let name = await this.inquireName();

    // 验证名称合法性
    if (!helper.is_valid_name(name)) {
      context.console.warn('名称不合法！');
      context.console.info(('名称只能包含字母、数字、下划线、中横线，且首字符为字母。'));
      process.exit(1);
    }

    context.user_inputs.type = helper.first_up(type);
    context.user_inputs.name = helper.first_up(context.utils.toCamelCase(name));

    if (type.toLowerCase() === 'controller') {
      let more = await this.inquireMore();
      context.user_inputs.is_page = more.is_page;
      context.user_inputs.is_service = more.is_service;
      context.user_inputs.is_mock = more.is_mock;
    }

    context.console.info(JSON.stringify(context.user_inputs, null, 2));
  }

  async inquireType() {
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
    const user_input = await context.inquirer.prompt({
      type: 'list',
      name: 'type',
      message: '选择一个模板:',
      choices
    });
    return user_input.type.split('.')[1];
  }

  async inquireName() {
    // 提示输入
    let user_input = await context.inquirer.prompt({
      type: 'input',
      name: 'name',
      message: '输入名称:'
    });

    return user_input.name;
  }

  async inquireMore() {
    // 提示是否生成 page、service、mock 模板文件
    let _input_more = await context.inquirer.prompt([
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
    return _input_more;
  }
}

module.exports = Asker;