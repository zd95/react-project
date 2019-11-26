//创建页面的基础模板样式
import React, { Component } from 'react'
import { Layout } from 'antd';
import LeftNav from './left-nav'
import HeaderMain from './hearder-main'
import withCheckLogin from '../../containers/with-check-login'


const { Header, Content, Footer, Sider } = Layout;

@withCheckLogin
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
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}


export default BasicLayout