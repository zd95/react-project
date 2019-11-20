import React, { Component } from 'react'
import { BrowserRouter, Route , Switch } from 'react-router-dom'

import routes from './config/routes'
//引入样式文件
import './index.less';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {
            routes.map((route,index)=>{
              return <Route {...route} key={index}/>
            })
          }
        </Switch>
      </BrowserRouter>
    )
  }
}
