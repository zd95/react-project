import React, { Component, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import { Spin } from "antd";
//引入history，创建浏览器的历史记录，将其设置为router组件的标签属性{等价于BrowserRouter}
import history from './utils/history'
//const history = createBrowserHistory()
import { NotVerify } from './config/routes'
//引入BasicLayout组件，将home等组件设置为其子组件，
//在BasicLayout组件中用this.props.children属性让home等组件在Basiclayout组件中展示
import BasicLayout from './components/basic-layout'
//引入样式文件
import './index.less';

export default class App extends Component {
  render() {
    return (
      // Suspense用于懒加载：等待内部元素加载完才显示，没加载完就显示fallback的值
      <Suspense fallback={<Spin size="large" className="lazy-loading" />}>
        <Router history={history}>
          <Switch>
            {
              NotVerify.map((route, index) => {
                return <Route {...route} key={index} />
              })
            }
            <BasicLayout/>
              {/* <Switch>
                {
                  Verify.map((route, index) => {
                    return <Route {...route} key={index} />
                  })
                }
              </Switch>
            </BasicLayout> */}
          </Switch>
        </Router>
      </Suspense>
    )
  }
}
