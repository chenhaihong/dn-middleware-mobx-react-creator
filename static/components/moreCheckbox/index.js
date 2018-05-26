import './index.less';

import React, { Component } from 'react';

class moreCheckbox extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  onChange = (e) => {
    this.props.onChangeMore && this.props.onChangeMore(e);
  }

  renderCheckboxs = () => {
    let { is_page, is_service, is_mock } = this.props
    let arr = [];

    arr.push(
      <label className={'item'} key={'is_page'}>
        <input type="checkbox" name={'is_page'} checked={is_page} onChange={this.onChange} />
        <span>page</span>
      </label>
    );

    arr.push(
      <label className={'item'} key={'is_service'}>
        <input type="checkbox" name={'is_service'} checked={is_service} onChange={this.onChange} />
        <span>service</span>
      </label>
    );

    arr.push(
      <label className={'item'} key={'is_mock'}>
        <input type="checkbox" name={'is_mock'} checked={is_mock} onChange={this.onChange} />
        <span>mock</span>
      </label>
    );

    return arr;
  }

  render() {
    return (
      <fieldset className={'moreCheckbox'}>
        <legend className={'title'}>是否生成这些模板？</legend>
        {this.renderCheckboxs()}
      </fieldset>
    );
  }
}

export default moreCheckbox;