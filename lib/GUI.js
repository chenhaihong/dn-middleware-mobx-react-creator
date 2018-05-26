const path = require('path');
const express = require('express');
const portfinder = require('portfinder');
const helper = require('./helper');
const Creator = require('./Creator');

let app = null;     // 服务实体
let context = null; // 获取在入口中定义的上下文
let opts = null;    // 获取在入口中定义的配置参数

class GUI {
  constructor(ctx, options) {
    app = express();
    context = ctx;
    opts = options;

    this.setStatic();
    this.setRouter();
  }

  start() {
    if (!opts.port) {
      portfinder.getPort(function (err, port) {
        if (err) {
          context.console.error(err.message);
          process.exit(1);
        }

        opts.port = port;
        context.console.info(`http://127.0.0.1:${port}`);
        app.listen(opts.port);
      });
    } else {
      context.console.info(`http://127.0.0.1:${opts.port}`);
      app.listen(opts.port);
    }
  }

  setStatic() {
    app.use(express.static(path.resolve(__dirname, '../static/build')));
  }

  setRouter() {
    // app.get('/', function (req, res) {
    //   res.send('Hello World');
    // });
    app.get('/create', async function (req, res) {
      let type = req.query.type;
      let name = req.query.name;

      let result = null;
      if (!helper.is_valid_name(name)) {
        result = { success: false, message: '名称不规范' };
      } else {
        context.user_inputs.type = helper.first_up(type);
        context.user_inputs.name = helper.first_up(context.utils.toCamelCase(name));

        if (type.toLowerCase() === 'controller') {
          context.user_inputs.is_page = Boolean(req.query.is_page);
          context.user_inputs.is_service = Boolean(req.query.is_service);
          context.user_inputs.is_mock = Boolean(req.query.is_mock);
        }

        try {
          await new Creator(context, opts).create();
          result = { success: true, message: '创建完成' };
        } catch (error) {
          result = { success: false, message: error.message };
        }
      }

      res.send(result);
    });
  }
}

module.exports = GUI;