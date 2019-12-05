//创建页面的基础模板样式
import React, { Component } from 'react'
import { Layout } from 'antd';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Verify } from '../../config/routes'
import LeftNav from './left-nav'
import HeaderMain from './hearder-main'
import withCheckLogin from '../../containers/with-check-login'
import ThemeColor from './theme-Color'

const { Header, Content, Footer, Sider } = Layout;

@withCheckLogin
@connect((state) => ({ menus: state.user.user.menus }))
class BasicLayout extends Component {
  state = {
    collapsed: false,
    isDisplay: true
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({
      collapsed,
      isDisplay: !this.state.isDisplay
    });
  };

  render() {
    //控制菜单栏的显示
    const { collapsed, isDisplay } = this.state;
    //根据用户的访问权限显示与其权限相对应的路由组件
    const { menus } = this.props
    const anthRoutes = Verify.filter(
      //通过路径对比筛选出与用户访问权限相符的路由组件
      route => !route.path ||
        menus.find(menu => route.prth === menu || menu.startsWith('/product'))
    )
    console.log(menus);

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <LeftNav isDisplay={isDisplay} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <HeaderMain />
          </Header>
          <Content style={{ margin: "40px 16px 0 16px" }}>

            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {/*在该容器中展示BasicLayout组件的子组件*/}
              {/* {this.props.children} */}
              <Switch>
                {
                  anthRoutes.map((anthRoute, index) => <Route {...anthRoute} key={index} />)
                }
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
        <ThemeColor />
      </Layout>
    );
  }
}


export default BasicLayout