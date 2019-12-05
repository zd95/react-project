import React, { Component } from 'react';
import { ConfigProvider } from 'antd'
import { connect } from 'react-redux'
// 引入antd语言包
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";


@connect((state) => ({ language: state.language }))
class AntdConfigProvider extends Component {
  render() {
    const { language } = this.props
    return (
      <ConfigProvider locale={language === "en" ? enUS : zhCN}>
        {this.props.children}
      </ConfigProvider>
    )
  }
}


export default AntdConfigProvider