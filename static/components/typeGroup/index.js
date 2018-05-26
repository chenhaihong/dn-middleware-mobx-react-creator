import './index.less';

import React, { Component } from 'react';

class typeGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  onChange = (e) => {
    this.props.onChangeType && this.props.onChangeType(e);
  }

  renderRadios = () => {
    let { type } = this.props;
    const arr = [
      'component',
      'controller',
      'mock',
      'model',
      'page',
      'service'
    ];

    return arr.map((item, idx) => {
      let isChecked = (item === type);
      return (
        <label className={'item'} key={item} htmlFor={item}>
          <input id={item} name="type" type="radio" value={item}
            checked={isChecked} onChange={this.onChange} />
          <span>{item}</span>
        </label>
      );
    })
  }

  render() {
    return (
      <fieldset className={'typeGroup'}>
        <legend className={'title'}>选择一个模板</legend>
        {this.renderRadios()}
      </fieldset>
    );
  }
}

export default typeGroup;