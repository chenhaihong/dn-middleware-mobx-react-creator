module.exports = {
  // 验证名称是否符合规则
  is_valid_name: function (controller_name) {
    let reg = /^[a-zA-Z][a-zA-Z0-9\_\-]*$/i;
    return reg.test(controller_name);
  },

  // 首字母大写
  first_up: function (word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
  }
};