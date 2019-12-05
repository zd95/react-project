import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {Provider} from 'react-redux'
// antd组件的语言国际化
import AntdConfigProvider from './containers/Config-Provider'
import store from './redux/store'
import './i18n'//入口文件引入i18n 1


ReactDOM.render(
  <Provider store={store}>
    <AntdConfigProvider>
      <App/>
    </AntdConfigProvider>
  </Provider>, document.getElementById('root'));
