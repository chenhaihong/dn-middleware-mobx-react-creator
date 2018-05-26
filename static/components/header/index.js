import './index.less';

import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className={'header'}>
        <h1 className='title'>
          <span>Creator</span>
          {/* <span className={'author'}>by erye</span> */}
        </h1>
      </div>
    );
  }
}

export default Header;