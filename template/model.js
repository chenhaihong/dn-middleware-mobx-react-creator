import { observable, computed, autorun } from 'mobx';

export default class _ModelName_ {
  // 监听属性示例
  // @observable id = 0;
  // @observable username = '';

  // 计算属性示例
  // 计算属性示例
  // @computed get pure_username() {
  //   const reg_emoji = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
  //   return this.username.replace(reg_emoji, '');
  // } 
};

// 衍生：自动运行函数示例
// autorun(() => {
//   const name = _ModelName_.username;
//   console.log(name);
// });