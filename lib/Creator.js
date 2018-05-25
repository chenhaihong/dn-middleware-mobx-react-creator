const path = require('path');

let context = null; // 获取在入口中定义的上下文
let opts = null;    // 获取在入口中定义的配置参数

const templateDir = path.resolve(__dirname, '../template');

class Creator {
  constructor(ctx, options) {
    context = ctx;
    opts = options;
  }

  async create() {
    let type = context.user_inputs.type;
    let name = context.user_inputs.name;

    let method = `get${type}Files`;
    //  获取要生成的内容
    context.user_inputs = {};
    let exec_files = this[method](name);
    // 生成模板文件
    return await context.exec([
      {
        name: 'copy',
        filter: true,
        override: false,
        files: exec_files
      }
    ]);
  }

  getComponentFiles(name) {
    // 设置模板需要的变量
    context.user_inputs.component_name = name;

    return {
      [`${opts.component_target}/${name}/index.js`]: `${templateDir}/component/index.js.tp`,
      [`${opts.component_target}/${name}/index.less`]: `${templateDir}/component/index.less.tp`
    };
  }

  getControllerFiles(name) {
    // 设置模板需要的变量
    context.user_inputs.controller_name = name;
    context.user_inputs.component_name = name;
    context.user_inputs.mock_name = name;
    context.user_inputs.service_name = name;

    let files = {
      [`${opts.controller_target}/${name}Controller.js`]: `${templateDir}/controller/index.js.tp`, // 加入生成controller模板参数

      ...(opts.is_page ? this.getPageFiles(name) : {}),        // 加入生成page模板参数
      ...(opts.is_service ? this.getServiceFiles(name) : {}), // 加入生成service模板参数
      ...(opts.is_mock ? this.getMockFiles(name) : {})        // 加入生成mock模板参数
    }
    return files;
  }

  getMockFiles(name) {
    // 设置模板需要的变量
    context.user_inputs.mock_name = name;

    return {
      [`${opts.mock_target}/req/${name}.js`]: `${templateDir}/mock/index.js.tp`,
      [`${opts.mock_target}/res/${name}/users.json`]: `${templateDir}/mock/users.json.tp`
    };
  }

  getModelFiles(name) {
    // 设置模板需要的变量
    context.user_inputs.model_name = name;

    return {
      [`${opts.model_target}/${name}Model.js`]: `${templateDir}/model/model.js.tp`
    };
  }

  getPageFiles(name) {
    // 设置模板需要的变量
    context.user_inputs.page_name = name;

    return {
      [`${opts.page_target}/${name}/index.js`]: `${templateDir}/page/index.js.tp`,
      [`${opts.page_target}/${name}/index.less`]: `${templateDir}/page/index.less.tp`
    };
  }

  getServiceFiles(name) {
    // 设置模板需要的变量
    context.user_inputs.service_name = name;

    return {
      [`${opts.service_target}/${name}Service.js`]: `${templateDir}/service/service.js.tp`
    };
  }
}

module.exports = Creator;