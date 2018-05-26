import './index.less';

import React, { Component } from 'react';

class nameBox extends Component {
  onChange = (e) => {
    this.props.onChangeName && this.props.onChangeName(e);
  }

  renderInput = () => {
    let { name } = this.props.name;

    return (
      <input className={'item'} type='text' value={name} onChange={this.onChange} />
    )
  }

  render() {
    return (
      <fieldset className={'nameBox'}>
        <legend className={'title'}>输入名称</legend>
        {this.renderInput()}
      </fieldset>
    );
  }
}

export default nameBox;