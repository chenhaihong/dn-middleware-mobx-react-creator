const express = require('express');
const portfinder = require('portfinder');

let app = null;     // 服务实体
let context = null; // 获取在入口中定义的上下文
let opts = null;    // 获取在入口中定义的配置参数

class GUI {
  constructor(ctx, options) {
    app = express();
    context = ctx;
    opts = options;

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
    }
  }

  setRouter() {
    app.get('/', async function (req, res) {
      res.send('Hello World');
    });
    app.get('/create', async function (req, res) {
      let type = req.query.type;
      let name = req.query.name;
      res.send(`create - ${type} - ${name}`);
    });
  }
}

module.exports = GUI;