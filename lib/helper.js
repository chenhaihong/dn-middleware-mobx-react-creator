module.exports = {
  is_valid_name: function (controller_name) {
    let reg = /^[a-zA-Z][a-zA-Z0-9\_\-]+$/i;
    return reg.test(controller_name);
  },
  first_up: function (word) {
    // 'aaaa-bbbb' => 'Aaaa-bbbb'
    return word.substring(0, 1).toUpperCase() + word.substring(1);
  }
};