const createController = require('./createController');
const createModel = require('./createModel');
// const chalk = require("chalk");
// const log = console.log;

module.exports = function (opts) {

  return async function (next) {
    let user_input = await this.inquirer.prompt({
      type: 'list',
      name: 'target_type',
      message: '选择模板',
      choices: [
        '1.component',
        '2.controller',
        '3.model',
        '4.page',
        '5.service',
      ]
    });

    // console.log(this.inquirer)
    switch (user_input.target_type) {
      case '1.component':
        // await createController(this);
        break;
      case '2.controller':
        await createController(this, opts);
        break;
      case '3.model':
        await createModel(this, opts);
        break;
      case '4.page':
      case '5.service':
        break;
    }

    // await createController(this);

    next();
  };

};