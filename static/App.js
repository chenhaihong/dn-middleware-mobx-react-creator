import './index.less';

import React, { Component } from 'react';
import axios from 'axios';

import Header from './components/header';
import NameBox from './components/nameBox';
import TypeGroup from './components/typeGroup';
import MoreCheckbox from './components/moreCheckbox';
import ButtonBox from './components/buttonBox';

class App extends Component {
  state = {
    is_loading: false,
    name: '',
    type: 'component',
    is_page: true,
    is_service: true,
    is_mock: true,
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    })
  }

  onChangeType = (e) => {
    this.setState({
      type: e.target.value,
      is_page: true,
      is_service: true,
      is_mock: true,
    });
  }

  onChangeMore = (e) => {
    let name = e.target.name;
    let checked = e.target.checked;

    this.setState({
      [name]: checked
    });
  }

  onConfirm = (e) => {
    let reg = /^[a-zA-Z][a-zA-Z0-9\_\-]*$/i;
    if (!reg.test(this.state.name)) {
      alert('名称不合法！名称只能包含字母、数字、下划线、中横线，且首字符为字母。');
      return;
    }
    this.setState({ is_loading: true });
    axios.get('/create', {
      params: {
        ...this.state
      }
    })
      .then((response) => {
        this.setState({ is_loading: false });
        if (response.status == 200) {
          alert(response.data.message);
        } else {
          alert('请重试');
        }
      })
      .catch((error) => {
        this.setState({ is_loading: false });
        alert(error.message);
      });
  }

  render() {
    let { name, type, is_page, is_service, is_mock } = this.state;

    return (
      <div className={'app'}>
        <Header />
        <NameBox name={name} onChangeName={this.onChangeName} />
        <TypeGroup type={type} onChangeType={this.onChangeType} />
        {type === 'controller' && (
          <MoreCheckbox is_page={is_page} is_service={is_service} is_mock={is_mock} onChangeMore={this.onChangeMore} />
        )}
        <ButtonBox onConfirm={this.onConfirm} />
      </div>
    );
  }
}

export default App;