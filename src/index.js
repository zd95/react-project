import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {Provider} from 'react-redux'
import store from './redux/store'
import './i18n'//入口文件引入i18n 1


ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
