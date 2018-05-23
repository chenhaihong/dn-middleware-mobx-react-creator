import { observable, computed } from 'mobx';

import _ControllerName_Service from '@services/_ControllerName_Service';

export default new class _ControllerName_Controller {
  constructor() {

  }

  // 监听数据示例
  // @observable username = ''

  // 计算属性示例
  // @computed get pure_username() {
  //   const reg_emoji = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
  //   return this.username.replace(reg_emoji, '');
  // } 

  // 请求示例
  // async getInfo() {
  //   let data = service.getInfo();
  // }
}