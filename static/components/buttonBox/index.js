import './index.less';

import React, { Component } from 'react';

class buttonBox extends Component {
  onClick = (e) => {
    this.props.onConfirm && this.props.onConfirm(e);
  }

  render() {
    return (
      <div className={'buttonBox'}>
        <button onClick={this.onClick}>确认</button>
      </div>
    );
  }
}

export default buttonBox;